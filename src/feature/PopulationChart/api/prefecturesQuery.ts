import { fetchRESAS } from '@/src/utile/fetch';

export const prefecturesQuery = async () => {
  const res = await fetchRESAS(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  );
  return res;
};
