# Diatonic

[![Lint, Test, Type Check, Build](https://github.com/vegardege/diatonic/actions/workflows/ci.yml/badge.svg)](https://github.com/vegardege/diatonic/actions/workflows/ci.yml)

Diatonic is a web application for discovering and reverse-looking up musical scales and chords using an interactive piano interface with realistic audio playback.

**Live Demo:** https://diatonic.pebblepatch.dev/

## Screenshot

![Web site screenshot](assets/diatonic.png)

## Installation & Setup

### Prerequisites

- Node.js 20+ and npm

### Development

```bash
# Clone the repository
git clone https://github.com/vegardege/diatonic.git
cd diatonic

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Other Commands

```bash
npm run typecheck   # Type check with TypeScript
npm run check       # Lint and format check with Biome
npm run check:fix   # Auto-fix linting and formatting issues
npm test            # Run tests with Vitest
```

## Built With

### Core Technologies

- **[React 19](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tooling and dev server

### Music & Audio

- **[kamasi](https://github.com/vegardege/kamasi)** - Music theory library for scales, chords, and note calculations
- **[@diatonic/piano](https://github.com/vegardege/diatonic-piano)** - Interactive SVG piano keyboard component
- **[Tone.js](https://tonejs.github.io/)** - Web Audio framework for realistic piano sound synthesis
- **[Salamander Grand Piano](https://archive.org/details/SalamanderGrandPianoV3)** - Public domain piano samples (Yamaha C5, recorded by Alexander Holm)

## Credits

- Piano samples: [Salamander Grand Piano V3](https://archive.org/details/SalamanderGrandPianoV3) by Alexander Holm, licensed under CC-BY 3.0
- Music theory calculations: [kamasi](https://github.com/vegardege/kamasi)
- Piano keyboard UI: [@diatonic/piano](https://github.com/vegardege/diatonic-piano)
