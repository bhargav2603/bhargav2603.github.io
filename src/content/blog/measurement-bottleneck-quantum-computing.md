---
title: "Why measurement is a bottleneck in quantum computing"
description: "Why expectation values require repeated circuit execution, where the measurement cost comes from, and which optimizations are worth testing first."
pubDate: 2026-07-23
tags: ["quantum measurement", "VQE", "sampling", "Qiskit"]
category: "research"
draft: false
featured: false
toc: true
readingTime: "6 min read"
---

Running a quantum circuit once rarely gives the number an algorithm needs. It gives a sample.

That difference is central to variational algorithms. VQE, for example, minimizes an energy expectation value, but hardware returns bit strings. Estimating the energy requires many circuit executions, repeated across measurement bases and optimizer iterations.

In small statevector experiments, this cost is easy to miss because an exact expectation value can be calculated directly. On hardware, measurement becomes part of the algorithm.

## From a Hamiltonian to samples

After mapping a molecular Hamiltonian to qubits, it has the form

$$
\hat{H} = \sum_i c_i P_i,
$$

where each \(P_i\) is a Pauli string such as \(Z_0Z_1\) or \(X_0Y_1Y_2X_3\). The energy of a state \(|\psi\rangle\) is

$$
E = \langle \psi|\hat{H}|\psi\rangle
= \sum_i c_i \langle P_i\rangle.
$$

For a Pauli observable, one shot produces an outcome of \(+1\) or \(-1\). Repeating the circuit estimates the mean. If the observable variance is \(\sigma_i^2\), the standard error decreases approximately as

$$
\mathrm{SE}_i = \frac{\sigma_i}{\sqrt{N_i}},
$$

where \(N_i\) is the number of shots assigned to that observable. Halving statistical error therefore requires roughly four times as many samples, all else being equal.

This square-root scaling is why “just add more shots” becomes expensive quickly.

## Why chemistry makes it visible

An electronic Hamiltonian can generate many Pauli terms after fermion-to-qubit mapping. Verteletskyi, Yen, and Izmaylov note that the number of electronic-structure terms grows as \(O(N^4)\) with the system size in their work on [measurement optimization using minimum clique cover](https://arxiv.org/abs/1907.03358).

Not every term needs its own circuit. Terms that are compatible in a common measurement basis can be grouped and estimated from the same bit strings. The grouping problem can be represented as a graph: Pauli terms are vertices, and compatible terms are connected. Finding the minimum number of groups maps to a minimum clique-cover problem, which is computationally hard in general, so practical implementations use heuristics.

The important point is not the graph terminology. It is that circuit count depends on the grouping strategy, not only on the number of Hamiltonian terms.

## The four costs I track

I separate measurement cost into four quantities:

| Quantity              | What it tells me                          |
| --------------------- | ----------------------------------------- |
| Pauli terms           | Raw observable count after mapping        |
| Measurement groups    | Distinct circuit bases after grouping     |
| Shots per group       | Statistical budget assigned to each group |
| Optimizer evaluations | How often the energy must be estimated    |

The total workload is approximately the number of measurement groups multiplied by shots per group and objective-function evaluations. Additional overhead comes from calibration, error mitigation, and rejected jobs.

A method that saves 30% of the groups but doubles the optimizer evaluations is not automatically an improvement. I measure the full workflow.

## What can be improved?

### 1. Group compatible observables

Qubit-wise commuting terms can be measured together using single-qubit basis rotations. More general commuting groups may reduce the number of groups further but can require entangling measurement circuits.

The right comparison includes:

- number of groups;
- added circuit depth;
- sensitivity to hardware noise;
- classical time needed to build the grouping;
- final error at a fixed total shot budget.

Fewer groups are useful only if the extra basis-change circuit does not erase the gain.

### 2. Allocate shots by variance

Uniform allocation gives every group the same number of shots. That is simple but often inefficient. A group with low variance may already be estimated precisely, while a high-variance group dominates the energy uncertainty.

A practical strategy is:

1. spend a small pilot budget on every group;
2. estimate group variances;
3. allocate the remaining shots in proportion to estimated importance;
4. impose a minimum allocation so no group is ignored.

Research on [minimizing estimation runtime on noisy quantum computers](https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.2.010346) treats runtime—not just raw shot count—as the operational target. This is closer to what matters when queues, circuit switching, and device latency are involved.

### 3. Reuse information

An optimizer evaluates nearby parameter values. Consecutive quantum states may therefore have related measurement statistics. Reusing previous variance estimates, warm-starting the allocation, and caching identical circuits can reduce avoidable work.

Reuse must be validated. A variance estimate from an early, nearly Hartree–Fock state may be misleading near a strongly correlated solution.

### 4. Stop with a statistical rule

I prefer a stopping condition tied to uncertainty rather than a fixed shot count. Examples include:

- stop when the confidence interval is below a target;
- stop when optimizer progress is smaller than the measurement uncertainty;
- increase precision only near convergence;
- repeat the final point independently before reporting it.

This treats precision as part of the experiment instead of a number chosen by habit.

## Noise and sampling are different

More shots reduce sampling uncertainty. They do not remove systematic device error.

Readout bias, gate noise, drift, crosstalk, and imperfect state preparation can move the mean itself. Repeating a biased experiment more times produces a more precise biased answer.

I therefore report at least:

- the estimated value;
- a sampling uncertainty or repeated-run spread;
- the shot budget;
- backend and calibration context;
- mitigation settings;
- an ideal or exact reference where feasible.

NIST’s work on [randomized benchmarking](https://www.nist.gov/publications/randomized-benchmarking-quantum-gates) illustrates the wider point: quantum-device performance needs protocols that distinguish operational error from state-preparation and measurement effects.

## A practical benchmark

For a measurement method, I would test the following sequence:

1. choose several small Hamiltonians with exact reference energies;
2. fix the state or optimizer trajectory;
3. compare methods at equal total shots;
4. repeat with multiple random seeds;
5. record error, variance, circuits, depth, and runtime;
6. repeat under an explicit noise model or real backend;
7. publish cases where the method loses as well as where it wins.

The last step is important. A measurement method can be excellent for many observables and poor for a single energy, or effective in a simulator and fragile on hardware.

## The practical lesson

Measurement is not a final readout attached to a quantum algorithm. It is a resource allocation problem inside the algorithm.

The most useful question is not “How many shots did I use?” It is “How much reliable information did I obtain for the total execution cost?”

## Sources and further reading

- [Verteletskyi, Yen, and Izmaylov, measurement optimization in VQE](https://arxiv.org/abs/1907.03358)
- [Izmaylov et al., unitary partitioning for VQE measurement](https://arxiv.org/abs/1907.09040)
- [Crawford et al., minimizing estimation runtime](https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.2.010346)
- [NIST, randomized benchmarking of quantum gates](https://www.nist.gov/publications/randomized-benchmarking-quantum-gates)
- [Nature Reviews Physics, quantum certification and benchmarking](https://www.nature.com/articles/s42254-020-0186-4)
