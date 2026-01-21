import { useState, useCallback, useEffect, useRef } from 'react';
import {
  TONEARM_REST_ANGLE,
  timeToAngle,
  angleToTime,
  isInPlayZone,
  calculateAngleFromMouse
} from '../utils/mathHelpers';

export default function useTonearmControl({
  isPlaying,
  currentTime,
  duration,
  play,
  pause,
  seek
}) {
  const [angle, setAngle] = useState(TONEARM_REST_ANGLE);
  const [isDragging, setIsDragging] = useState(false);
  const pivotPosition = useRef({ x: 0, y: 0 });

  // Sync tonearm angle with audio playback when not dragging
  useEffect(() => {
    if (!isDragging && isPlaying && duration > 0) {
      const newAngle = timeToAngle(currentTime, duration);
      setAngle(newAngle);
    }
  }, [currentTime, duration, isPlaying, isDragging]);

  // Handle drag start
  const handleDragStart = useCallback(({ pivotX, pivotY }) => {
    setIsDragging(true);
    pivotPosition.current = { x: pivotX, y: pivotY };
  }, []);

  // Handle drag move
  const handleDragMove = useCallback(({ clientX, clientY }) => {
    if (!isDragging) return;

    const newAngle = calculateAngleFromMouse(
      clientX,
      clientY,
      pivotPosition.current.x,
      pivotPosition.current.y
    );

    setAngle(newAngle);
  }, [isDragging]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    // Check if tonearm is in play zone
    if (isInPlayZone(angle)) {
      // Seek to the position and play
      const newTime = angleToTime(angle, duration);
      seek(newTime);
      play();
    } else {
      // Outside play zone - pause
      pause();
      setAngle(TONEARM_REST_ANGLE);
    }
  }, [angle, duration, seek, play, pause]);

  // Reset tonearm to rest position when audio ends
  useEffect(() => {
    if (!isPlaying && currentTime === 0 && !isDragging) {
      setAngle(TONEARM_REST_ANGLE);
    }
  }, [isPlaying, currentTime, isDragging]);

  return {
    angle,
    isDragging,
    handleDragStart,
    handleDragMove,
    handleDragEnd
  };
}
