import React from "react";
import "./TopBar.css";

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0z"/>
  </svg>
);

const ForwardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.043 2.793a1 1 0 0 0 0 1.414L15.836 12l-7.793 7.793a1 1 0 1 0 1.414 1.414L18.664 12 9.457 2.793a1 1 0 0 0-1.414 0z"/>
  </svg>
);

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__nav">
        <button className="topbar__nav-btn" title="Back">
          <BackIcon />
        </button>
        <button className="topbar__nav-btn" title="Forward">
          <ForwardIcon />
        </button>
      </div>

      <div className="topbar__right">
        <button className="topbar__btn topbar__explore">Explore Premium</button>
        <button className="topbar__btn topbar__install">Install App</button>
        <div className="topbar__avatar">
          <span>U</span>
        </div>
      </div>
    </header>
  );
}
