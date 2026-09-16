const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { requireAuth } = require("../middleware/auth");
const { readStore, writeStore, makeId, publicUser } = require("../store");

const router = express.Router();

function issueToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function createOtp(store, userId, purpose) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  store.otpChallenges = store.otpChallenges.filter((challenge) => !(challenge.userId === userId && challenge.purpose === purpose));
  store.otpChallenges.push({ userId, purpose, codeHash: crypto.createHash("sha256").update(code).digest("hex"), expiresAt: Date.now() + 10 * 60 * 1000 });
  return code;
}

function demoResponse(payload, code) {
  return process.env.NODE_ENV === "production" ? payload : { ...payload, demoOtp: code };
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 6) return res.status(400).json({ error: "Name, email, and a password of at least 6 characters are required" });
    const store = readStore();
    const normalizedEmail = email.trim().toLowerCase();
    if (store.users.some((user) => user.email === normalizedEmail)) return res.status(409).json({ error: "An account with that email already exists" });
    const user = { id: makeId(), name: name.trim(), email: normalizedEmail, password: await bcrypt.hash(password, 12), avatar: name.trim().charAt(0).toUpperCase(), likedSongs: [], recentSongs: [], isPremium: false, otpVerified: false };
    store.users.push(user);
    const code = createOtp(store, user.id, "register");
    writeStore(store);
    res.status(201).json(demoResponse({ otpRequired: true, userId: user.id, message: "Verify the OTP to finish registration" }, code));
  } catch (error) { next(error); }
});

router.post("/verify-otp", (req, res, next) => {
  try {
    const { userId, otp, purpose = "register" } = req.body;
    const store = readStore();
    const challenge = store.otpChallenges.find((item) => item.userId === userId && item.purpose === purpose);
    const hash = crypto.createHash("sha256").update(String(otp || "")).digest("hex");
    if (!challenge || challenge.expiresAt < Date.now() || hash !== challenge.codeHash) return res.status(400).json({ error: "Invalid or expired OTP" });
    const user = store.users.find((item) => item.id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.otpVerified = true;
    store.otpChallenges = store.otpChallenges.filter((item) => item !== challenge);
    writeStore(store);
    res.json({ token: issueToken(user), user: publicUser(user, store) });
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const store = readStore();
    const user = store.users.find((item) => item.email === String(req.body.email || "").trim().toLowerCase());
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password))) return res.status(401).json({ error: "Invalid email or password" });
    if (!user.otpVerified) {
      const code = createOtp(store, user.id, "login");
      writeStore(store);
      return res.json(demoResponse({ otpRequired: true, userId: user.id, message: "Verify the OTP to continue" }, code));
    }
    res.json({ token: issueToken(user), user: publicUser(user, store) });
  } catch (error) { next(error); }
});

router.post("/logout", requireAuth, (req, res) => res.json({ message: "Logged out" }));

router.get("/me", requireAuth, (req, res, next) => {
  try {
    const store = readStore();
    const user = store.users.find((item) => item.id === req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: publicUser(user, store) });
  } catch (error) { next(error); }
});

module.exports = router;
