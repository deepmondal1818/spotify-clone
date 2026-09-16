const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { songs: seedSongs } = require("./data");

const dataDirectory = path.join(__dirname, "data");
const storePath = path.join(dataDirectory, "store.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createInitialStore() {
  return {
    songs: seedSongs.map((song) => ({ ...song, id: String(song.id) })),
    users: [],
    playlists: [],
    otpChallenges: [],
    sessions: [],
  };
}

function ensureStore() {
  fs.mkdirSync(dataDirectory, { recursive: true });
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify(createInitialStore(), null, 2));
  }
}

function readStore() {
  ensureStore();
  return JSON.parse(fs.readFileSync(storePath, "utf8"));
}

function writeStore(store) {
  ensureStore();
  const temporaryPath = `${storePath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(store, null, 2));
  fs.renameSync(temporaryPath, storePath);
  return store;
}

function makeId() {
  return crypto.randomUUID();
}

function findSong(store, id) {
  return store.songs.find((song) => String(song.id) === String(id));
}

function publicUser(user, store) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    likedSongs: (user.likedSongs || []).map((id) => findSong(store, id)).filter(Boolean),
    isPremium: Boolean(user.isPremium),
  };
}

function publicPlaylist(playlist, store) {
  const songs = (playlist.songIds || []).map((id) => findSong(store, id)).filter(Boolean);
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description || "",
    cover: playlist.cover || null,
    count: songs.length,
    songIds: songs.map((song) => song.id),
    songs,
  };
}

module.exports = {
  readStore,
  writeStore,
  makeId,
  findSong,
  publicUser,
  publicPlaylist,
  storePath,
};
