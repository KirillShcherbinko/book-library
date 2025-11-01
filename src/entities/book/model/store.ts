import { makeAutoObservable } from 'mobx';

import { FEED_BOOKS_LIMIT, SCROLL_BOOKS_LIMIT } from './consts';
import type { TBookListVariant } from './types';

class BookStore {
  private searchQuery: string = '';
  private scrollLimit: number = SCROLL_BOOKS_LIMIT;
  private feedLimit: number = FEED_BOOKS_LIMIT;
  private offset: number = 0;
  private booksNumber: number = FEED_BOOKS_LIMIT;

  public constructor() {
    makeAutoObservable(this);
  }

  public getSearchQuery() {
    return this.searchQuery;
  }

  public getLimit(bookListVariant: TBookListVariant) {
    return bookListVariant === 'scroll' ? this.scrollLimit : this.feedLimit;
  }

  public getOffset(bookListVariant: TBookListVariant) {
    return bookListVariant == 'scroll' ? 0 : this.offset;
  }

  public setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }

  public setOffset(offset: number) {
    this.offset = offset;
  }

  public setBooksNumber(booksNumber: number): void {
    this.booksNumber = booksNumber;
  }

  public hasMoreBooks(): boolean {
    console.log(this.booksNumber, this.offset + this.feedLimit);
    return this.booksNumber === this.offset + this.feedLimit;
  }
}

export const bookStore = new BookStore();
