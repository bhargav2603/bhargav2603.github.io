---
title: "SQD-Corrected Drug Rescoring"
shortTitle: "qbind"
summary: "A research workflow that measures whether a correlated or quantum correction changes ligand ranking relative to a classical baseline."
question: "Can a quantum or correlated-energy correction change which small molecular candidate appears most promising?"
currentFocus: "Validating the correction-and-ranking pipeline on controlled cluster models before considering larger docking workflows."
technologies: ["Python", "Quantum Chemistry", "DFT", "CASSCF", "Scientific Computing"]
repoUrl: "https://github.com/bhargav2603/protien-ligand"
category: "quantum life sciences"
order: 3
status: "Experimental research"
accent: "stone"
---

## Research question

qbind asks a narrow, testable question: did a correlated or quantum-computed correction change a ligand ranking relative to a classical-only baseline, by how much, and in which direction?

## Current scope

The completed workflow supports a synthetic reference mode and a molecular mode for small metal–ligand cluster models. It produces comparative rankings, deltas, and report figures through a single configuration file.

## Boundary

The current repository is not a full protein-scale docking solution. Vina docking and DMET-style embedding are future adapter paths. The portfolio describes the completed cluster-scale pipeline separately from that planned extension so the research claim remains precise.
