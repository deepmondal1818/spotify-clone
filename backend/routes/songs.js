const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { readStore, writeStore, findSong } = require("../store");

const router = express.Router();
router.get("/", (req, res) => res.json(readStore().songs));
router.get("/search/:query", (req, res) => {
  const query = req.params.query.toLowerCase();
  res.json(readStore().songs.filter((song) => [song.title, song.artist, song.album].some((value) => value.toLowerCase().includes(query))));
});
router.get("/:id", (req, res) => {
  const song = findSong(readStore(), req.params.id);
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json(song);
});
router.post("/:id/play", requireAuth, (req, res) => {
  const store = readStore();
  const song = findSong(store, req.params.id);
  const user = store.users.find((item) => item.id === req.user.id);
  if (!song) return res.status(404).json({ error: "Song not found" });
  if (!user) return res.status(404).json({ error: "User not found" });
  user.recentSongs = [song.id, ...(user.recentSongs || []).filter((id) => id !== song.id)].slice(0, 20);
  writeStore(store);
  res.status(204).send();
});
module.exports = router;
