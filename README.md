# Jhonny Darwin Miñan Girón — Personal Site

Personal portfolio and professional profile: https://jhonnyminian92.github.io/

## Current positioning

- Senior Full Stack Developer.
- Software Engineer oriented to Artificial Intelligence.
- AI agents, automation, software architecture and production delivery.
- Professional background across software, infrastructure, support and entrepreneurship.
- EcuApp is the startup vision.
- Mnemosine/Mnemonise is the central memory/context project for the EcuApp ecosystem.

## CV

Downloadable PDF versions are available directly from the site:

- `assets/cv/Jhonny-Minan-CV-ES.pdf`
- `assets/cv/Jhonny-Minan-CV-EN.pdf`

Both PDFs are generated from `tools/cv/build.js` (content for ES and EN lives in that file):

```bash
cd tools/cv
npm install
npm run build   # set CHROME_PATH if Chrome is not in the default Windows location
```

## EcuApp ecosystem

EcuApp is a suite of independent systems, each in its own private repository in the [EcuApp organization](https://github.com/orgs/EcuApp/repositories):

- Business management: Hefesto (inventory), Mercurio (electronic invoicing), Atenea (education management), Panacea (medical management).
- Security and documents: Heimdall (authentication), Tyr (electronic document signing).
- AI for voice and documents: Forcis (speech to text), Poseidon (text to speech), Loki (voice cloning), Thot (OCR for images and PDFs).

Mnemosine/Mnemonise is the memory/context layer for projects and AI agents; V1 is completed and under testing.

## Stylesheets

Cascade order (linked from `index.html`): `properties.css` → `index.css` → `responsive.css` → `premium-effects.css` → `hero-effects.css` → `site-fixes.css` → `executive-refresh.css` → `refine.css`. `refine.css` is the final layer for typography, the shared container and layout fixes.

## Deployment

Static GitHub Pages site deployed from `main` through GitHub Actions.

## Repository

https://github.com/JhonnyMinian92/JhonnyMinian92.github.io
