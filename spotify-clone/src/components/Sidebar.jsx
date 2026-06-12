import React, { useState } from "react";
import { playlists } from "../data/songs";
import "./Sidebar.css";

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.533 1.279c-5.18 0-9.407 4.927-9.407 9.808 0 4.963 4.227 9.804 9.407 9.804 2.234 0 4.29-.863 5.882-2.369l4.574 4.987a1 1 0 1 0 1.47-1.352l-4.576-4.99c1.192-1.587 1.907-3.629 1.907-6.08C19.79 6.206 15.693 1.28 10.533 1.28zm-7.407 9.808c0-3.926 3.3-7.808 7.407-7.808s7.257 3.882 7.257 7.808-3.15 7.804-7.257 7.804-7.407-3.878-7.407-7.804z"/>
  </svg>
);
const LibraryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1z"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75V14.5a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"/>
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default function Sidebar({ currentSong, onPlaylistSelect, activeView, onViewChange }) {
  const [activePlaylist, setActivePlaylist] = useState(null);

  const handlePlaylistClick = (pl) => {
    setActivePlaylist(pl.id);
    onPlaylistSelect?.(pl);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span>Spotify</span>
        </div>

        <nav className="sidebar__nav">
          <button
            className={`sidebar__nav-btn ${activeView === "home" ? "active" : ""}`}
            onClick={() => onViewChange("home")}
          >
            <HomeIcon /> Home
          </button>
          <button
            className={`sidebar__nav-btn ${activeView === "search" ? "active" : ""}`}
            onClick={() => onViewChange("search")}
          >
            <SearchIcon /> Search
          </button>
        </nav>
      </div>

      <div className="sidebar__library">
        <div className="sidebar__library-header">
          <button className="sidebar__nav-btn">
            <LibraryIcon /> Your Library
          </button>
          <button className="sidebar__create-btn" title="Create playlist">
            <PlusIcon />
          </button>
        </div>

        <div className="sidebar__playlists">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              className={`sidebar__playlist-item ${activePlaylist === pl.id ? "active" : ""}`}
              onClick={() => handlePlaylistClick(pl)}
            >
              <div className="sidebar__playlist-thumb">
                {pl.isLiked ? (
                  <div className="sidebar__liked-thumb">
                    <HeartIcon filled />
                  </div>
                ) : (
                  <img src={pl.cover} alt={pl.name} />
                )}
              </div>
              <div className="sidebar__playlist-info">
                <span className="sidebar__playlist-name">{pl.name}</span>
                <span className="sidebar__playlist-meta">Playlist · {pl.count} songs</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
