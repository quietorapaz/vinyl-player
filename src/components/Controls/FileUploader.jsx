import { useRef } from 'react';
import './FileUploader.css';

export default function FileUploader({ onFileSelect, currentSong }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      onFileSelect(url, file.name);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="file-uploader">
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleClick} className="upload-button">
        {currentSong || 'Select audio file'}
      </button>
    </div>
  );
}
