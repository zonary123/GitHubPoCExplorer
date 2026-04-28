import React from 'react';
import { Star, ExternalLink, Calendar, User, Info, Copy, Check } from 'lucide-react';
import { SearchResult } from '../types';

interface PoCCardProps {
  poc: SearchResult;
}

const PoCCard: React.FC<PoCCardProps> = ({ poc }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(poc.cveId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { metadata, source } = poc;

  return (
    <div className="poc-card glass animate-fade-in">
      <div className="card-header">
        <div className="cve-container">
          <span className="cve-tag">{poc.cveId}</span>
          <button className="copy-btn" onClick={copyToClipboard} title="Copy CVE ID">
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          </button>
        </div>
        {source === 'GitHub PoC' && (
          <div className="stars">
            <Star size={16} fill="currentColor" />
            <span>{metadata.stars}</span>
          </div>
        )}
        {source === 'OSV.dev' && (
          <div className="source-tag">{source}</div>
        )}
      </div>
      
      <h3 className="repo-name">{poc.title}</h3>
      <p className="description">{poc.description}</p>
      
      {source === 'OSV.dev' && (
        <div className="vuln-info glass">
          <div className="info-header">
            <Info size={14} />
            <span>Versions & Fixes</span>
          </div>
          <div className="versions-grid">
            <div className="v-item">
              <span className="v-label">Ecosystem:</span>
              <span className="v-value">{metadata.ecosystem}</span>
            </div>
            {metadata.fixedVersion && (
              <div className="v-item">
                <span className="v-label">Fixed in:</span>
                <span className="v-value fix">{metadata.fixedVersion}</span>
              </div>
            )}
            <div className="v-item full">
              <span className="v-label">Affected:</span>
              <div className="v-list">
                {metadata.affectedVersions?.slice(0, 5).map(v => (
                  <span key={v} className="v-tag">{v}</span>
                )) || <span className="v-tag">Check details</span>}
                {metadata.affectedVersions && metadata.affectedVersions.length > 5 && <span>...</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {source === 'GitHub PoC' && metadata.vulnDescription && (
        <div className="vuln-info glass">
          <div className="info-header">
            <Info size={14} />
            <span>Vulnerability Info</span>
          </div>
          <p className="vuln-text">{metadata.vulnDescription}</p>
        </div>
      )}

      <div className="card-footer">
        <div className="metadata">
          <div className="meta-item">
            <User size={14} />
            <span>{metadata.author || 'Advisory'}</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span>{metadata.date ? new Date(metadata.date).toLocaleDateString() : 'Unknown'}</span>
          </div>
        </div>
        
        <a 
          href={poc.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          {source === 'GitHub PoC' ? 'View PoC' : 'View Advisory'} <ExternalLink size={14} />
        </a>
      </div>

      <style jsx>{`
        .poc-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
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
        .source-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
        }
        .copy-btn {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
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
          font-size: 1.15rem;
          color: var(--text-main);
          line-height: 1.3;
        }
        .description {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .vuln-info {
          padding: 12px;
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }
        .info-header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
        .versions-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .v-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .v-label {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        .v-value {
          color: var(--text-main);
          font-weight: 600;
        }
        .v-value.fix {
          color: #10b981;
        }
        .v-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
        }
        .v-tag {
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
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
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .github-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--text-main);
          color: var(--bg-dark);
          padding: 8px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }
        .github-link:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default PoCCard;
