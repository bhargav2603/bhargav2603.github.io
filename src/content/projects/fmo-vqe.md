---
title: "Fragment Molecular Orbital VQE"
shortTitle: "FMO-VQE"
summary: "A modular quantum-chemistry library that solves small fragments with VQE and reconstructs molecular energies with FMO corrections."
question: "Can a molecular problem be divided into smaller quantum calculations without losing the accuracy needed for chemistry?"
currentFocus: "Extending the validation beyond small hydrogen systems and making every experiment reproducible from configuration to final energy."
technologies: ["Python", "Qiskit", "Qiskit Nature", "PySCF", "SciPy"]
repoUrl: "https://github.com/bhargav2603/FMO-VQE"
category: "quantum chemistry"
order: 1
status: "Research prototype"
accent: "coral"
---

## Problem

Full-molecule VQE calculations become difficult as orbital spaces and qubit counts grow. FMO-VQE partitions a molecule into small fragments, executes VQE on independently bounded problems, and restores pair interactions through the FMO2 energy expression.

## Implementation

The `qfmo` package separates molecular configuration, active-space Hamiltonian generation, UCCSD–VQE execution, fragment/dimer scheduling, energy assembly, plotting, and reference validation. The package supports reproducible batch runs and automated tests rather than a single notebook-only experiment.

## Result

Across the H₂/H₄/H₆ benchmark set, FMO2 corrections reduced the maximum absolute FCI deviation from 8.3 mHa to 1.03 mHa, bringing every corrected case within the ±1.6 mHa chemical-accuracy threshold.
