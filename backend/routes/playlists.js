const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { readStore, writeStore, makeId, findSong, publicPlaylist } = require("../store");

const router = express.Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  const store = readStore();
  res.json(store.playlists.filter((playlist) => playlist.owner === req.user.id).map((playlist) => publicPlaylist(playlist, store)));
});

router.post("/", (req, res) => {
  if (!req.body.name?.trim()) return res.status(400).json({ error: "Playlist name is required" });
  const store = readStore();
  const playlist = { id: makeId(), owner: req.user.id, name: req.body.name.trim(), description: req.body.description || "", cover: req.body.cover || null, songIds: [] };
  store.playlists.push(playlist); writeStore(store);
  res.status(201).json(publicPlaylist(playlist, store));
});

router.get("/:id", (req, res) => {
  const store = readStore();
  const playlist = store.playlists.find((item) => item.id === req.params.id && item.owner === req.user.id);
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });
  res.json(publicPlaylist(playlist, store));
});

router.put("/:id", (req, res) => {
  const store = readStore();
  const playlist = store.playlists.find((item) => item.id === req.params.id && item.owner === req.user.id);
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });
  if (req.body.name?.trim()) playlist.name = req.body.name.trim();
  if (typeof req.body.description === "string") playlist.description = req.body.description;
  writeStore(store); res.json(publicPlaylist(playlist, store));
});

router.delete("/:id", (req, res) => {
  const store = readStore();
  const index = store.playlists.findIndex((item) => item.id === req.params.id && item.owner === req.user.id);
  if (index < 0) return res.status(404).json({ error: "Playlist not found" });
  store.playlists.splice(index, 1); writeStore(store); res.status(204).send();
});

router.post("/:id/songs/:songId", (req, res) => updateSong(req, res, false));
router.delete("/:id/songs/:songId", (req, res) => updateSong(req, res, true));

function updateSong(req, res, remove) {
  const store = readStore();
  const playlist = store.playlists.find((item) => item.id === req.params.id && item.owner === req.user.id);
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });
  if (!findSong(store, req.params.songId)) return res.status(404).json({ error: "Song not found" });
  if (remove) playlist.songIds = playlist.songIds.filter((id) => id !== String(req.params.songId));
  else if (!playlist.songIds.includes(String(req.params.songId))) playlist.songIds.push(String(req.params.songId));
  writeStore(store); res.json(publicPlaylist(playlist, store));
}

module.exports = router;
