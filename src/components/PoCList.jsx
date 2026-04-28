import React from 'react';
import PoCCard from './PoCCard';
import { Ghost, AlertCircle } from 'lucide-react';

const PoCList = ({ pocs, loading, error }) => {
  if (loading) {
    return (
      <div className="status-container">
        <div className="loader"></div>
        <p>Fetching Proof of Concepts...</p>
        <style jsx>{`
          .status-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            gap: 1.5rem;
            color: var(--text-muted);
          }
          .loader {
            width: 48px;
            height: 48px;
            border: 4px solid var(--border);
            border-bottom-color: var(--primary);
            border-radius: 50%;
            animation: rotation 1s linear infinite;
          }
          @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container error">
        <AlertCircle size={48} />
        <p>{error}</p>
        <style jsx>{`
          .status-container.error {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            gap: 1.5rem;
            color: #ef4444;
          }
        `}</style>
      </div>
    );
  }

  if (pocs.length === 0) {
    return (
      <div className="status-container empty">
        <Ghost size={48} />
        <p>No PoCs found for this search.</p>
        <style jsx>{`
          .status-container.empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            gap: 1.5rem;
            color: var(--text-muted);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="grid-layout">
      {pocs.map((poc) => (
        <PoCCard key={poc.id} poc={poc} />
      ))}
    </div>
  );
};

export default PoCList;
