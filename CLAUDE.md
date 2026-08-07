# Portfolio — bhargav2603.github.io

Astro static site. Personal portfolio for Bhargav Krishna, quantum algorithm engineer.

## Stack

- Astro 6 (`output: "static"`), TypeScript, no UI framework
- Pagefind for search (build-time index only — search does not work in `astro dev`)
- Content collections in `src/content/` (blog, projects, interests), schema-validated
- Deploys to GitHub Pages via GitHub Actions on push to `main`

## Commands

```bash
npm run dev       # localhost:4321
npm run build     # astro build + pagefind index -> dist/
npm run preview   # serve the production build (use this to test search)
npm run validate  # format:check + astro check + build
```

## Gotchas

- `trailingSlash: "always"` in `astro.config.mjs` — `/blog` 404s, `/blog/` works
- Site content lives in data files, not templates: `src/config.ts` (identity, nav),
  `src/data/cv.ts` (CV), `src/data/repositories.ts` (repo fallbacks)
- Run `npx prettier --write` on changed files before committing; `npm run validate`
  fails on format drift

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:

- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
