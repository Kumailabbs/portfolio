# Kumail Abbas — Interactive 3D Research Portfolio

Responsive **React 18 + Ant Design 5 + Three.js** portfolio, based on the supplied resume and LinkedIn work history.

## Quick start

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The static output is generated in `dist/`. To deploy on GitHub Pages, push to GitHub and enable the included Pages workflow (Settings → Pages → Source: GitHub Actions). Vite uses a relative base (`./`) compatible with repository Pages URLs.

## What's new in the 3D edition

- True realtime **WebGL hero** with a procedurally generated AI-inspired structure, orbit rings and satellite nodes, interactive mouse parallax, and pause/resume control.
- Pointer-reactive **3D project cards** with depth and subtle light sheen.
- Mobile-friendly 2D layout fallback; WebGL capability fallback; reduced-motion friendly cards.
- No 3D model downloads, external artwork, third-party tracking, or external API keys required.

## Edit portfolio information

- `src/data.json`: research, career, engineering, skills, education and certifications.
- `src/components/ResearchScene3D.jsx`: 3D WebGL visualization.
- `src/components/ProjectCard.jsx`: project cards and tilt interaction.
- `src/styles.css`: colors, typography, responsiveness.
- `src/App.jsx`: page sections and navigation.

Review project descriptions and employer permission before publishing. Commercial roles follow the newer LinkedIn dates where supplied. Research studies should not be represented as already published.


## Full-screen 3D cover
The interactive Three.js visualization now fills the homepage cover behind the headline, rather than appearing as a small right-side card. The headline uses gradient overlays for contrast. Desktop and mobile styles are included.

## Language support (EN / 한국어)

- The header provides an English / Korean switch. It works on desktop and mobile and stores the selection in `localStorage`.
- Main headings, descriptions, career history, project cards and filters are translated into Korean. Technology names, organization names, URLs and course titles remain in their original form as proper nouns.
- Edit `src/translations.js` for interface copy. Each project, experience, education, and skill group has optional Korean content in `src/data.json`.
- A separate language section lists Balti (native), Urdu and English (proficient), Korean (TOPIK Level 4), and Arabic and Persian (reading ability). Arabic and Persian are NOT offered as website translation options.
