import './WoodCabinet.css';

export default function WoodCabinet({ children }) {
  return (
    <div className="cabinet">
      <div className="cabinet-surface">
        {children}
      </div>
    </div>
  );
}
