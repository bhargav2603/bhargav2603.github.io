---
title: "How to validate a quantum algorithm properly"
description: "A layered validation strategy that separates model, implementation, solver, sampling, and hardware errors instead of hiding them in one final metric."
pubDate: 2026-07-22
tags: ["validation", "quantum algorithms", "benchmarking", "VQE"]
category: "engineering"
draft: false
featured: true
toc: true
readingTime: "7 min read"
---

A quantum result can be numerically close to a reference for the wrong reason. Two errors may cancel. A unit conversion may hide behind a familiar-looking value. An optimizer may converge while the physical model is incorrect.

That is why I do not treat validation as a final comparison between two energies. I validate the workflow in layers.

## Start by defining the claim

“The algorithm works” is not testable enough. A useful claim states:

- the input family;
- the observable or output;
- the reference;
- the tolerance;
- the execution conditions;
- the resource budget.

For example:

> For H₂ geometries from 0.5 to 2.5 Å in STO-3G, statevector UCCSD–VQE reproduces exact diagonalization within 1 mHa using a fixed mapper and optimizer configuration.

This claim can fail clearly. That is a strength.

## Layer 1: validate the scientific model

Before testing the quantum solver, I test whether the encoded problem is the intended problem.

For quantum chemistry, I record and inspect:

- geometry and distance units;
- charge and spin;
- basis set;
- frozen orbitals and active space;
- nuclear-repulsion treatment;
- orbital ordering;
- fermion-to-qubit mapping.

An active-space calculation can solve its reduced Hamiltonian accurately while remaining far from the full-space reference. That is not solver error. It is model-reduction error.

I therefore keep separate references:

| Comparison                                         | Error being tested             |
| -------------------------------------------------- | ------------------------------ |
| Classical full-space vs experiment or trusted data | Model and method limits        |
| Classical active-space vs full-space               | Truncation error               |
| Exact eigensolver vs classical active-space solver | Encoding and convention errors |
| VQE vs exact active-space eigensolver              | Ansatz and optimization error  |
| Hardware vs ideal VQE circuit                      | Device and sampling error      |

Combining these into one number makes diagnosis harder.

## Layer 2: test the transformation pipeline

The path from integrals to a qubit operator includes multiple transformations. I test invariants at the boundaries.

Useful checks include:

- Hermiticity of the Hamiltonian;
- expected particle count;
- expected spin-sector values;
- equality of energies before and after a reversible mapping;
- correct constant and nuclear-energy offsets;
- symmetry-sector consistency after tapering.

For small systems, I compare matrices or eigenvalues directly. The official [Qiskit Nature ground-state workflow](https://qiskit-community.github.io/qiskit-nature/tutorials/03_ground_state_solvers.html) demonstrates exact diagonalization with `NumPyMinimumEigensolver`, which is a practical oracle while the Hilbert space remains small.

## Layer 3: test software components

I split the workflow into functions with small responsibilities:

```text
geometry
  → electronic-structure driver
  → active-space transformer
  → fermionic Hamiltonian
  → qubit mapper
  → ansatz and estimator
  → optimizer
  → reported observables
```

Then I test each layer with:

- **unit tests** for deterministic transformations;
- **property tests** for invariants across generated inputs;
- **regression tests** for previously verified cases;
- **integration tests** for full small examples;
- **failure tests** for invalid charge, spin, geometry, or configuration.

Greg Wilson and colleagues argue in their [best practices for scientific computing](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001745) that researchers should plan for mistakes, use assertions, and turn bugs into tests. That advice fits quantum workflows especially well because the stack crosses physics, chemistry, linear algebra, optimization, and hardware APIs.

## Layer 4: separate ansatz error from optimizer error

Suppose VQE finishes above the exact ground-state energy. There are at least two distinct explanations:

1. the ansatz cannot represent the ground state;
2. the ansatz can represent it, but the optimizer failed to find it.

I distinguish them by testing:

- several initial points;
- several optimizer seeds;
- statevector runs without sampling noise;
- deeper or chemically motivated ansätze;
- overlap with the exact state when feasible;
- energy variance, not only energy.

For an exact eigenstate, the Hamiltonian variance is zero:

$$
\mathrm{Var}(H)=\langle H^2\rangle-\langle H\rangle^2=0.
$$

A low energy with a large variance is evidence that the prepared state is not an eigenstate. Variance is not always cheap to measure, but in small validation cases it is informative.

## Layer 5: quantify statistical uncertainty

Finite shots turn every expectation value into an estimate. I avoid reporting more digits than the sampling process supports.

At minimum, I use repeated independent runs or a justified confidence interval. I also keep optimizer variability separate from shot variability:

- repeated measurement of the same circuit estimates sampling variation;
- repeated optimization with different seeds estimates optimization variation;
- repeated hardware execution across calibrations reveals drift.

One run cannot separate these effects.

## Layer 6: validate hardware claims carefully

Device metrics such as gate error, quantum volume, or CLOPS are useful, but they do not prove that a particular application result is correct. A full-stack benchmark should resemble the target workload.

The [Nature Reviews Physics review of quantum certification and benchmarking](https://www.nature.com/articles/s42254-020-0186-4) emphasizes that protocols differ in information gained, assumptions, sample complexity, and post-processing. No single metric captures the whole device.

For hardware experiments, I report:

- backend and execution date;
- transpiler and optimization settings;
- final depth, two-qubit gate count, and layout;
- shot count and mitigation method;
- raw and mitigated results;
- ideal noise-free result for the same transpiled circuit;
- repeated executions where practical.

Cross-platform execution can add another check. A [Nature Communications study](https://www.nature.com/articles/s41467-022-34279-5) compared nominally identical states across different quantum-computing platforms using randomized measurements. Agreement does not prove correctness by itself, but disagreement reveals a problem that a single-platform test may miss.

## Avoid weak benchmarks

A benchmark is weak when:

- the test cases are selected after seeing results;
- only the best seed is reported;
- the baseline is outdated or poorly tuned;
- simulator and hardware settings are mixed;
- the target tolerance is chosen after the experiment;
- failure cases are omitted;
- resource cost is excluded.

The 2019 Google sampling experiment demonstrated a large performance gap for a specific random-circuit task, as reported in [Nature](https://www.nature.com/articles/s41586-019-1666-5). IBM’s 2023 work instead presented [evidence for utility before fault tolerance](https://www.nature.com/articles/s41586-023-06096-3) on a many-body physics calculation and explicitly stated that it was not claiming a proven application speedup. These examples use different tasks and different claims. Validation begins by not confusing them.

## My minimum release checklist

Before I publish a quantum-algorithm result, I want:

- a written claim and tolerance;
- independent small-system references;
- tests for every deterministic transformation;
- multiple geometries or instances, not one convenient case;
- multiple optimization seeds;
- uncertainty estimates;
- raw and processed results;
- complete configuration and dependency versions;
- a script that regenerates every reported table;
- documented limitations and failed cases.

## The practical lesson

Validation is not one comparison at the end. It is an evidence chain.

The strongest result is not the one with the smallest error printed to six decimal places. It is the one for which I can explain where every remaining error may have entered, how large it is, and what experiment would detect it.

## Sources and further reading

- [Qiskit Nature: ground-state solvers](https://qiskit-community.github.io/qiskit-nature/tutorials/03_ground_state_solvers.html)
- [Wilson et al., best practices for scientific computing](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001745)
- [Nature Reviews Physics: quantum certification and benchmarking](https://www.nature.com/articles/s42254-020-0186-4)
- [Cross-platform comparison of arbitrary quantum states](https://www.nature.com/articles/s41467-022-34279-5)
- [Google random-circuit sampling experiment](https://www.nature.com/articles/s41586-019-1666-5)
- [IBM evidence for utility before fault tolerance](https://www.nature.com/articles/s41586-023-06096-3)
