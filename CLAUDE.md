# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Production build to dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a React vinyl record player that simulates a turntable where the tonearm controls audio playback.

### Core Interaction Model

The tonearm position maps to audio time:
- **Rest position (-30°)**: Outside record, audio paused
- **Start position (0°)**: Beginning of track
- **End position (25°)**: End of track
- Dragging the tonearm over the record starts playback; dragging it off pauses

### Key Files

| File | Purpose |
|------|---------|
| `src/hooks/useAudioPlayer.js` | HTML5 Audio API wrapper (play, pause, seek, time events) |
| `src/hooks/useTonearmControl.js` | Connects tonearm drag events to audio control |
| `src/utils/mathHelpers.js` | Angle-to-time and time-to-angle conversions |

### Component Hierarchy

```
App
└── VinylPlayer (orchestrates state)
    ├── WoodCabinet (container)
    │   ├── VinylRecord (spinning disc, CSS animation)
    │   └── Tonearm (draggable, controls playback)
    └── FileUploader (local MP3 input)
```

### Design System

Located in `src/styles/variables.css`:
- 8px spacing grid (`--space-1` through `--space-10`)
- Neutral gray palette with single red accent (`--accent: #dc2626`)
- Inter font family with 400/500 weights
