import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div className="search-container animate-fade-in">
      <div className="search-wrapper glass">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search by CVE (e.g. CVE-2021-44228)..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <button className="search-button" onClick={onSearch}>
          Search
        </button>
      </div>
      <style jsx>{`
        .search-container {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          gap: 12px;
          transition: all 0.3s ease;
        }
        .search-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
        .search-icon {
          color: var(--text-muted);
        }
        input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-main);
          font-size: 1.1rem;
          padding: 12px 0;
        }
        input::placeholder {
          color: var(--text-muted);
          opacity: 0.6;
        }
        .search-button {
          background: var(--primary);
          color: white;
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .search-button:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
