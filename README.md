# Alejo — 3D Creator

A responsive portfolio built with React 18, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Development

```sh
npm install
npm run dev -- --port 5174 --strictPort
```

On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`. Open http://localhost:5174 after starting the development server.

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Content and interactions

- All five sections follow the supplied brief, including 21 marquee tiles and nine project images.
- All images are saved locally. Original source URLs are preserved in `src/data.ts`. The supplied Celestia GIF returns HTTP 404; its tile uses the supplied Solaris artwork as a fallback. The 20 original animated GIFs total about 166 MB and are lazy loaded, with browser caching shared across repeated tiles.
- The hero uses `public/images/alejo-caricatura-transparent.png`, a transparent cutout of the user-supplied `alejo-caricatura.png`. The transparent background prevents a dark rectangle from covering the heading during magnetic movement. Framing compensates for the image's margins to match the original portrait's visible height.
- Navigation links scroll to the corresponding sections. Price points to Services because the brief provides no pricing.
- Contact buttons open an accessible project inquiry dialog. It validates the inputs and copies a formatted inquiry; it does not send or store personal details. Connect an email address or form service when contact details become available.
- Live Project buttons open a project preview because external project destinations were not supplied. Replace these with actual project URLs when available.
- Pointer magnetism, scroll-driven text, opposing image marquees, and stacking cards respect reduced-motion preferences. Animated GIFs are supplied as GIFs and retain their own animation.

Content is in `src/data.ts`, reusable components in `src/components.tsx`, and styling in `src/styles.css`.

## Editing and version control

- `src/App.tsx`: page structure, sections, and introductory text.
- `src/data.ts`: projects, services, and gallery content.
- `src/styles.css`: layout, colors, responsive styles, and visual effects.
- `public/images/`: local image assets.

The development server reloads changes automatically. Save a version with:

```sh
git add .
git commit -m "Describe the changes"
```

After connecting this folder to GitHub and uploading the first commit, use `git push` to upload subsequent commits. Dependencies, build output, local artifacts, and environment files are excluded by `.gitignore`.
