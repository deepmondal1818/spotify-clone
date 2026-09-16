const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { readStore, writeStore, findSong, publicUser } = require("../store");

const router = express.Router();
router.use(requireAuth);

router.get("/me", (req, res) => {
  const store = readStore();
  const user = store.users.find((item) => item.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(publicUser(user, store));
});

router.put("/me", (req, res) => {
  const store = readStore();
  const user = store.users.find((item) => item.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (req.body.name?.trim()) { user.name = req.body.name.trim(); user.avatar = user.name.charAt(0).toUpperCase(); }
  writeStore(store);
  res.json(publicUser(user, store));
});

router.get("/me/recent", (req, res) => {
  const store = readStore();
  const user = store.users.find((item) => item.id === req.user.id);
  res.json((user?.recentSongs || []).map((id) => findSong(store, id)).filter(Boolean));
});

router.get("/me/likes", (req, res) => {
  const store = readStore();
  const user = store.users.find((item) => item.id === req.user.id);
  res.json((user?.likedSongs || []).map((id) => findSong(store, id)).filter(Boolean));
});

router.post("/me/likes/:songId", (req, res) => {
  const store = readStore();
  const user = store.users.find((item) => item.id === req.user.id);
  const song = findSong(store, req.params.songId);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!song) return res.status(404).json({ error: "Song not found" });
  const index = user.likedSongs.indexOf(song.id);
  if (index >= 0) user.likedSongs.splice(index, 1); else user.likedSongs.push(song.id);
  writeStore(store);
  res.json(user.likedSongs.map((id) => findSong(store, id)).filter(Boolean));
});

module.exports = router;
