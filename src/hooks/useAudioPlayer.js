import { useState, useRef, useEffect, useCallback } from 'react';

export default function useAudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Load audio source
  const loadAudio = useCallback((src) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
      setAudioSrc(src);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, []);

  // Play
  const play = useCallback(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Play failed:', err));
    }
  }, [audioSrc]);

  // Pause
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Seek to specific time
  const seek = useCallback((time) => {
    if (audioRef.current && duration > 0) {
      const clampedTime = Math.max(0, Math.min(time, duration));
      audioRef.current.currentTime = clampedTime;
      setCurrentTime(clampedTime);
    }
  }, [duration]);

  // Get progress as percentage (0-1)
  const progress = duration > 0 ? currentTime / duration : 0;

  return {
    isPlaying,
    currentTime,
    duration,
    progress,
    audioSrc,
    loadAudio,
    play,
    pause,
    seek
  };
}
