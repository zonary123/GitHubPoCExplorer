export interface SearchResultMetadata {
  stars?: number;
  author?: string;
  date: string;
  vulnDescription?: string;
  affectedVersions?: string[];
  fixedVersion?: string;
  ecosystem?: string;
  packageName?: string;
  severity?: string;
  isSpecificVersion?: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  cveId: string;
  url: string;
  source: string;
  metadata: SearchResultMetadata;
}

export type SearchMode = 'cve' | 'library';

export interface SearchParams {
  query: string;
  sortBy?: string;
  ecosystem?: string;
  version?: string;
}
