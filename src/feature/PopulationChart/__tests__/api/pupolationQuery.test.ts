import { describe, test, expect } from 'vitest';
import { waitFor } from '@testing-library/react';

import { setupMockServer } from '@/src/mock/setup';
import {
  populationsHandler,
  populationCategories,
} from '@/src/feature/PopulationChart/mock/pupilation';
import { populationQuery } from '@/src/feature/PopulationChart/api/populationQuery';

describe('PopulationQuery TEST', () => {
  const server = setupMockServer([populationsHandler()]);
  const query = 'prefCode=1';
  test('都道府県の人口値が取得される', async () => {
    const res = populationQuery(query);

    const data = await res;

    await waitFor(() => {
      expect(data.result.boundaryYear).toEqual(9999);
      expect(data.result.data.length).toEqual(4);
      data.result.data.forEach((category, index) => {
        const categoryIndex = populationCategories[index];
        expect(category.label).toEqual(categoryIndex);
      });
    });
  });
  test('通信失敗:400', async () => {
    server.use(populationsHandler(400));

    expect(populationQuery(query)).rejects.toThrowError(new Error(`Error`));
  });

  test('通信失敗:500', async () => {
    server.use(populationsHandler(500));

    expect(populationQuery(query)).rejects.toThrowError(new Error(`Error`));
  });
});
