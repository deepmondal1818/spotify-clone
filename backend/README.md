# Spotify Clone Backend

A simple Express.js API server for the Spotify Clone frontend.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get song by ID
- `GET /api/songs/search/:query` - Search songs

### Playlists
- `GET /api/playlists` - Get all playlists
- `GET /api/playlists/:id` - Get playlist by ID
- `GET /api/playlists/:id/songs` - Get songs in a playlist
- `POST /api/playlists/:id/songs/:songId` - Add song to playlist
- `DELETE /api/playlists/:id/songs/:songId` - Remove song from playlist

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Health Check
- `GET /api/health` - Check if backend is running
