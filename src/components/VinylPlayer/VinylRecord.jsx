import './VinylRecord.css';

export default function VinylRecord({ isPlaying, songName }) {
  return (
    <div className={`vinyl-record ${isPlaying ? 'spinning' : ''}`}>
      <div className="grooves"></div>
      <div className="center-label">
        <span className="label-text">{songName || 'No track'}</span>
        <div className="spindle"></div>
      </div>
    </div>
  );
}
