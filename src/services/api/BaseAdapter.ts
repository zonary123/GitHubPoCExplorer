import { SearchResult, SearchParams } from '../../types';

export abstract class BaseAdapter {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract search(params: SearchParams): Promise<SearchResult[]>;

  abstract normalize(data: any, ...args: any[]): SearchResult;
}
