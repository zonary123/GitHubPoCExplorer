import React from 'react';
import { Star, ExternalLink, Calendar, User, Info, Copy, Check } from 'lucide-react';

const PoCCard = ({ poc }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(poc.cve_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="poc-card glass animate-fade-in">
      <div className="card-header">
        <div className="cve-container">
          <span className="cve-tag">{poc.cve_id}</span>
          <button className="copy-btn" onClick={copyToClipboard} title="Copy CVE ID">
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          </button>
        </div>
        <div className="stars">
          <Star size={16} fill="currentColor" />
          <span>{poc.stargazers_count}</span>
        </div>
      </div>
      
      <h3 className="repo-name">{poc.name}</h3>
      <p className="description">{poc.description || "No description provided."}</p>
      
      <div className="vuln-info glass">
        <div className="info-header">
          <Info size={14} />
          <span>Vulnerability Info</span>
        </div>
        <p className="vuln-text">{poc.vuln_description || "Vulnerability description not available."}</p>
      </div>

      <div className="card-footer">
        <div className="metadata">
          <div className="meta-item">
            <User size={14} />
            <span>{poc.owner}</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span>{new Date(poc.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        <a 
          href={poc.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          View PoC <ExternalLink size={14} />
        </a>
      </div>

      <style jsx>{`
        .poc-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .poc-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cve-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cve-tag {
          background: rgba(99, 102, 241, 0.15);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .copy-btn {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
        }
        .stars {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #fbbf24;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .repo-name {
          font-size: 1.25rem;
          color: var(--text-main);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .description {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .vuln-info {
          padding: 12px;
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.02);
        }
        .info-header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.75rem;
        }
        .vuln-text {
          color: var(--text-muted);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .metadata {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .github-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--text-main);
          color: var(--bg-dark);
          padding: 8px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .github-link:hover {
          opacity: 0.9;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

export default PoCCard;
