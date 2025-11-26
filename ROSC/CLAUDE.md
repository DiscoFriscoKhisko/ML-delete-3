# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Dev server on port 3000 (auto-opens browser)
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Architecture

React 19 + Vite + Tailwind CSS + GSAP. Components in `src/components/`.

Vite root is `src/` - entry point is `src/index.html`. Build outputs to `dist/`.

### GSAP Setup (Critical)
GSAP loaded from local folder outside project (not npm):
```javascript
// vite.config.js aliases
'gsap': path.resolve('.../gsap-public/esm')
'gsap/ScrollTrigger': path.resolve('.../gsap-public/esm/ScrollTrigger.js')
'gsap/ScrollToPlugin': path.resolve('.../gsap-public/esm/ScrollToPlugin.js')
```

### Key Constants
`MOTION` and `COLORS` exported from `src/App.tsx` - use these for all animations.

## Important Patterns

- **Animations use GSAP** with ScrollTrigger for scroll-based effects.
- **Responsive motion**: Use `ScrollTrigger.matchMedia()` for desktop/mobile differences.
- **MlBrandKit colors**: CSS variables in `main.css`, Tailwind tokens in `tailwind.config.js`.
