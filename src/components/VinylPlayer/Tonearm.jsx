import { useRef, useEffect, useCallback } from 'react';
import './Tonearm.css';

export default function Tonearm({
  angle,
  isDragging,
  onDragStart,
  onDragMove,
  onDragEnd
}) {
  const pivotRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    if (pivotRef.current) {
      const rect = pivotRef.current.getBoundingClientRect();
      const pivotX = rect.left + rect.width / 2;
      const pivotY = rect.top + rect.height / 2;
      onDragStart({ pivotX, pivotY });
    }
  }, [onDragStart]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        onDragMove({ clientX: e.clientX, clientY: e.clientY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        onDragEnd();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDragMove, onDragEnd]);

  return (
    <div className="tonearm-container">
      <div className="pivot" ref={pivotRef}>
        <div
          className={`tonearm ${isDragging ? 'dragging' : ''}`}
          style={{ transform: `rotate(${angle}deg)` }}
          onMouseDown={handleMouseDown}
        >
          <div className="arm"></div>
          <div className="headshell"></div>
        </div>
      </div>
    </div>
  );
}
