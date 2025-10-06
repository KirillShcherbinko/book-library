import { makeAutoObservable } from 'mobx';

class BookStore {
  private searchQuery: string = '';
  private limit: number = 10;
  private page: number = 1;

  public constructor() {
    makeAutoObservable(this);
  }

  public getSearchQuery() {
    return this.searchQuery;
  }

  public getLimit() {
    return this.limit;
  }

  public getPage() {
    return this.page;
  }

  public setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }

  public setLimit(limit: number) {
    this.limit = limit;
  }

  public setPage(page: number) {
    this.page = page;
  }
}

export const bookStore = new BookStore();
