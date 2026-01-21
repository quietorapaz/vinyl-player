import { useState } from 'react';
import WoodCabinet from '../UI/WoodCabinet';
import VinylRecord from './VinylRecord';
import Tonearm from './Tonearm';
import FileUploader from '../Controls/FileUploader';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import useTonearmControl from '../../hooks/useTonearmControl';
import './VinylPlayer.css';

export default function VinylPlayer() {
  const [songName, setSongName] = useState('');

  const {
    isPlaying,
    currentTime,
    duration,
    loadAudio,
    play,
    pause,
    seek
  } = useAudioPlayer();

  const {
    angle,
    isDragging,
    handleDragStart,
    handleDragMove,
    handleDragEnd
  } = useTonearmControl({
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seek
  });

  const handleFileSelect = (url, name) => {
    loadAudio(url);
    const cleanName = name.replace(/\.[^/.]+$/, '');
    setSongName(cleanName);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="vinyl-player">
      <WoodCabinet>
        <VinylRecord isPlaying={isPlaying} songName={songName} />
        <Tonearm
          angle={angle}
          isDragging={isDragging}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      </WoodCabinet>

      <div className="controls">
        <FileUploader onFileSelect={handleFileSelect} currentSong={songName} />
        {duration > 0 && (
          <span className="time">{formatTime(currentTime)} / {formatTime(duration)}</span>
        )}
      </div>

      <p className="hint">Drag the tonearm over the record to play</p>
    </div>
  );
}
