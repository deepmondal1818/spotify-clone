import React from "react";
import { featuredPlaylists } from "../data/songs";
import "./MainContent.css";

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#1DB954" : "none"}
    stroke={filled ? "#1DB954" : "#b3b3b3"}
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const EllipsisIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

function formatDuration(secs) {
  const m = Math.floor(secs / 60);
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getGreeting() {
  const h = new Date().getHours();

  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";

  return "Good evening";
}

export default function MainContent({
  onPlaySong,
  currentSong,
  isPlaying,
  likedSongs,
  onToggleLike,
  songs,
}) {
  return (
    <main className="main-content">
      <div className="main-content__scroll">
        <section className="main-content__greeting">
          <h1>{getGreeting()}</h1>

          <div className="main-content__quick-picks">
            {featuredPlaylists.slice(0, 6).map((pl) => (
              <div
                key={pl.id}
                className="quick-pick"
                style={{ "--accent": pl.color }}
              >
                <img src={pl.cover} alt={pl.name} />
                <span>{pl.name}</span>

                <button
                  className="quick-pick__play"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySong(0);
                  }}
                >
                  <PlayIcon />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="main-content__section">
          <div className="main-content__section-header">
            <h2>Featured Charts</h2>
            <button className="main-content__show-all">
              Show all
            </button>
          </div>

          <div className="main-content__cards">
            {featuredPlaylists.map((pl) => (
              <div key={pl.id} className="card">
                <div className="card__image-wrap">
                  <img
                    src={pl.cover}
                    alt={pl.name}
                    className="card__image"
                  />

                  <button
                    className="card__play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySong(0);
                    }}
                  >
                    <PlayIcon />
                  </button>
                </div>

                <div className="card__title">{pl.name}</div>
                <div className="card__desc">{pl.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="main-content__section">
          <div className="main-content__section-header">
            <h2>Trending Now</h2>
            <button className="main-content__show-all">
              Show all
            </button>
          </div>

          <div className="main-content__tracklist">
            <div className="tracklist-header">
              <span className="tracklist-header__num">#</span>
              <span>Title</span>
              <span className="tracklist-header__album">Album</span>
              <span className="tracklist-header__duration">
                Duration
              </span>
            </div>

            {songs.map((song, index) => {
              const isActive = currentSong?.id === song.id;

              return (
                <div
                  key={song.id}
                  className={`track-row ${
                    isActive ? "track-row--active" : ""
                  }`}
                >
                  <div className="track-row__num">
                    <span className="track-row__index">
                      {isActive && isPlaying ? "▶" : index + 1}
                    </span>

                    <button
                      className="track-row__play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaySong(index);
                      }}
                    >
                      {isActive && isPlaying ? "⏸" : "▶"}
                    </button>
                  </div>

                  <div className="track-row__info">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="track-row__cover"
                    />

                    <div>
                      <div
                        className={`track-row__title ${
                          isActive
                            ? "track-row__title--active"
                            : ""
                        }`}
                      >
                        {song.title}
                      </div>

                      <div className="track-row__artist">
                        {song.artist}
                      </div>
                    </div>
                  </div>

                  <div className="track-row__album">
                    {song.album}
                  </div>

                  <div className="track-row__actions">
                    <button
                      className="track-row__like"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(song.id);
                      }}
                    >
                      <HeartIcon
                        filled={likedSongs.has(song.id)}
                      />
                    </button>

                    <span className="track-row__duration">
                      {formatDuration(song.duration)}
                    </span>

                    <button className="track-row__more">
                      <EllipsisIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}