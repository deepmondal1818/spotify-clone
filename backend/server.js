const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Routes =================
const songsRouter = require("./routes/songs");
const playlistsRouter = require("./routes/playlists");
const usersRouter = require("./routes/users");

app.use("/api/songs", songsRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/users", usersRouter);

// ================= Health Check =================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running!",
  });
});

// ================= Root Route =================
app.get("/", (req, res) => {
  res.send("🎵 Spotify Clone Backend is running");
});

// ================= 404 Handler =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// ================= Global Error Handler =================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
});

// ================= Start Server =================
app.listen(PORT, () => {
  console.log(
    `🎵 Spotify Clone Backend running on http://localhost:${PORT}`
  );
});