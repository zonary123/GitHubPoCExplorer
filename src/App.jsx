import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PoCList from './components/PoCList';
import { Shield, Zap, TrendingUp, Clock } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [pocs, setPocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('inserted_at'); 
  const [minStars, setMinStars] = useState(0);

  const fetchPocs = async (searchQuery = '', sort = 'inserted_at') => {
    // Sanitización: eliminar espacios en blanco al inicio, final y espacios internos
    const sanitizedQuery = searchQuery.trim().replace(/\s+/g, '');
    
    setLoading(true);
    setError(null);
    try {
      let url = '/api/v1/';
      const params = new URLSearchParams();
      
      if (sanitizedQuery) {
        params.append('cve_id', sanitizedQuery);
      } else {
        // Default to latest
        params.append('limit', '30');
      }

      if (sort === 'stargazers_count') {
        params.append('sort', 'stargazers_count');
      }

      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch data from API');
      
      const data = await response.json();
      setPocs(data.pocs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPocs('', sortBy);
  }, [sortBy]);

  const handleSearch = () => {
    // Sanitizar antes de llamar para que el estado 'query' también se limpie visualmente si se desea
    const cleanQuery = query.trim().replace(/\s+/g, '');
    setQuery(cleanQuery);
    fetchPocs(cleanQuery, sortBy);
  };

  return (
    <div className="container">
      <header className="main-header animate-fade-in">
        <div className="logo">
          <Shield className="logo-icon" size={32} />
          <h1>PoC<span>Explorer</span></h1>
        </div>
        <p className="subtitle">Real-time GitHub Proof of Concept Database</p>
      </header>

      <main>
        <section className="search-section">
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            onSearch={handleSearch} 
          />
          
          <div className="filters-container animate-fade-in">
            <div className="filter-group">
              <span className="filter-label">Sort by:</span>
              <div className="filters">
                <button 
                  className={`filter-btn glass ${sortBy === 'inserted_at' ? 'active' : ''}`}
                  onClick={() => setSortBy('inserted_at')}
                >
                  <Clock size={16} /> Latest
                </button>
                <button 
                  className={`filter-btn glass ${sortBy === 'stargazers_count' ? 'active' : ''}`}
                  onClick={() => setSortBy('stargazers_count')}
                >
                  <TrendingUp size={16} /> Most Stars
                </button>
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Min Stars: {minStars}</span>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={minStars} 
                onChange={(e) => setMinStars(parseInt(e.target.value))}
                className="range-input"
              />
            </div>
          </div>
        </section>

        <section className="results-section">
          <div className="section-header animate-fade-in">
            <Zap size={20} className="header-icon" />
            <h2>{query ? `Results for ${query}` : 'Latest PoCs'}</h2>
          </div>
          
          <PoCList 
            pocs={pocs.filter(p => parseInt(p.stargazers_count) >= minStars)} 
            loading={loading} 
            error={error} 
          />
        </section>
      </main>

      <footer className="main-footer animate-fade-in">
        <p>Data provided by <a href="https://poc-in-github.motikan2010.net/" target="_blank" rel="noreferrer">motikan2010</a></p>
        <p>© 2026 PoC Explorer • Agilizando la ciberseguridad</p>
      </footer>

      <style jsx>{`
        .main-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-top: 2rem;
        }
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 0.5rem;
        }
        .logo-icon {
          color: var(--primary);
        }
        h1 {
          font-size: 2.5rem;
          color: var(--text-main);
        }
        h1 span {
          color: var(--primary);
        }
        .subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
        }
        .search-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .filters-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }
        .filter-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .filters {
          display: flex;
          gap: 12px;
        }
        .range-input {
          width: 200px;
          accent-color: var(--primary);
          cursor: pointer;
        }
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 12px;
        }
        .filter-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .filter-btn:not(.active):hover {
          border-color: var(--primary);
          color: var(--text-main);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }
        .header-icon {
          color: var(--accent);
        }
        h2 {
          font-size: 1.5rem;
          color: var(--text-main);
        }
        .main-footer {
          margin-top: 5rem;
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .main-footer a {
          color: var(--primary);
          text-decoration: none;
        }
        .main-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default App;
