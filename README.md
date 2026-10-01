# esmaeeilmoradi.github.io

Personal site of Esmaeeil Moradi — Senior Android & Kotlin Multiplatform engineer.
English at `/`, Persian (RTL) at `/fa/`.

Built with [Astro](https://astro.build) and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Where things live

| What | Where |
|---|---|
| All page text (EN + FA), projects, experience | `src/data/site.ts` |
| Page layouts | `src/components/*Page.astro`, shared shell in `src/layouts/Base.astro` |
| 30-Day Challenge captions | `src/content/challenge/NN-en.md`, `NN-fa.md` |
| Challenge carousels and covers | `public/challenge/` |
| Slide counts per day | `src/data/challenge-pages.json` |

To add a challenge day or update a carousel, replace the caption and PDF, regenerate the cover with
`pdftoppm -f 1 -l 1 -scale-to-x 480 -scale-to-y -1 -jpeg day-NN-en.pdf covers/NN-en`, and update the slide count.
