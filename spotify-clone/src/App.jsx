import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";
import Player from "./components/Player";
import { usePlayer } from "./hooks/usePlayer";
import { songs } from "./data/songs";
import { apiRequest } from "./api";
import { useAuth } from "./context/AuthContext";
import AuthScreen from "./components/AuthScreen";
import "./App.css";

export default function App() {
  const { user, guest, loading, logout } = useAuth();
  const [activeView, setActiveView] = useState("home");
  const [catalog, setCatalog] = useState([]);
  const [likedIds, setLikedIds] = useState(new Set());
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([apiRequest("/songs"), apiRequest("/users/me/likes"), apiRequest("/playlists")])
      .then(([songData, likedData, playlistData]) => {
        setCatalog(songData);
        setLikedIds(new Set(likedData.map((song) => song._id || song.id)));
        setPlaylists(playlistData);
      })
      .catch(console.error);
  }, [user]);

  const player = usePlayer(catalog.length ? catalog : songs);

  if (loading) return <div className="auth-loading">Loading your library...</div>;
  if (!user && !guest) return <AuthScreen />;

  const handleToggleLike = async (id) => {
    if (!user) return;
    const updated = await apiRequest(`/users/me/likes/${id}`, { method: "POST" });
    setLikedIds(new Set(updated.map((song) => song._id || song.id)));
  };

  const handlePlaySong = (index) => {
    const visibleSongs = searchResults || (catalog.length ? catalog : songs);
    const song = visibleSongs[index];
    const playerIndex = catalog.length ? catalog.findIndex((item) => item.id === song?.id) : index;
    player.playSong(playerIndex < 0 ? index : playerIndex);
    if (user && song?.id) apiRequest(`/songs/${song.id}/play`, { method: "POST" }).catch(console.error);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return setSearchResults(null);
    try { setSearchResults(await apiRequest(`/songs/search/${encodeURIComponent(query.trim())}`)); }
    catch (error) { console.error(error); }
  };

  return (
    <div className="app">
      <div className="app__layout">
        <Sidebar
          currentSong={player.currentSong}
          playlists={playlists}
          activeView={activeView}
          onViewChange={setActiveView}
        />
        <div className="app__main">
          <TopBar user={user} onSearch={handleSearch} />
          <MainContent
            onPlaySong={handlePlaySong}
            songs={searchResults || (catalog.length ? catalog : songs)}
            currentSong={player.currentSong}
            isPlaying={player.isPlaying}
            likedSongs={likedIds}
            onToggleLike={handleToggleLike}
          />
        </div>
      </div>
      <Player
        currentSong={player.currentSong}
        isPlaying={player.isPlaying}
        progress={player.progress}
        volume={player.volume}
        isMuted={player.isMuted}
        isShuffle={player.isShuffle}
        repeatMode={player.repeatMode}
        currentTime={player.currentTime}
        duration={player.duration}
        likedSongs={likedIds}
        togglePlay={player.togglePlay}
        handleNext={player.handleNext}
        handlePrev={player.handlePrev}
        handleSeek={player.handleSeek}
        handleVolumeChange={player.handleVolumeChange}
        toggleMute={player.toggleMute}
        toggleShuffle={player.toggleShuffle}
        cycleRepeat={player.cycleRepeat}
        toggleLike={handleToggleLike}
        formatTime={player.formatTime}
      />
      <button className="app__logout" onClick={logout}>Sign out</button>
    </div>
  );
}
