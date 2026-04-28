import { BaseAdapter } from './BaseAdapter';
import { SearchResult, SearchParams } from '../../types';

export class GitHubPoCAdapter extends BaseAdapter {
  constructor() {
    super('GitHub PoC');
  }

  async search({ query, sortBy = 'inserted_at' }: SearchParams): Promise<SearchResult[]> {
    const sanitizedQuery = query.trim().replace(/\s+/g, '');
    const params = new URLSearchParams();
    
    if (sanitizedQuery) {
      params.append('cve_id', sanitizedQuery);
    } else {
      params.append('limit', '30');
    }

    if (sortBy === 'stargazers_count') {
      params.append('sort', 'stargazers_count');
    }

    const response = await fetch(`/api/v1/?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch from GitHub PoC API');
    
    const data = await response.json();
    return (data.pocs || []).map((item: any) => this.normalize(item));
  }

  normalize(item: any): SearchResult {
    return {
      id: item.id || `gh-${item.name}-${item.created_at}`,
      title: item.name,
      description: item.description || item.vuln_description || 'No description available.',
      cveId: item.cve_id,
      url: item.html_url,
      source: 'GitHub PoC',
      metadata: {
        stars: parseInt(item.stargazers_count) || 0,
        author: item.owner,
        date: item.created_at,
        vulnDescription: item.vuln_description
      }
    };
  }
}
