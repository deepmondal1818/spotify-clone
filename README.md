# 🎵 Spotify Clone

A full-stack Spotify-inspired music streaming application built with **React.js**, **Node.js**, and **Express.js**. The project features a responsive user interface, custom audio controls, and REST APIs for managing songs, playlists, and users.

---

## 🚀 Features

- 🎧 Music playback with custom controls
- ⏯️ Play, Pause, Next, and Previous track functionality
- 📱 Responsive and modern Spotify-inspired UI
- 🎵 Audio streaming support
- 📂 Song management APIs
- 📑 Playlist management APIs
- 👤 User management APIs
- ⚡ Component-based React architecture
- 🔄 Custom hooks for state management

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Tools
- Git & GitHub
- REST APIs

---

## 📁 Project Structure

```

SPOTIFY-CLONE
│
├── backend/
│ ├── routes/
│ │ ├── songs.js
│ │ ├── playlists.js
│ │ └── users.js
│ ├── data.js
│ ├── server.js
│ ├── .env
│ ├── package.json
│ └── README.md
│
├── spotify-clone/
│ ├── public/
│ │ ├── audio/
│ │ └── index.html
│ │
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── data/
│ │ │ └── songs.js
│ │ ├── assets/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── index.js
│ │
│ ├── download-music.js
│ ├── package.json
│ └── README.md
│
└── package-lock.json

```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/deepmondal1818/spotify-clone.git
```

---

### 2. Configure the local backend and start it

Copy `backend/.env.example` to `backend/.env` and set a long JWT secret. User accounts, likes, playlists, and recent plays are stored in `backend/data/store.json` for this local demo. No MongoDB or external database is required.

```bash
cd backend
npm install
npm start
```

Server runs on:

```
http://localhost:5000
```

---

### 3. Start Frontend

Open another terminal:

```bash
cd spotify-clone
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000

Copy `spotify-clone/.env.example` to `spotify-clone/.env` if the API is not running at the default URL. On first startup, the backend creates the local JSON store from the existing song catalog. Register an account in the app; playlists, likes, recent plays, and profile data are then stored per user.

### Authenticated API

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/songs`, `GET /api/songs/search/:query`, `POST /api/songs/:id/play`
- `GET/POST /api/playlists`, `PUT/DELETE /api/playlists/:id`
- `POST/DELETE /api/playlists/:id/songs/:songId`
- `GET/PUT /api/users/me`, `GET /api/users/me/likes`, `POST /api/users/me/likes/:songId`
```

---

## 📡 API Endpoints

### Songs

```http
GET /songs
```

### Playlists

```http
GET /playlists
```

### Users

```http
GET /users
```

---

## 🎯 Learning Outcomes

- Built a full-stack music streaming application.
- Developed reusable React components.
- Created REST APIs using Express.js.
- Implemented responsive UI and custom audio controls.
- Practiced component-based architecture and state management.
- Improved understanding of frontend-backend integration.

---

## 🔮 Future Enhancements

- User Authentication (JWT)
- Local JSON data store for the demo
- Search Functionality
- Favorites and Recently Played Songs
- Playlist Creation and Editing
- Dark/Light Theme Support
- Real-Time Streaming Features

---

## 👨‍💻 Author

### Deep Mondal

- **GitHub:** https://github.com/deepmondal1818
- **LinkedIn:** www.linkedin.com/in/deep-mondal-82085b342

---

⭐ If you found this project useful, please consider giving it a star!

