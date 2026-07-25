# Bhargav Krishna — Portfolio

An Astro recreation of the clean al-folio portfolio experience, customized for Bhargav Krishna's quantum-software research.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Validate and build

```bash
npm run validate
npm run preview
```

The production build generates static HTML in `dist/` and creates a Pagefind search index.

## Editing content

- Site identity and navigation: `src/config.ts`
- CV data: `src/data/cv.ts`
- Blog posts: `src/content/blog/`
- Projects: `src/content/projects/`
- Interests: `src/content/interests/`
- Repository fallbacks: `src/data/repositories.ts`

All content collections are schema-validated by Astro.

## Deployment

Push to the `main` branch of `bhargav2603.github.io`. In GitHub repository settings, choose **GitHub Actions** as the Pages source. The included workflow validates, builds, indexes, and deploys the site.

## Attribution

The visual direction is inspired by [al-folio](https://github.com/alshedivat/al-folio), an MIT-licensed Jekyll theme. This site is an independent Astro implementation and does not use al-folio's Jekyll or plugin runtime.
