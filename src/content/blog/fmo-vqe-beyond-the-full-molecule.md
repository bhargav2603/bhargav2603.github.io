---
title: "Beyond the full molecule: building an FMO–VQE workflow"
description: "How fragment-based quantum chemistry can keep qubit requirements bounded while recovering chemically accurate molecular energies."
pubDate: 2026-07-25
tags: ["quantum chemistry", "VQE", "Qiskit", "FMO"]
category: "research"
draft: false
featured: true
toc: true
readingTime: "8 min read"
---

Variational quantum algorithms are often introduced with a simple promise: encode a molecular Hamiltonian, prepare a parameterized state, and minimize its energy. The difficult part appears as soon as the molecule grows. Orbital spaces expand, qubit requirements rise, and a calculation that was straightforward for H₂ becomes expensive for a longer chain.

The **Fragment Molecular Orbital–Variational Quantum Eigensolver (FMO–VQE)** workflow explores a practical alternative: solve small molecular fragments independently, then assemble their contributions using the FMO energy expression.

## Why fragment the molecule?

For a molecule divided into fragments \(I, J, \ldots\), the FMO2 approximation combines monomer and dimer energies:

$$
E_{\mathrm{FMO2}} =
\sum_I E_I +
\sum_{I<J} \left(E_{IJ} - E_I - E_J\right).
$$

The monomer term captures each fragment independently. The dimer correction restores pairwise interactions that a simple sum would miss. The important computational property is that the largest quantum problem is determined by the largest fragment or fragment pair—not by the total molecular length.

<figure class="workflow-figure" aria-labelledby="workflow-caption">
  <svg viewBox="0 0 900 250" role="img" aria-label="FMO VQE workflow from molecule through fragments and pair corrections to total energy">
    <defs>
      <linearGradient id="flow" x1="0" x2="1">
        <stop offset="0" stop-color="#F95C4B"/>
        <stop offset="1" stop-color="#000000"/>
      </linearGradient>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="currentColor"/>
      </marker>
    </defs>
    <rect x="20" y="72" width="170" height="105" rx="12" class="flow-card"/>
    <text x="105" y="111" text-anchor="middle" class="flow-kicker">MOLECULE</text>
    <text x="105" y="142" text-anchor="middle" class="flow-title">H₂ / H₄ / H₆</text>
    <path d="M205 125 H272" class="flow-arrow" marker-end="url(#arrow)"/>
    <rect x="290" y="35" width="170" height="78" rx="12" class="flow-card"/>
    <text x="375" y="69" text-anchor="middle" class="flow-kicker">MONOMERS</text>
    <text x="375" y="94" text-anchor="middle" class="flow-title">VQE per fragment</text>
    <rect x="290" y="139" width="170" height="78" rx="12" class="flow-card"/>
    <text x="375" y="173" text-anchor="middle" class="flow-kicker">DIMERS</text>
    <text x="375" y="198" text-anchor="middle" class="flow-title">Pair corrections</text>
    <path d="M475 74 H570 M475 178 H570" class="flow-arrow" marker-end="url(#arrow)"/>
    <rect x="590" y="72" width="285" height="105" rx="12" class="flow-card result"/>
    <text x="732" y="107" text-anchor="middle" class="flow-kicker">ASSEMBLE</text>
    <text x="732" y="137" text-anchor="middle" class="flow-title">FMO2 total energy</text>
    <text x="732" y="160" text-anchor="middle" class="flow-note">bounded fragment qubits</text>
  </svg>
  <figcaption id="workflow-caption">A modular path from the full molecule to fragment VQE calculations and FMO2 energy assembly.</figcaption>
</figure>

## The software pipeline

The implementation separates configuration, chemistry, solvers, aggregation, and validation. That separation matters: it lets the same experiment change its basis, active space, optimizer, or reference energy without rewriting the workflow.

```python
from qfmo import FMOConfig, FMOVQEPipeline

atoms = [
    ("H", 0.0,   0.0, 0.0),
    ("H", 0.741, 0.0, 0.0),
    ("H", 2.5,   0.0, 0.0),
    ("H", 3.241, 0.0, 0.0),
]

config = FMOConfig(
    molecule_name="H4",
    basis="sto-3g",
    fragment_list=[[0, 1], [2, 3]],
    ansatz_type="uccsd",
    optimizer_name="SLSQP",
)

result = FMOVQEPipeline(config).run(atoms)
print(result.e_fmo2, result.error_mha)
```

PySCF generates the electronic-structure inputs, while Qiskit and Qiskit Nature provide the qubit mapping, UCCSD ansatz, and VQE machinery. Tests and automated comparisons keep each layer independently checkable.

## Benchmarking against exact references

The validation suite studied H₂, H₄, and H₆ cases against full configuration interaction references. The uncorrected fragment sum reached a maximum absolute deviation of **8.3 mHa**. Adding FMO2 pair corrections reduced that maximum to **1.03 mHa**.

| Quantity                      | Maximum absolute deviation |
| ----------------------------- | -------------------------: |
| Uncorrected fragment assembly |                    8.3 mHa |
| FMO2-corrected assembly       |                   1.03 mHa |
| Chemical-accuracy reference   |                   ±1.6 mHa |

All corrected benchmark cases fell inside the commonly used chemical-accuracy threshold. The result does not imply that fragmentation removes every scaling challenge; it shows that a modular quantum-classical construction can recover important interaction energy without forcing the entire molecule into one quantum circuit.

## What the experiment taught me

Three engineering lessons mattered as much as the final number:

1. **Validation must be layered.** Solver error, active-space truncation, and fragmentation error are different effects and should not be collapsed into a single metric.
2. **Configuration is part of reproducibility.** Fragment definitions, basis choices, optimizer settings, and random seeds need to be explicit inputs.
3. **Small, testable modules accelerate research.** A chemistry pipeline becomes easier to extend when Hamiltonian construction, VQE execution, and FMO assembly can be tested separately.

## Next directions

The natural extensions are broader molecular benchmarks, more systematic fragment-selection rules, noise-aware execution, and resource estimates tied to real hardware constraints. The project is public at [github.com/bhargav2603/FMO-VQE](https://github.com/bhargav2603/FMO-VQE).
