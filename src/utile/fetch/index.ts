import { ResasResponse } from '@/src/types/resas';

export const fetchRESAS = async <T>(url: string) => {
  const API_KEY = import.meta.env.VITE_RESAS_API_KEY;
  const res = await fetch(url, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });
  if (!res.ok) {
    throw new Error('Error');
  }

  const data: ResasResponse<T> = await res.json();

  if (typeof data === 'number') {
    throw new Error(`RESAS Error Status ${data}`);
  }

  if (!('result' in data)) {
    if (data.message === null) {
      throw new Error(`RESAS Error Many Request`);
    }
    throw new Error(`RESAS Error ${data.statusCode} ${data.message}`);
  }

  return data;
};
