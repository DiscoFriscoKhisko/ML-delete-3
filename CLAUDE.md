# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the **Material Lab** website - an AI-native product studio. The project uses the MlBrandKit design system built with Vite, Tailwind CSS, Alpine.js, and GSAP.

## Development Commands

```bash
cd ROSC && npm run dev      # Dev server on port 3000 (auto-opens browser)
cd ROSC && npm run build    # Production build to dist/
cd ROSC && npm run preview  # Preview production build
```

## Project Structure

```
ROSC/
├── src/
│   ├── index.html          # Main HTML with Alpine.js bindings
│   ├── styles/main.css     # Tailwind + MlBrandKit design system
│   ├── js/main.js          # GSAP animations (1700+ lines)
│   └── assets/logos/       # Material Lab logo variants
├── tailwind.config.js      # Color palette, fonts, custom utilities
├── vite.config.js          # Vite config with GSAP aliases
└── package.json
```

## MlBrandKit Design System

### Color Palette (CSS Variables in main.css)
- **Void Black:** `#050505` (`--void-black`) - Deepest background
- **OLED Black:** `#090909` (`--oled-black`) - Surface level
- **Ghost White:** `#fefefe` (`--ghost-white`) - Primary white
- **Laser Cyan:** `#17f7f7` (`--laser-cyan`) - Primary accent
- **Alabaster:** `#d5dada` (`--alabaster`) - Structure grey

### Spectral Neon Colors
- **Neon Red:** `#ff2a6d` - Destructive/critical
- **Neon Green:** `#05f7a5` - Success/positive
- **Neon Blue:** `#0a84ff` - Info/links
- **Neon Violet:** `#bf5af2` - Spectrum accent

### Typography
- **Display:** Merriweather Bold, -0.02em tracking (`.text-display`)
- **Body:** Inter, 300-500 weight
- **Mono Labels:** 11px, uppercase, 0.2em tracking (`.text-mono-label`)

### Key CSS Classes
- `.depth-card` - Card with OLED-optimized shadows, cyan glow on hover
- `.btn-primary` - Cyan border outline button
- `.btn-secondary` - Ghost white outline button
- `.btn-tertiary` - Link-style with animated underline
- `.btn-destructive` - Neon red button
- `.grain-overlay` - Subtle noise texture (0.04 opacity)
- `.filter-standard` - Monochrome image filter
- `.filter-cyan-tone` - Cool spectral image filter
- `.electric-lift` - Subtle -2px Y translation on hover
- `.magnetic` - Magnetic cursor effect
- `.magnetic-badge` - Badge with elastic magnetic effect

## Architecture

### Animation System (main.js)
All animations use GSAP with centralized motion defaults:
```javascript
const MOTION = {
  duration: { instant: 0.1, fast: 0.3, default: 0.5, slow: 0.7 },
  ease: { primary: 'power2.out', emphatic: 'power3.out', brandReturn: 'power2.inOut' },
  stagger: { default: 0.1, fast: 0.06 }
}
```

Key animation functions:
- `initPreloader()` - Loading sequence with page entrance
- `initCapabilitiesPinReveal()` - ScrollTrigger pinned section
- `initTokenGeneration()` - LLM-style character-by-character reveal
- `initKineticGrid()` - Canvas-based interactive grid
- `initDymaxionGlobe()` - D3-geo Waterman butterfly projection
- `initDepthCardHovers()` - GSAP-controlled hover states

### State Management
- **Alpine.js stores:** `menu` (open/toggle), `cursor` (active/icon)
- **Alpine.js components:** `cursor`, `navigation`

### GSAP Dependencies
Uses local GSAP via Vite alias (not npm):
```javascript
// vite.config.js - points to local gsap-public folder
'gsap': path.resolve('/Users/daminirathi/Desktop/ML explore/ML Claude experiments/gsap-public/esm')
```

Plugins used: ScrollTrigger, SplitText, ScrollToPlugin

### D3 Dependencies
- `d3-geo` and `d3-geo-projection` for Waterman butterfly map projection

## Key Patterns

- **CSS Transitions Disabled:** All hover/transition effects use GSAP, not CSS transitions
- **Alpine.js:** `x-data`, `x-ref`, `@click`, `:class` for reactive state
- **ScrollTrigger:** Desktop/mobile responsive via `ScrollTrigger.matchMedia()`
- **SVG Filters:** Defined in HTML, referenced via `.filter-*` classes
- **Custom Cursor:** Hidden native cursor on `(pointer: fine)` devices