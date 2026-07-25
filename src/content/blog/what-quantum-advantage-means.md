---
title: "What does quantum advantage actually mean?"
description: "A practical vocabulary for separating theoretical speedups, beyond-classical experiments, scientific utility, and real operational value."
pubDate: 2026-07-20
tags: ["quantum advantage", "NISQ", "benchmarking", "quantum computing"]
category: "perspective"
draft: false
featured: true
toc: true
readingTime: "6 min read"
---

“Quantum advantage” is often used as if it describes one finish line. It does not.

A quantum processor can outperform a classical method on a carefully selected sampling task without solving a useful industrial problem. A quantum algorithm can have a proven asymptotic speedup while requiring hardware far beyond what exists. A hybrid workflow can produce a scientifically interesting result without being faster or cheaper.

These are all meaningful achievements, but they are different achievements.

## Four levels of advantage

I find it useful to separate four claims.

### 1. Theoretical advantage

A quantum algorithm has better asymptotic complexity than the best known classical approach under stated assumptions.

[Shor’s algorithm](https://epubs.siam.org/doi/10.1137/S0097539795293172) is the standard example: factoring and discrete logarithms can be solved in polynomial time on a sufficiently capable quantum computer. The algorithmic result is real even though fault-tolerant resources for cryptographically relevant instances remain demanding.

This level is about complexity, not current hardware.

### 2. Computational advantage

A quantum device completes a specific, well-defined task beyond the practical reach of available classical computation.

Google’s 2019 Sycamore experiment sampled random quantum circuits on 53 qubits. The paper reported about 200 seconds for the quantum processor and estimated a much larger classical cost for the specific task. The peer-reviewed result and methodology are available in [Nature](https://www.nature.com/articles/s41586-019-1666-5).

The task was designed as a benchmark, not as a commercial application. Calling it useless would ignore the hardware achievement. Calling it useful quantum computing would overstate the result.

### 3. Scientific utility

A quantum computer produces a result that helps answer a scientific question at a scale or quality that is difficult for relevant classical methods.

IBM’s 2023 experiment ran 127-qubit circuits for a two-dimensional Ising model and compared error-mitigated results with classical approximations. The authors described it as [evidence for utility before fault tolerance](https://www.nature.com/articles/s41586-023-06096-3), while explicitly stating that they were not demonstrating a problem with a proven quantum speedup.

That qualification is important. Utility is an application claim; advantage is a comparative performance claim.

### 4. Practical advantage

A quantum-enabled workflow is better for a real user after considering:

- solution quality;
- total wall-clock time;
- financial cost;
- energy and infrastructure;
- reliability;
- integration effort;
- repeatability;
- availability of strong classical alternatives.

This is the hardest level and the one that matters most commercially.

## The classical baseline must be serious

A quantum result is only as strong as its classical comparison.

The baseline should be:

- the best relevant method, not the easiest one to implement;
- tuned by someone who understands it;
- run on appropriate hardware;
- evaluated at equal output quality;
- measured end to end;
- updated when classical algorithms improve.

Quantum experiments have repeatedly motivated better classical simulation. This is healthy. The boundary is not fixed.

I would never compare a carefully optimized quantum workflow with an untuned classical script and call the difference an advantage.

## Scale alone is not enough

Qubit count is easy to communicate and incomplete as a performance measure. Useful computation also depends on:

- gate fidelity;
- connectivity;
- circuit depth;
- measurement speed;
- calibration stability;
- compiler quality;
- error correction or mitigation overhead.

John Preskill introduced the “NISQ” framing in his 2018 paper, [“Quantum Computing in the NISQ era and beyond”](https://quantum-journal.org/papers/q-2018-08-06-79/). His central message was balanced: near-term devices could explore regimes beyond brute-force classical simulation, but noise limits reliable circuit depth, and a roughly 100-qubit machine would not transform the world immediately.

That remains a good standard for discussing progress: ambitious without skipping the constraints.

## Error mitigation is not error correction

Error mitigation estimates or reduces bias using additional circuits, calibration, extrapolation, post-processing, or structural assumptions. It can improve an observable without encoding a protected logical qubit.

Quantum error correction instead spreads logical information across physical qubits and detects or corrects faults. It introduces substantial overhead but offers a path to arbitrarily long reliable computation below an error threshold.

An error-mitigated result should report its sampling and execution overhead. A corrected result should report logical performance, not only physical-qubit fidelity.

## A checklist for reading advantage claims

When I read a claim, I ask:

1. **What exact task was solved?**
2. **Was the output independently verifiable?**
3. **What classical algorithms and hardware were used?**
4. **Was accuracy matched across methods?**
5. **What assumptions define the comparison?**
6. **Does the claim concern runtime, cost, energy, or only asymptotic scaling?**
7. **How much error mitigation, post-selection, or calibration was required?**
8. **Is the task scientifically or economically useful?**
9. **Can another group reproduce it?**
10. **Would the conclusion survive a stronger classical baseline?**

## Industry roadmaps are perspectives, not evidence

Industry teams have legitimate reasons to publish roadmaps: they coordinate engineering, attract collaborators, and state what they believe is achievable. They are valuable sources for understanding strategy, but they are not substitutes for independent benchmarks.

Google Quantum AI describes its long-term goal as a large-scale error-corrected computer and acknowledges that reaching it requires major improvements in system performance and scale in its [hardware roadmap discussion](https://blog.google/innovation-and-ai/technology/research/quantum-hardware-verifiable-advantage/). IBM describes a [quantum-centric model](https://research.ibm.com/blog/accelerating-qpus-with-gpus) in which QPUs work with CPUs and GPUs rather than replace them.

I read these positions as engineering hypotheses. The evidence comes from reproducible experiments and peer-reviewed results.

## Where I think the near-term value is

The most credible work today is often less dramatic than a universal speedup:

- learning how errors behave in application circuits;
- testing algorithms on scientifically motivated small systems;
- improving compilation and measurement;
- building hybrid workflows;
- developing verification methods;
- estimating fault-tolerant resources;
- finding narrow structures that a quantum method can exploit.

These steps do not need inflated claims. They are how a field matures.

## The practical lesson

Quantum advantage should name a comparison, not create an atmosphere.

A strong statement looks like this:

> For task \(T\), at accuracy \(\epsilon\), on specified hardware, the quantum workflow used resource \(R_q\), while the strongest tested classical workflow used \(R_c\), under these assumptions.

If a claim cannot be written that precisely, it probably needs more work.

## Sources and further reading

- [Preskill, Quantum Computing in the NISQ era and beyond](https://quantum-journal.org/papers/q-2018-08-06-79/)
- [Shor, polynomial-time factoring and discrete logarithms](https://epubs.siam.org/doi/10.1137/S0097539795293172)
- [Google’s 2019 random-circuit sampling experiment](https://www.nature.com/articles/s41586-019-1666-5)
- [IBM’s evidence for utility before fault tolerance](https://www.nature.com/articles/s41586-023-06096-3)
- [Nature Reviews Physics: quantum certification and benchmarking](https://www.nature.com/articles/s42254-020-0186-4)
- [Google Quantum AI hardware roadmap perspective](https://blog.google/innovation-and-ai/technology/research/quantum-hardware-verifiable-advantage/)
- [IBM Research quantum-centric computing perspective](https://research.ibm.com/blog/accelerating-qpus-with-gpus)
