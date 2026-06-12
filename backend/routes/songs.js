const express = require('express');
const router = express.Router();
const { songs } = require('../data');

// Get all songs
router.get('/', (req, res) => {
  res.json(songs);
});

// Get song by ID
router.get('/:id', (req, res) => {
  const song = songs.find(s => s.id === parseInt(req.params.id));
  if (!song) {
    return res.status(404).json({ error: 'Song not found' });
  }
  res.json(song);
});

// Search songs
router.get('/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const results = songs.filter(s =>
    s.title.toLowerCase().includes(query) ||
    s.artist.toLowerCase().includes(query) ||
    s.album.toLowerCase().includes(query)
  );
  res.json(results);
});

module.exports = router;
