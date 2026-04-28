import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PoCList from './components/PoCList';
import { Shield, Zap, TrendingUp, Clock, Download } from 'lucide-react';
import { GitHubPoCAdapter } from './services/api/GitHubPoCAdapter';
import { OSVAdapter } from './services/api/OSVAdapter';
import { SearchResult, SearchMode } from './types';

function App() {
  const [query, setQuery] = useState<string>('');
  const [mode, setMode] = useState<SearchMode>('cve');
  const [ecosystem, setEcosystem] = useState<string>('npm');
  const [version, setVersion] = useState<string>('');
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('inserted_at'); 
  const [minStars, setMinStars] = useState<number>(0);

  // Initialize adapters
  const adapters = {
    cve: new GitHubPoCAdapter(),
    library: new OSVAdapter()
  };

  const performSearch = async (searchQuery = '', currentMode = mode) => {
    setLoading(true);
    setError(null);
    try {
      const adapter = adapters[currentMode];
      const data = await adapter.search({
        query: searchQuery,
        sortBy,
        ecosystem,
        version
      });
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults([]); // Clear results when switching modes
    if (mode === 'cve') {
      performSearch('', 'cve');
    }
  }, [sortBy, mode]);

  const handleSearch = () => {
    performSearch(query, mode);
  };

  const exportToCSV = () => {
    if (results.length === 0) return;

    const headers = ['CVE ID', 'Title', 'Source', 'Description', 'URL', 'Stars/Metadata'];
    const rows = results.map(item => [
      item.cveId,
      `"${item.title.replace(/"/g, '""')}"`,
      item.source,
      `"${item.description.replace(/"/g, '""').substring(0, 200)}..."`,
      item.url,
      item.source === 'GitHub PoC' ? item.metadata.stars : `${item.metadata.ecosystem} - ${item.metadata.fixedVersion || 'N/A'}`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `audit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <header className="main-header animate-fade-in">
        <div className="logo">
          <Shield className="logo-icon" size={32} />
          <h1>PoC<span>Explorer</span></h1>
        </div>
        <p className="subtitle">Cybersecurity Data & Exploit Aggregator</p>
      </header>

      <main>
        <section className="search-section">
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            onSearch={handleSearch}
            mode={mode}
            setMode={setMode}
            ecosystem={ecosystem}
            setEcosystem={setEcosystem}
            version={version}
            setVersion={setVersion}
          />
          
          <div className="filters-container animate-fade-in">
            {mode === 'cve' && (
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
            )}

            {mode === 'cve' && (
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
            )}

            <div className="filter-group">
              <span className="filter-label">Actions:</span>
              <button 
                className="filter-btn glass export-btn"
                onClick={exportToCSV}
                disabled={results.length === 0}
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>
        </section>

        <section className="results-section">
          <div className="section-header animate-fade-in">
            <Zap size={20} className="header-icon" />
            <h2>
              {query ? `Results for ${query}` : (mode === 'cve' ? 'Latest PoCs' : 'Search a library')}
            </h2>
          </div>
          
          <PoCList 
            pocs={mode === 'cve' ? results.filter(p => (p.metadata.stars || 0) >= minStars) : results} 
            loading={loading} 
            error={error} 
          />
        </section>
      </main>

      <footer className="main-footer animate-fade-in">
        <p>Adapters: GitHub PoC, OSV.dev (Google Security)</p>
        <p>© 2026 PoC Explorer • Unified Audit Tool</p>
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
        .export-btn {
          border-color: var(--accent);
          color: var(--text-main);
        }
        .export-btn:hover:not(:disabled) {
          background: var(--accent);
          color: var(--bg-dark);
          border-color: var(--accent);
        }
        .export-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default App;
