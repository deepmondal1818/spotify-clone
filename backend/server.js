const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { readStore } = require("./store");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= Middleware =================
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

// ================= Routes =================
const songsRouter = require("./routes/songs");
const playlistsRouter = require("./routes/playlists");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/api/songs", songsRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

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
    error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
  });
});

// ================= Start Server =================
readStore();
app.listen(PORT, () => {
  console.log(`Music platform API running on http://localhost:${PORT}`);
});