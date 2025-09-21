class TokenManager {
  private accessToken: string | null = null;

  public get(): string | null {
    return this.accessToken;
  }

  public set(accessToken: string | null): void {
    this.accessToken = accessToken;
  }

  public clear(): void {
    this.accessToken = null;
  }

  public isValid(): boolean {
    return this.accessToken !== null;
  }
}

export const tokenManager = new TokenManager();
