<div align="center">

# Bhargav Krishna

**Quantum Algorithm Engineer**

Personal website and research portfolio

[**bhargav2603.github.io**](https://bhargav2603.github.io) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/bhargav2603/) &nbsp;·&nbsp; [Email](mailto:cbky2603@gmail.com)

</div>

---

## Hello

I am a Quantum Algorithm Engineer based in Hyderabad, India, working on hybrid
quantum-classical algorithms for problems that are hard for classical computers alone.

My work involves designing and implementing quantum algorithms, benchmarking them
honestly against strong classical baselines, analysing where the performance actually
comes from, and turning the result into something practical. Right now that means
hybrid methods for strongly correlated electronic systems in computational drug
discovery, alongside a broader search for cases where quantum computing adds real
value next to classical computing rather than replacing it.

Before quantum computing, I spent a little over a year at **PwC India** as an Associate
in Risk Consulting, analysing security data in a 24×7 Security Operations Centre and
working directly with clients to identify risks and put fixes in place. That work shaped
how I approach research software: assume it will fail, and find out how before someone
else does.

I hold a B.Tech in Electrical and Electronics Engineering from **VNIT Nagpur**, one of
India's National Institutes of Technology.

I am currently learning **quantum error correction**. If you work in that area, I would
genuinely value a pointer or a conversation.

<br>

## What is on the site

| Section                 | What you will find                                                                   |
| :---------------------- | :----------------------------------------------------------------------------------- |
| **About**               | Who I am, what I work on, and how to reach me                                        |
| **Resume**              | Full professional history, viewable in the browser or downloadable as PDF            |
| **Research & Projects** | Quantum algorithm work, with the research question and current focus stated for each |
| **Blogs**               | 9 essays on quantum algorithms, benchmarking, measurement, and research engineering  |
| **Interests**           | 10 books, articles, people, recordings, and stories I return to                      |

Writing is grouped by **category** — research, engineering, perspective, tutorial, and
experience — so you can read by the kind of thinking rather than by date.

<br>

## Featured work

### FMO-VQE — Fragment Molecular Orbital VQE

A modular quantum-chemistry library that solves small molecular fragments with the
Variational Quantum Eigensolver and reconstructs total molecular energies using
Fragment Molecular Orbital corrections. Validated on H₂, H₄, and H₆ benchmarks, where
FMO2 corrections reduced the maximum absolute deviation from the exact (Full CI) result
**from 8.3 mHa to 1.03 mHa**.

`Python` `Qiskit` `Qiskit Nature` `PySCF` `SciPy` — [repository](https://github.com/bhargav2603/FMO-VQE)

### ShadowVQE — Classical Shadow Tomography for VQE

A research package comparing standard VQE measurement against uniform and
Hamiltonian-adaptive classical shadows. Experiments observed roughly **N⁻⁰·⁵⁵**
estimation-error scaling and up to **6.3× lower sample variance** for adaptive shadows
in a low-shot H₆ regime, while separating the cost of collecting a shadow from the cost
of estimating each observable.

`Python` `Qiskit Aer` `Classical Shadows` `NumPy` `Pytest` — [repository](https://github.com/bhargav2603/Tomography-)

<br>

## How it is built

A deliberately small, fast, static site. No UI framework, no client-side hydration, and
no tracking — the browser receives plain HTML and a few kilobytes of vanilla JavaScript.

| Layer           | Choice                                                  | Why                                                                 |
| :-------------- | :------------------------------------------------------ | :------------------------------------------------------------------ |
| **Framework**   | [Astro 6](https://astro.build) (static output)          | Ships zero framework JavaScript by default                          |
| **Language**    | TypeScript, strict mode                                 | Catches content and prop errors before they reach a page            |
| **Content**     | Astro content collections                               | Every post, project, and interest is schema-validated at build time |
| **Search**      | [Pagefind](https://pagefind.app) + a custom index       | Instant `Ctrl`/`⌘` + `K` search with keyboard navigation            |
| **Mathematics** | [KaTeX](https://katex.org) via `remark-math`            | Equations render server-side, so nothing shifts on load             |
| **Code blocks** | [Shiki](https://shiki.style), dual theme                | Highlighting matches the light and dark palettes                    |
| **Typography**  | [Inter Variable](https://rsms.me/inter/) via Fontsource | Self-hosted; no external font requests                              |
| **Hosting**     | GitHub Actions → GitHub Pages                           | Every push to `main` validates, builds, indexes, and deploys        |

**Also included:** a light and dark theme that remembers your choice, an RSS feed, a
sitemap, an image lightbox for figures, a reading-progress indicator, and a layout that
works from a small phone to a wide desktop.

**Accessibility** was treated as a requirement, not a finishing touch: a skip link,
visible focus outlines, 44-pixel minimum touch targets, correct heading order, ARIA
roles on the search combobox, and full keyboard operation throughout.

<br>

## Repository map

```
src/
├── config.ts            Identity, navigation, and links
├── content/             Blog posts, projects, and interests (Markdown)
├── content.config.ts    Schemas that validate all of the above
├── data/resume.ts       Experience, education, leadership, and skills
├── components/          Cards, icons, search modal, header, footer
├── layouts/             The shared page shell
├── pages/               Routes
└── styles/              Design tokens and global styles
```

<br>

## Credits and references

The visual direction is inspired by [**al-folio**](https://github.com/alshedivat/al-folio),
an MIT-licensed Jekyll theme widely used by academics. This site is an independent Astro
implementation and uses none of al-folio's Jekyll code or plugin runtime.

Built with [Astro](https://astro.build), [Pagefind](https://pagefind.app),
[KaTeX](https://katex.org), [Shiki](https://shiki.style), and
[Inter](https://rsms.me/inter/) via [Fontsource](https://fontsource.org).

Sources for technical claims are cited inline within each essay, linking to the original
papers and documentation.

<br>

---

<div align="center">

**Always happy to connect and have a discussion.**

[cbky2603@gmail.com](mailto:cbky2603@gmail.com) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/bhargav2603/) &nbsp;·&nbsp; [GitHub](https://github.com/bhargav2603)

</div>
