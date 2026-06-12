const songs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    color: "#e91429",
    cover: "https://picsum.photos/seed/blinding/300/300",
    audioSrc: "/audio/blinding-lights.mp3",
  },

  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: 167,
    color: "#f59b23",
    cover: "https://picsum.photos/seed/asitwas/300/300",
    audioSrc: "/audio/as-it-was.mp3",
  },

  {
    id: 3,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3",
    duration: 141,
    color: "#509bf5",
    cover: "https://picsum.photos/seed/staysong/300/300",
    audioSrc: "/audio/stay.mp3",
  },

  {
    id: 4,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    color: "#8d67ab",
    cover: "https://picsum.photos/seed/levitating/300/300",
    audioSrc: "/audio/levitating.mp3",
  },

  {
    id: 5,
    title: "Peaches",
    artist: "Justin Bieber ft. Daniel Caesar",
    album: "Justice",
    duration: 198,
    color: "#e8632a",
    cover: "https://picsum.photos/seed/peaches/300/300",
    audioSrc: "/audio/peaches.mp3",
  },

  {
    id: 6,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: 178,
    color: "#ba5d07",
    cover: "https://picsum.photos/seed/good4u/300/300",
    audioSrc: "/audio/good-4-u.mp3",
  },

  {
    id: 7,
    title: "Montero",
    artist: "Lil Nas X",
    album: "MONTERO",
    duration: 137,
    color: "#0d73ec",
    cover: "https://picsum.photos/seed/montero/300/300",
    audioSrc: "/audio/montero.mp3",
  },

  {
    id: 8,
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    duration: 238,
    color: "#477d95",
    cover: "https://picsum.photos/seed/heatwaves/300/300",
    audioSrc: "/audio/heat-waves.mp3",
  },
];

const playlists = [
  {
    id: 1,
    name: "Liked Songs",
    count: 248,
    cover: null,
    isLiked: true,
    songIds: [1, 4],
  },

  {
    id: 2,
    name: "Chill Vibes",
    count: 45,
    cover: "https://picsum.photos/seed/chill/60/60",
    songIds: [3, 8],
  },

  {
    id: 3,
    name: "Workout Mix",
    count: 32,
    cover: "https://picsum.photos/seed/workout/60/60",
    songIds: [2, 5, 7],
  },

  {
    id: 4,
    name: "Late Night Drive",
    count: 18,
    cover: "https://picsum.photos/seed/latenight/60/60",
    songIds: [1, 6],
  },

  {
    id: 5,
    name: "Throwbacks",
    count: 67,
    cover: "https://picsum.photos/seed/throwbacks/60/60",
    songIds: [4, 8],
  },

  {
    id: 6,
    name: "Focus Mode",
    count: 29,
    cover: "https://picsum.photos/seed/focus/60/60",
    songIds: [2, 3, 5],
  },
];

const users = [
  {
    id: 1,
    name: "User",
    email: "user@example.com",
    avatar: "U",
    likedSongs: [1, 4],
    playlists: [1, 2, 3],
  },
];

module.exports = {
  songs,
  playlists,
  users,
};