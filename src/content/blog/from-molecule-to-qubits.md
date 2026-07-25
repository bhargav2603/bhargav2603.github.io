---
title: "From molecule to qubits: a practical Qiskit Nature workflow"
description: "A grounded walkthrough of the choices between molecular geometry, a fermionic Hamiltonian, a qubit operator, and a VQE result."
pubDate: 2026-07-24
tags: ["quantum chemistry", "Qiskit Nature", "PySCF", "VQE"]
category: "tutorial"
draft: false
featured: true
toc: true
readingTime: "5 min read"
---

A quantum-chemistry calculation does not begin with a quantum circuit. It begins with a scientific question: which molecule, which geometry, which basis, which electrons, and which observable?

That distinction matters. It is easy to produce a circuit and an energy value. It is much harder to show that the circuit represents the intended chemical problem.

The workflow I use is:

1. define the molecular system;
2. run a classical electronic-structure calculation;
3. construct the second-quantized Hamiltonian;
4. map fermionic operators to qubits;
5. choose a state preparation and solver;
6. compare against a trusted reference.

This is broadly the same pipeline described in the official [Qiskit Nature electronic-structure tutorial](https://qiskit-community.github.io/qiskit-nature/tutorials/01_electronic_structure.html).

## 1. Start with a molecular specification

At minimum, I record the atomic coordinates, charge, spin, units, and basis set. These values are part of the experiment, not incidental setup.

```python
from qiskit_nature.second_q.drivers import PySCFDriver
from qiskit_nature.units import DistanceUnit

driver = PySCFDriver(
    atom="H 0 0 0; H 0 0 0.735",
    basis="sto3g",
    charge=0,
    spin=0,
    unit=DistanceUnit.ANGSTROM,
)

problem = driver.run()
```

The driver delegates the classical chemistry work to PySCF and returns an `ElectronicStructureProblem`. PySCF is not a small helper hidden behind Qiskit; it is a substantial electronic-structure framework with mean-field, density-functional, multiconfigurational, coupled-cluster, and periodic capabilities. Its scope and peer-reviewed references are listed by the [PySCF project](https://pyscf.org/about.html).

A minimal basis such as STO-3G is useful for learning and testing. It is not automatically sufficient for a chemically meaningful prediction. A larger basis can improve the representation of the molecular orbitals, but it also increases the number of spin orbitals and therefore the quantum resources.

## 2. Understand what the driver produces

After a Hartree–Fock calculation, the electronic Hamiltonian can be written in second quantization as

$$
\hat{H}_{\mathrm{elec}}
=
\sum_{pq} h_{pq} a_p^\dagger a_q
+
\frac{1}{2}\sum_{pqrs} h_{pqrs}
a_p^\dagger a_q^\dagger a_r a_s.
$$

The one- and two-electron integrals come from the molecular orbitals and the chosen basis. The creation and annihilation operators act on fermionic modes. This is already a computational representation, but it is not yet a qubit Hamiltonian.

I always inspect the problem before moving on:

```python
print("Particles:", problem.num_particles)
print("Spatial orbitals:", problem.num_spatial_orbitals)
print("Reference energy:", problem.reference_energy)

fermionic_hamiltonian = problem.hamiltonian.second_q_op()
print("Fermionic terms:", len(fermionic_hamiltonian))
```

These checks catch simple but damaging errors: an incorrect charge, a wrong spin convention, unexpected orbital counts, or a geometry entered in the wrong unit.

## 3. Map fermions to qubits

Qubits do not naturally obey fermionic anti-commutation rules. A mapper converts the fermionic operator into a weighted sum of Pauli strings.

```python
from qiskit_nature.second_q.mappers import JordanWignerMapper

mapper = JordanWignerMapper()
qubit_hamiltonian = mapper.map(fermionic_hamiltonian)

print("Qubits:", qubit_hamiltonian.num_qubits)
print("Pauli terms:", len(qubit_hamiltonian))
```

The Jordan–Wigner mapping has a direct interpretation: the occupation of a spin orbital is stored in a qubit, while parity information appears as strings of Pauli \(Z\) operators. Qiskit Nature also supports parity and Bravyi–Kitaev mappings. Their properties and examples are documented in the [Qiskit Nature mapper guide](https://qiskit-community.github.io/qiskit-nature/tutorials/06_qubit_mappers.html).

There is no universally best mapper. I treat it as an experimental choice and record:

- the mapper and orbital ordering;
- whether symmetry tapering was used;
- the qubit count before and after reduction;
- the resulting number of Pauli terms.

Two workflows can start from the same molecule and produce different circuits because of these choices.

## 4. Prepare a state and solve the problem

The original VQE proposal combined a parameterized quantum state with a classical optimizer, an approach demonstrated by Peruzzo and colleagues in 2014 in [Nature Communications](https://www.nature.com/articles/ncomms5213). For chemistry, a common starting point is the Hartree–Fock state followed by a UCCSD ansatz.

```python
from qiskit.primitives import StatevectorEstimator
from qiskit_algorithms import VQE
from qiskit_algorithms.optimizers import SLSQP
from qiskit_nature.second_q.circuit.library import HartreeFock, UCCSD

num_orbitals = problem.num_spatial_orbitals
num_particles = problem.num_particles

initial_state = HartreeFock(num_orbitals, num_particles, mapper)
ansatz = UCCSD(
    num_orbitals,
    num_particles,
    mapper,
    initial_state=initial_state,
)

solver = VQE(
    StatevectorEstimator(),
    ansatz,
    SLSQP(maxiter=200),
    initial_point=[0.0] * ansatz.num_parameters,
)
```

This is a sensible baseline, not a guarantee. UCCSD can become deep, optimization can stall, and a restricted active space can exclude important correlation. A hardware-efficient ansatz may be shallower but can sacrifice chemical structure and interpretability.

## 5. Validate before using hardware

For a small problem, I first compare VQE with exact diagonalization:

```python
from qiskit_algorithms import NumPyMinimumEigensolver
from qiskit_nature.second_q.algorithms import GroundStateEigensolver

exact = GroundStateEigensolver(mapper, NumPyMinimumEigensolver())
exact_result = exact.solve(problem)

vqe = GroundStateEigensolver(mapper, solver)
vqe_result = vqe.solve(problem)

error_mha = 1000 * abs(
    vqe_result.total_energies[0].real
    - exact_result.total_energies[0].real
)

print("VQE total energy:", vqe_result.total_energies[0].real)
print("Exact total energy:", exact_result.total_energies[0].real)
print("Absolute error (mHa):", error_mha)
```

The official [Qiskit Nature ground-state tutorial](https://qiskit-community.github.io/qiskit-nature/tutorials/03_ground_state_solvers.html) uses the same idea: exact diagonalization is expensive at scale, but invaluable as a reference on small systems.

Before a hardware run, my checklist is:

- Does Hartree–Fock agree with the classical driver?
- Does exact diagonalization agree with an independent reference?
- Does VQE reproduce the exact result in a statevector simulation?
- Are particle number and spin physically sensible?
- Is the energy reported as electronic or total energy?
- Are random seeds, optimizer settings, and stopping conditions saved?

## The practical lesson

The quantum circuit is only the middle of the workflow. Geometry, basis, active-space choices, mapping, ansatz, optimizer, and reference calculations all affect the result.

Richard Feynman’s 1982 paper, [“Simulating physics with computers”](https://doi.org/10.1007/BF02650179), helped frame the idea of using quantum systems to simulate quantum physics. The practical version of that idea is less dramatic but more useful: build a transparent chain from the physical problem to the reported number, and test every link that can be tested classically.

## Sources and further reading

- [Qiskit Nature: electronic structure](https://qiskit-community.github.io/qiskit-nature/tutorials/01_electronic_structure.html)
- [Qiskit Nature: mapping to qubit space](https://qiskit-community.github.io/qiskit-nature/tutorials/06_qubit_mappers.html)
- [Qiskit Nature: ground-state solvers](https://qiskit-community.github.io/qiskit-nature/tutorials/03_ground_state_solvers.html)
- [PySCF project and peer-reviewed references](https://pyscf.org/about.html)
- [Peruzzo et al., VQE on a photonic processor](https://www.nature.com/articles/ncomms5213)
- [Feynman, Simulating physics with computers](https://doi.org/10.1007/BF02650179)
