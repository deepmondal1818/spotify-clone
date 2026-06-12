import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";
import Player from "./components/Player";
import { usePlayer } from "./hooks/usePlayer";
import { songs } from "./data/songs";
import "./App.css";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const player = usePlayer(songs);

  return (
    <div className="app">
      <div className="app__layout">
        <Sidebar
          currentSong={player.currentSong}
          activeView={activeView}
          onViewChange={setActiveView}
        />
        <div className="app__main">
          <TopBar />
          <MainContent
            onPlaySong={player.playSong}
            currentSong={player.currentSong}
            isPlaying={player.isPlaying}
            likedSongs={player.likedSongs}
            onToggleLike={player.toggleLike}
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
        likedSongs={player.likedSongs}
        togglePlay={player.togglePlay}
        handleNext={player.handleNext}
        handlePrev={player.handlePrev}
        handleSeek={player.handleSeek}
        handleVolumeChange={player.handleVolumeChange}
        toggleMute={player.toggleMute}
        toggleShuffle={player.toggleShuffle}
        cycleRepeat={player.cycleRepeat}
        toggleLike={player.toggleLike}
        formatTime={player.formatTime}
      />
    </div>
  );
}
