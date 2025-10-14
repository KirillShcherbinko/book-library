import { useEffect } from 'react';
import { authStore } from '../model/store';
import { print } from 'graphql';
import { REFRESH } from './queries';

export const useAuthInit = () => {
  useEffect(() => {
    const init = async () => {
      try {
        const { VITE_BASE_URL } = import.meta.env;
        const res = await fetch(`${VITE_BASE_URL}/`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: print(REFRESH) }),
        });

        if (!res.ok) throw new Error('Refresh failed');

        const data = await res.json();
        const accessToken = data?.data?.refresh?.accessToken;

        if (accessToken) {
          authStore.set(accessToken);
        }
      } catch (err) {
        console.error('Failed to refresh token:', err);
      }
    };

    init();
  }, []);
};
