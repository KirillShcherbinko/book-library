import { makeAutoObservable } from 'mobx';

class AuthStore {
  private accessToken: string | null = null;
  private refreshPromise: Promise<string | null> | null = null;
  private loading: boolean = false;

  public constructor() {
    makeAutoObservable(this);
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public getRefreshPromise(): Promise<string | null> | null {
    return this.refreshPromise;
  }

  public setAccessToken(accessToken: string | null): void {
    this.accessToken = accessToken;
  }

  public setRefreshPromise(refreshPromise: Promise<string | null> | null) {
    this.refreshPromise = refreshPromise;
  }

  public clear(): void {
    this.accessToken = null;
  }

  public isValid(): boolean {
    return this.accessToken !== null;
  }

  public setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public isLoading(): boolean {
    return this.loading;
  }

  public isFirstRefresh(): boolean {
    return this.refreshPromise === null;
  }
}

export const authStore = new AuthStore();
