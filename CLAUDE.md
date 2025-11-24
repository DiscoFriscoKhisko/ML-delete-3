# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a website wireframe for "Material Lab" - an AI product studio. The project contains React/TypeScript code embedded in an HTML file (`website.html`) that was exported from a Cocoa HTML Writer.

## Architecture

- **Single-file React application** with TypeScript interfaces
- Uses **Tailwind CSS** for styling with a custom theme configuration
- **Lucide React** icons for UI elements
- Integrates with **Gemini API** for AI-powered features (agent blueprint generation)
- High-contrast black/white/cyan aesthetic design system

## Key Components

The code defines these main React components:
- `App` - Root component orchestrating the page layout
- `Navbar`, `Hero`, `Marquee` - Header and hero sections
- `Capabilities`, `HowWeWork`, `Work` - Service and portfolio sections
- `WhyTeamsChooseUs`, `FinePrintSection`, `Footer` - Trust and contact sections
- `CustomCursor`, `HighContrastButton` - UI utilities

## Theme Configuration

The `theme` object at the top of the file controls:
- Colors (black background, white/gray text, cyan accent `#00FFFF`)
- Typography (font families, sizes for h1-h3)
- Spacing (section and container padding)

The `content` object contains all editable text and navigation data.

## Important Notes

- The HTML file format wraps each line of code in `<p>` tags with custom styling - this needs conversion to standard `.tsx` format before use
- API key for Gemini is left empty and should be injected via environment
- The `generateAgentBlueprint` function has fallback mock data when no API key is present
