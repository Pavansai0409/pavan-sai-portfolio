# Pavan Sai — Portfolio

A responsive editorial portfolio built with React, Vite, and TypeScript. Pale blue surfaces, navy typography, and locally bundled DM Sans / Instrument Serif fonts. No backend, accounts, tracking, external font requests, or API keys are required.

## Local development

Use Node.js 24 (also specified in `.nvmrc`).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` checks TypeScript and produces `dist/`. `npm run preview` serves the production build locally. `npm run check` checks types without building.

## Edit everything in one place

**`src/content/portfolio.ts` is the content and theme source of truth.** Components and build-time metadata both read it. You do not need to change component code for ordinary updates.

| Change | Configuration |
| --- | --- |
| Name, role, monogram, email, availability, location, social links | `profile` |
| Company name and AI focus (reused across the site) | `company` at the top of the configuration file |
| Intro, headline, buttons | `hero` |
| Show/hide sections, navigation labels, headings | `sections` |
| Projects, technologies, repository/demo URLs, optional screenshots | `projects` |
| Jobs and responsibilities | `experience` |
| Skill categories | `skills` |
| About text, education, CGPA, certifications | `about`, `education`, `certifications` |
| Site colors | `theme.colors` |
| Shared interface labels | `labels` |
| Contact prompt and email subject | `contact` |
| Footer text | `footer` |
| Search description, deployed URL, optional social image | `meta` |

Counts in the hero are derived from experience entries with `kind: 'internship'` and the certification array, and CGPA is read from education. Founder roles do not increase the internship count. Email links, copy-email, branding, browser title, favicon, and structured metadata use the same configuration values. A section with `enabled: false` is hidden and removed from navigation; the section numbers automatically adjust. Set `nav: ''` to keep a section visible but omit its navigation link.

Editing in development updates the preview. To update the published site, commit and push the change to the branch connected to Netlify, or rebuild and redeploy `dist/`. Changing the PDF alone does not extract or rewrite website content automatically.

## Images and résumé

- Replace `public/resume.pdf` with your new résumé, keeping the same name. All download buttons use `profile.resume`. Set it to an empty string to hide them. The supplied PDF includes your phone number; remove it from the PDF before publishing if you do not want it public.
- For a portrait, add an image to `public/` and set `profile.photo` to `/your-photo.webp` and `profile.photoAlt` to a description. Otherwise the site shows the decorative monogram.
- Project illustrations live in `public/images/inkwell.jpg` and `public/images/heart-disease.jpg`. These are AI-generated conceptual artworks, not screenshots of the actual apps. To replace them, add an image to `public/` and update that project's `image` and `imageAlt` in the configuration. Image cards use a responsive 2:1 frame.
- Blank `sourceUrl`, `demoUrl`, and certificate `url` values deliberately hide the corresponding links. Both project repositories are configured. Add live-demo and credential URLs when available. No URLs or performance metrics have been invented.
- Keep text readable when changing colors. `ink` is the primary text/button background, `panel` the button foreground, `muted` secondary text, and `accent` the blue accent. `paper`, `wash`, `secondary`, and `line` control surfaces and borders.

## Deploy on Netlify

1. Push this repository to your own GitHub account.
2. In Netlify, add a new project by importing that repository.
3. Netlify reads `netlify.toml`: build command `npm run build`, publish directory `dist`, Node.js 24. No environment variables are required.
4. Deploy. After you know the production URL, set `meta.siteUrl` to its full HTTPS URL and push again to enable canonical/URL metadata. Optionally set `meta.socialImage` to a full public image URL for social previews.
5. Future pushes to the connected branch rebuild and deploy the site automatically.

Alternatively run `npm run build` locally and upload the **dist folder**, not the source folder, through Netlify's manual deployment interface.

This repository is deployment-ready but has not been published automatically. Its single page uses anchor navigation, so it does not require a catch-all SPA redirect. Hashed assets have long-term caching; the HTML and résumé use the platform's normal cache behavior.

## Accessibility and behavior

Semantic sections, a skip link, keyboard focus indicators, accessible mobile menu with Escape/outside-click handling, native project-detail disclosures, reduced-motion support, descriptive external links, and responsive layouts down to 320px. Email copying shows success/failure feedback and still provides a normal email link. Social/code links open separately; résumé downloads are same-origin.
