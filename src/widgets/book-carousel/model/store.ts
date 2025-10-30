import { makeAutoObservable } from 'mobx';

import type { PopularBook } from '@/shared';

class PopularBooksStore {
  private popularBooks: PopularBook[] = [];

  public constructor() {
    makeAutoObservable(this);
  }

  public get getPopularBooks(): PopularBook[] {
    return this.popularBooks;
  }

  public setPopularBooks(popularBooks: PopularBook[]): void {
    this.popularBooks = popularBooks;
  }
}

export const popularBooksStore = new PopularBooksStore();
