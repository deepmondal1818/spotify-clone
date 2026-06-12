const express = require('express');
const router = express.Router();
const { playlists, songs } = require('../data');

// Get all playlists
router.get('/', (req, res) => {
  res.json(playlists);
});

// Get playlist by ID
router.get('/:id', (req, res) => {
  const playlist = playlists.find(p => p.id === parseInt(req.params.id));
  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  res.json(playlist);
});

// Get songs in a playlist
router.get('/:id/songs', (req, res) => {
  const playlist = playlists.find(p => p.id === parseInt(req.params.id));
  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  const playlistSongs = songs.filter(s => playlist.songIds.includes(s.id));
  res.json(playlistSongs);
});

// Add song to playlist
router.post('/:id/songs/:songId', (req, res) => {
  const playlist = playlists.find(p => p.id === parseInt(req.params.id));
  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  const songId = parseInt(req.params.songId);
  if (!playlist.songIds.includes(songId)) {
    playlist.songIds.push(songId);
    playlist.count += 1;
  }
  res.json(playlist);
});

// Remove song from playlist
router.delete('/:id/songs/:songId', (req, res) => {
  const playlist = playlists.find(p => p.id === parseInt(req.params.id));
  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  const songId = parseInt(req.params.songId);
  const index = playlist.songIds.indexOf(songId);
  if (index > -1) {
    playlist.songIds.splice(index, 1);
    playlist.count -= 1;
  }
  res.json(playlist);
});

module.exports = router;
