import { useState, useRef, useEffect, useCallback } from "react";

export function usePlayer(songs = []) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [likedSongs, setLikedSongs] = useState(new Set([1, 4]));

  const audioRef = useRef(new Audio());
  const repeatModeRef = useRef(repeatMode);

  const currentSong =
    songs.length > 0 ? songs[currentSongIndex] : null;

  useEffect(() => {
    repeatModeRef.current = repeatMode;
  }, [repeatMode]);

  // Load song
  useEffect(() => {
    const audio = audioRef.current;

    if (!currentSong?.audioSrc) return;

    audio.pause();
    audio.src = currentSong.audioSrc;
    audio.load();

    setCurrentTime(0);
    setProgress(0);
  }, [currentSong]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Play error:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Volume
  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  // Events
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);

      const dur =
        isFinite(audio.duration) && audio.duration > 0
          ? audio.duration
          : currentSong?.duration || 0;

      setDuration(dur);

      setProgress(
        dur > 0 ? (audio.currentTime / dur) * 100 : 0
      );
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (repeatModeRef.current === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (songs.length === 0) return;

    if (isShuffle) {
      let next;

      do {
        next = Math.floor(Math.random() * songs.length);
      } while (
        next === currentSongIndex &&
        songs.length > 1
      );

      setCurrentSongIndex(next);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
  }, [songs.length, isShuffle, currentSongIndex]);

  const handlePrev = useCallback(() => {
    const audio = audioRef.current;

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      setCurrentSongIndex(
        (prev) => (prev - 1 + songs.length) % songs.length
      );
    }
  }, [songs.length]);

  const handleSeek = useCallback((pct) => {
    const audio = audioRef.current;

    if (audio.duration) {
      audio.currentTime = (pct / 100) * audio.duration;
    }
  }, []);

  const handleVolumeChange = useCallback((val) => {
    setVolume(val);
    setIsMuted(val === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const cycleRepeat = useCallback(() => {
    setRepeatMode((prev) =>
      prev === "none"
        ? "all"
        : prev === "all"
        ? "one"
        : "none"
    );
  }, []);

  const toggleLike = useCallback((id) => {
    setLikedSongs((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  }, []);

  const playSong = useCallback(
    (index) => {
      if (index < 0 || index >= songs.length) return;

      if (index === currentSongIndex) {
        setIsPlaying((prev) => !prev);
      } else {
        setCurrentSongIndex(index);
        setIsPlaying(true);
      }
    },
    [songs.length, currentSongIndex]
  );

  const formatTime = useCallback((secs = 0) => {
    if (!isFinite(secs)) return "0:00";

    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");

    return `${m}:${s}`;
  }, []);

  return {
    currentSong,
    currentSongIndex,
    isPlaying,
    progress,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    currentTime,
    duration,
    likedSongs,
    togglePlay,
    handleNext,
    handlePrev,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleLike,
    playSong,
    formatTime,
    audioRef,
  };
}