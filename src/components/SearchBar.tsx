import React from 'react';
import { Search } from 'lucide-react';
import { SearchMode } from '../types';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  mode: SearchMode;
  setMode: (mode: SearchMode) => void;
  ecosystem: string;
  setEcosystem: (eco: string) => void;
  version: string;
  setVersion: (ver: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onSearch, 
  mode, 
  setMode, 
  ecosystem, 
  setEcosystem, 
  version, 
  setVersion 
}) => {
  const ecosystems = [
    'npm', 'PyPI', 'Maven', 'Go', 'NuGet', 'RubyGems', 'Packagist', 'Crates.io', 'Android', 'Debian', 'Alpine'
  ];

  return (
    <div className="search-container animate-fade-in">
      <div className="mode-toggle glass">
        <button 
          className={`mode-btn ${mode === 'cve' ? 'active' : ''}`}
          onClick={() => setMode('cve')}
        >
          CVE ID
        </button>
        <button 
          className={`mode-btn ${mode === 'library' ? 'active' : ''}`}
          onClick={() => setMode('library')}
        >
          Library / Package
        </button>
      </div>

      <div className="search-wrapper glass">
        <Search className="search-icon" size={20} />
        <div className="inputs-row">
          <input
            type="text"
            placeholder={mode === 'cve' ? "Search by CVE (e.g. CVE-2021-44228)..." : "Package name (e.g. jinja2)..."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
          
          {mode === 'library' && (
            <>
              <div className="divider"></div>
              <input
                type="text"
                placeholder="Version (optional)"
                className="version-input"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              />
              <div className="divider"></div>
              <select 
                className="ecosystem-select"
                value={ecosystem}
                onChange={(e) => setEcosystem(e.target.value)}
              >
                {ecosystems.map(eco => (
                  <option key={eco} value={eco}>{eco}</option>
                ))}
              </select>
            </>
          )}
        </div>
        <button className="search-button" onClick={onSearch}>
          Search
        </button>
      </div>

      <style jsx>{`
        .search-container {
          width: 100%;
          max-width: 850px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mode-toggle {
          display: flex;
          width: fit-content;
          padding: 4px;
          border-radius: 14px;
          margin: 0 auto;
        }
        .mode-btn {
          padding: 8px 24px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }
        .mode-btn.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          padding: 6px 12px;
          gap: 12px;
          transition: all 0.3s ease;
        }
        .inputs-row {
          display: flex;
          flex: 1;
          align-items: center;
          gap: 8px;
        }
        .divider {
          width: 1px;
          height: 24px;
          background: var(--border);
        }
        .version-input {
          width: 150px;
          font-size: 0.95rem;
        }
        .ecosystem-select {
          background: transparent;
          border: none;
          color: var(--primary);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 4px;
          outline: none;
        }
        .ecosystem-select option {
          background: var(--bg-dark);
          color: var(--text-main);
        }
        input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-main);
          font-size: 1rem;
          padding: 10px 0;
        }
        input:focus {
          outline: none;
        }
        input::placeholder {
          color: var(--text-muted);
          opacity: 0.5;
        }
        .search-button {
          background: var(--primary);
          color: white;
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
