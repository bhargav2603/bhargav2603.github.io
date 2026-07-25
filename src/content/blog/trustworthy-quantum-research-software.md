---
title: "Building quantum research software that can be trusted"
description: "A practical approach to configuration, testing, provenance, automation, and reproducibility in quantum research code."
pubDate: 2026-07-21
tags: ["research software", "testing", "reproducibility", "Python"]
category: "engineering"
draft: false
featured: false
toc: true
readingTime: "6 min read"
---

Research code often begins as an answer to one question. Then the question changes, a second molecule is added, a different optimizer is requested, hardware access becomes available, and the notebook quietly turns into infrastructure.

The transition is where many projects become difficult to trust. The code still runs, but assumptions are scattered across cells, filenames, comments, and memory.

My goal is not to turn every experiment into an enterprise platform. It is to make the path from configuration to conclusion inspectable and repeatable.

## Treat software as part of the experiment

Wilson and colleagues describe software as another form of experimental apparatus in their paper on [best practices for scientific computing](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001745). I find that framing useful.

If a laboratory instrument changed behavior when moved to another room, we would investigate it. Research software deserves the same attention when it changes with a dependency version, random seed, machine, or hidden notebook state.

## Make configuration explicit

I prefer one structured configuration object over values distributed through the code:

```yaml
system:
  geometry: data/h2.xyz
  charge: 0
  spin: 0
  basis: sto-3g

mapping:
  type: jordan_wigner
  taper_symmetries: false

solver:
  ansatz: uccsd
  optimizer: slsqp
  max_iterations: 200
  seed: 2603

execution:
  mode: statevector
  shots: null
```

The configuration should be validated before a run begins. A basis name, unit, optimizer tolerance, or shot count should not fail after an expensive calculation has already started.

I also save the resolved configuration with the result. Defaults can change between software versions; the saved file should show what was actually used.

## Separate domain layers

A maintainable quantum-chemistry project might contain:

```text
src/
  chemistry.py
  active_space.py
  mapping.py
  ansatz.py
  execution.py
  analysis.py
  reporting.py
tests/
configs/
scripts/
```

The exact names do not matter. The boundaries do.

The chemistry layer should not know how a plot is styled. The mapper should not read command-line arguments. The report should not silently rerun an optimizer. Clear boundaries make it possible to test scientific transformations without invoking the entire stack.

## Use a layered test suite

I use five kinds of tests.

### Unit tests

Test one deterministic operation: parsing geometry, calculating a correction, converting units, or assembling fragment energies.

### Invariant tests

Check properties that should always hold:

- a Hamiltonian is Hermitian;
- probabilities sum to one within tolerance;
- particle number is conserved where expected;
- energy shifts are applied once;
- equivalent geometry formats produce the same internal structure.

### Reference tests

Store small, independently verified cases such as H₂. Compare energies, orbital counts, Pauli terms, or observables within justified tolerances.

### Integration tests

Run the smallest complete workflow from configuration to output. This catches mismatches between correct components.

### Regression tests

Every important bug becomes a test. This is one of the highest-return habits in research software because it converts a past failure into permanent coverage.

The article [“Ten simple rules for making research software more robust”](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005412) defines robust software in practical terms: it should install on more than one computer, work consistently as advertised, and integrate with other tools.

## Record provenance with every result

A result directory should explain itself:

```text
run-2026-07-21T104200/
  config.yaml
  environment.txt
  metadata.json
  raw_measurements.json
  result.json
  convergence.csv
  run.log
```

Useful metadata includes:

- Git commit;
- Python and package versions;
- operating system;
- random seeds;
- backend name;
- job identifiers;
- start and end times;
- transpiler settings;
- calibration timestamp where available.

I do not rely on the filename to encode all of this. Filenames are for navigation; structured metadata is for analysis.

## Automate the checks

A local test that nobody remembers to run is weaker than a small automated check on every change.

A basic continuous-integration pipeline can:

1. install the package in a clean environment;
2. run formatting and static checks;
3. run fast unit and reference tests;
4. build documentation;
5. execute one minimal end-to-end example.

Hardware tests should usually be separate because they are slow, costly, and variable. Their absence should not prevent deterministic software tests from running.

NIST’s [Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final) is written for secure software rather than quantum research specifically, but its emphasis on preparing the organization, protecting software, producing well-secured releases, and responding to vulnerabilities transfers well to shared research tooling.

## Notebooks are interfaces, not foundations

Notebooks are excellent for exploration, visualization, and explanation. They become fragile when they contain the only implementation of the algorithm.

My preferred pattern is:

- put reusable logic in an importable package;
- keep notebooks thin;
- restart and run all cells before sharing;
- avoid hidden global state;
- export important figures from scripts as well as notebooks;
- test the package independently.

This preserves the interactive value of notebooks without making execution order part of the scientific method.

## Reproducibility has levels

I separate three goals:

- **repeatability:** I can rerun the work in the same environment;
- **reproducibility:** another person can obtain consistent results from the same code and data;
- **robustness:** the conclusion remains stable under reasonable changes in seeds, platforms, or parameters.

A lockfile can help repeat a software environment. It does not establish scientific robustness. That requires sensitivity analysis and independent checks.

The [FAIR principles](https://www.nature.com/articles/sdata201618) focus on making research outputs findable, accessible, interoperable, and reusable. For software, that means more than uploading code: add a license, versioned releases, citation metadata, documentation, and an example that actually runs.

## What I would publish with a project

My minimum public package would include:

- a clear research question;
- installation instructions tested in a clean environment;
- one five-minute example;
- configuration documentation;
- reference results with tolerances;
- tests and continuous integration;
- a limitations section;
- a license and citation file;
- a tagged release linked to the reported result.

## The practical lesson

Trust does not come from a large test count or a polished README. It comes from making assumptions visible, failures reproducible, and results traceable to code and configuration.

Good research software does not remove uncertainty. It tells us where the uncertainty is.

## Sources and further reading

- [Wilson et al., best practices for scientific computing](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001745)
- [Ten simple rules for making research software more robust](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005412)
- [FAIR Guiding Principles](https://www.nature.com/articles/sdata201618)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final)
- [PySCF project and publications](https://pyscf.org/about.html)
