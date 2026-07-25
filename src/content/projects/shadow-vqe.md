---
title: "Classical Shadow Tomography for VQE"
shortTitle: "ShadowVQE"
summary: "A research package for comparing standard VQE measurements with uniform and Hamiltonian-adaptive classical shadows."
question: "Can smarter measurement choices reduce the number of repeated quantum-circuit runs needed to estimate molecular energies?"
currentFocus: "Comparing measurement strategies under equal shot budgets and identifying the regimes where adaptive sampling genuinely helps."
technologies: ["Python", "Qiskit Aer", "Classical Shadows", "NumPy", "Pytest"]
repoUrl: "https://github.com/bhargav2603/Tomography-"
category: "quantum measurement"
order: 2
status: "Research prototype"
accent: "ink"
---

## Problem

VQE can spend a significant share of its cost estimating many Pauli observables. Classical shadows offer a reusable measurement representation, but their practical advantage depends on system size, shot budget, and how measurements are sampled.

## Implementation

ShadowVQE includes standard VQE, uniform random Pauli shadows, Hamiltonian-adaptive sampling, molecular Hamiltonians for H₂/H₄/H₆, and benchmark scripts for error scaling, shot-budget fairness, measurement-group growth, Pauli-term scaling, and adaptive variance.

## Result

The experiments observed approximately \(N^{-0.55}\) estimation-error scaling and up to 6.3× lower sample variance for Hamiltonian-adaptive shadows in a low-shot H₆ regime. The repository distinguishes the cost of collecting a shadow from the cost of estimating each observable.
