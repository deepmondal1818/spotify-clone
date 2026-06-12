# Spotify Clone 🎵

A pixel-accurate Spotify UI clone built with React, featuring custom audio controls.

## Features

- 🎨 Faithful Spotify dark UI with all panels (Sidebar, TopBar, Main, Player)
- ▶️ Custom audio player — play/pause, previous/next, seek bar, volume
- 🔀 Shuffle & repeat (none / all / one)
- ❤️ Like songs (togglable heart icons, both in tracklist and player bar)
- 🎵 Simulated playback progress (plug in real `.mp3` files easily)
- 📋 Sidebar with library, playlists, and navigation
- 🏠 Home with quick-picks grid, featured charts, and full tracklist

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Adding Real Audio

In `src/data/songs.js`, set the `audioSrc` field for any song:

```js
audioSrc: "/audio/blinding-lights.mp3",
```

Place your `.mp3` files in the `public/audio/` folder.

## Tech Stack

- React 18
- CSS Modules (plain CSS)
- react-icons
- No external UI library — fully custom components
