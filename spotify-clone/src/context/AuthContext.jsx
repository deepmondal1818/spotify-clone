import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("music_token")) return setLoading(false);
    apiRequest("/auth/me").then((data) => setUser(data.user)).catch(() => localStorage.removeItem("music_token")).finally(() => setLoading(false));
  }, []);

  const authenticate = async (path, values) => {
    const data = await apiRequest(path, { method: "POST", body: JSON.stringify(values) });
    if (data.otpRequired) return data;
    localStorage.setItem("music_token", data.token);
    setUser(data.user);
    return data;
  };

  const verifyOtp = async (values) => {
    const data = await apiRequest("/auth/verify-otp", { method: "POST", body: JSON.stringify(values) });
    localStorage.setItem("music_token", data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => { localStorage.removeItem("music_token"); setUser(null); setGuest(false); };
  return <AuthContext.Provider value={{ user, guest, loading, continueAsGuest: () => setGuest(true), login: (values) => authenticate("/auth/login", values), register: (values) => authenticate("/auth/register", values), verifyOtp, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
