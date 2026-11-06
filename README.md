# Kumail Abbas — React + Ant Design portfolio

A research-first, responsive portfolio built with **React 18**, **Vite 6**, **Ant Design 5**, and `@ant-design/icons`.

## Requirements

- Node.js 20+ recommended
- npm

## Local development

```bash
npm install
npm run dev
```

Open the local URL displayed in the terminal (typically http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The static output is in `dist/`. Vite is configured with a relative asset base (`./`) so it can also deploy to GitHub Pages project repositories.

## Edit your content

- `src/data.json`: research projects, engineering projects, jobs, skills, education, courses.
- `src/App.jsx`: introduction, contact info, section layouts.
- `src/components/ProjectCard.jsx`: reusable cards.
- `src/styles.css`: layout, spacing, colors, responsive design.
- `src/main.jsx`: Ant Design theme.

The GitHub profile URL is intentionally omitted because it has not been supplied. Update this once known. Employer projects should only be described with publicly shareable information.

## Deploy to GitHub Pages

The simplest route is a GitHub Actions workflow that builds and deploys the `dist/` directory; a ready workflow is included in `.github/workflows/deploy.yml`.

1. Push this repository to GitHub.
2. In repository **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push changes to the `main` branch. The workflow builds and publishes automatically.

Alternatively, upload the contents of `dist/` to any static hosting provider (Netlify, Vercel, Cloudflare Pages, etc.).

## Notes

- The portfolio uses no backend and no private keys.
- No private dataset images or confidential research data are bundled.
- Employment dates follow the more recent LinkedIn details supplied in chat when the older resume differs.
