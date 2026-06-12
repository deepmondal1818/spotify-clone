import React, { useState } from "react";
import "./Player.css";

const icons = {
  play: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>,
  pause: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  next: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,4 15,12 5,20"/><rect x="16" y="4" width="2" height="16"/></svg>,
  prev: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="19,4 9,12 19,20" transform="scale(-1,1) translate(-24,0)"/><rect x="6" y="4" width="2" height="16"/></svg>,
  shuffle: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l3 3-3 3M18 20l3-3-3-3M2 7h13a3 3 0 0 1 3 3v1M2 17h13a3 3 0 0 0 3-3v-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>,
  repeat: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  repeatOne: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/><text x="11" y="13" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">1</text></svg>,
  heart: (filled) => <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#1DB954" : "none"} stroke={filled ? "#1DB954" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  volHigh: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11 5L6 9H2v6h4l5 4zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>,
  volLow: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>,
  volMute: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4z" fill="currentColor"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>,
  queue: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h14M3 10h14M3 15h10M17 15l4 4-4 4"/></svg>,
};

export default function Player({
  currentSong, isPlaying, progress, volume, isMuted, isShuffle, repeatMode,
  currentTime, duration, likedSongs,
  togglePlay, handleNext, handlePrev, handleSeek, handleVolumeChange,
  toggleMute, toggleShuffle, cycleRepeat, toggleLike, formatTime,
}) {
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    handleSeek(Math.max(0, Math.min(100, pct)));
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    handleVolumeChange(Math.round(Math.max(0, Math.min(100, pct))));
  };

  const volIcon = isMuted || volume === 0 ? icons.volMute : volume < 50 ? icons.volLow : icons.volHigh;
  const isLiked = currentSong && likedSongs.has(currentSong.id);

  return (
    <footer className="player">
      {/* Left: Song Info */}
      <div className="player__song">
        {currentSong ? (
          <>
            <img src={currentSong.cover} alt={currentSong.title} className="player__cover" />
            <div className="player__meta">
              <div className="player__title">{currentSong.title}</div>
              <div className="player__artist">{currentSong.artist}</div>
            </div>
            <button
              className="player__like"
              onClick={() => toggleLike(currentSong.id)}
            >
              {icons.heart(isLiked)}
            </button>
          </>
        ) : (
          <div className="player__empty">No song selected</div>
        )}
      </div>

      {/* Center: Controls */}
      <div className="player__controls">
        <div className="player__buttons">
          <button
            className={`player__btn player__btn--sm ${isShuffle ? "player__btn--active" : ""}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            {icons.shuffle}
            {isShuffle && <span className="player__btn-dot"/>}
          </button>
          <button className="player__btn player__btn--sm" onClick={handlePrev} title="Previous">
            {icons.prev}
          </button>
          <button className="player__btn player__btn--play" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? icons.pause : icons.play}
          </button>
          <button className="player__btn player__btn--sm" onClick={handleNext} title="Next">
            {icons.next}
          </button>
          <button
            className={`player__btn player__btn--sm ${repeatMode !== "none" ? "player__btn--active" : ""}`}
            onClick={cycleRepeat}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === "one" ? icons.repeatOne : icons.repeat}
            {repeatMode !== "none" && <span className="player__btn-dot"/>}
          </button>
        </div>

        <div className="player__progress">
          <span className="player__time">{formatTime(currentTime)}</span>
          <div
            className="player__bar-wrap"
            onClick={handleProgressClick}
          >
            <div className="player__bar-bg">
              <div
                className="player__bar-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="player__bar-thumb"/>
              </div>
            </div>
          </div>
          <span className="player__time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Extra */}
      <div className="player__extras">
        <button className="player__btn player__btn--sm" title="Queue">
          {icons.queue}
        </button>
        <button className="player__btn player__btn--sm" onClick={toggleMute} title="Mute">
          {volIcon}
        </button>
        <div
          className="player__bar-wrap player__volume-wrap"
          onClick={handleVolumeClick}
        >
          <div className="player__bar-bg">
            <div
              className="player__bar-fill"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            >
              <div className="player__bar-thumb"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
