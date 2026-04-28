import { BaseAdapter } from './BaseAdapter';
import { SearchResult, SearchParams } from '../../types';

export class OSVAdapter extends BaseAdapter {
  constructor() {
    super('OSV.dev');
  }

  async search({ query, ecosystem, version }: SearchParams): Promise<SearchResult[]> {
    if (!query) return [];

    const body: any = {
      package: {
        name: query,
        ecosystem: ecosystem
      }
    };

    if (version) {
      body.version = version;
    }

    const response = await fetch('/osv-api/v1/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error('Failed to fetch from OSV API');
    
    const data = await response.json();
    
    if (!data.vulns) return [];

    return data.vulns.map((item: any) => this.normalize(item, query, ecosystem, version));
  }

  normalize(item: any, pkgName: string, ecosystem?: string, searchedVersion?: string): SearchResult {
    const cveId = item.aliases?.find((a: string) => a.startsWith('CVE-')) || item.id;
    
    // Improved matching: some APIs return package name in different casing or variants
    const affected = item.affected?.find((a: any) => 
      a.package.name.toLowerCase() === pkgName.toLowerCase()
    ) || item.affected?.[0] || {};

    const versions = affected.versions || [];
    
    // Find range info if versions list is empty
    let rangeInfo = '';
    const semverRange = affected.ranges?.find((r: any) => r.type === 'SEMVER' || r.type === 'ECOSYSTEM');
    if (semverRange) {
      const intro = semverRange.events?.find((e: any) => e.introduced)?.introduced || '0';
      const fixed = semverRange.events?.find((e: any) => e.fixed)?.fixed;
      rangeInfo = fixed ? `${intro} -> ${fixed}` : `>= ${intro}`;
    }

    const fixedVersion = affected.ranges?.find((r: any) => r.type === 'ECOSYSTEM' || r.type === 'SEMVER')
      ?.events?.find((e: any) => e.fixed)?.fixed;

    return {
      id: item.id,
      title: item.summary || `${pkgName} Vulnerability`,
      description: item.details || 'No details provided.',
      cveId: cveId,
      url: `https://osv.dev/vulnerability/${item.id}`,
      source: 'OSV.dev',
      metadata: {
        ecosystem: ecosystem,
        packageName: pkgName,
        affectedVersions: versions.length > 0 ? versions : (rangeInfo ? [rangeInfo] : []),
        fixedVersion: fixedVersion,
        date: item.modified,
        isSpecificVersion: !!searchedVersion,
        severity: item.database_specific?.severity || 'Unknown'
      }
    };
  }
}
