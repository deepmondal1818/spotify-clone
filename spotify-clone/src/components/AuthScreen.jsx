import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthScreen.css";

export default function AuthScreen() {
  const { login, register, verifyOtp, continueAsGuest } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [otpState, setOtpState] = useState(null);

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      const result = await (mode === "login" ? login({ email: form.email, password: form.password }) : register(form));
      if (result?.otpRequired) setOtpState({ userId: result.userId, purpose: mode === "login" ? "login" : "register", demoOtp: result.demoOtp });
    }
    catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  }

  async function submitOtp(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { await verifyOtp({ userId: otpState.userId, purpose: otpState.purpose, otp: form.otp }); }
    catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  }

  return <main className="auth-screen"><div className="auth-panel"><div className="auth-mark">◒</div><p className="auth-kicker">A quieter way to listen</p><h1>{otpState ? "Verify your code" : mode === "login" ? "Welcome back" : "Make your listening space"}</h1>{otpState ? <form onSubmit={submitOtp}><input placeholder="6-digit OTP" inputMode="numeric" value={form.otp || ""} onChange={(e) => setForm({ ...form, otp: e.target.value })} required />{otpState.demoOtp && <p className="auth-hint">Demo OTP: {otpState.demoOtp}</p>}{error && <p className="auth-error">{error}</p>}<button disabled={busy}>{busy ? "Verifying..." : "Verify OTP"}</button></form> : <form onSubmit={submit}>{mode === "register" && <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />}<input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /><input type="password" placeholder="Password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />{error && <p className="auth-error">{error}</p>}<button disabled={busy}>{busy ? "Opening..." : mode === "login" ? "Sign in" : "Create account"}</button></form>}<button className="auth-switch" onClick={() => { setOtpState(null); setMode(mode === "login" ? "register" : "login"); }}>{mode === "login" ? "Create a new account" : "I already have an account"}</button><button className="auth-switch" onClick={continueAsGuest}>Continue as guest</button></div></main>;
}
