import { describe, test, expect } from 'vitest';
import { RecoilRoot } from 'recoil';
import { renderHook, waitFor } from '@testing-library/react';

import { setupMockServer } from '@/src/mock/setup';
import { populationsHandler } from '@/src/feature/PopulationChart/mock/pupilation';

import { usePopulation } from '@/src/feature/PopulationChart/hook/usePopulation';

describe('usePopulation Hook TEST', () => {
  setupMockServer([populationsHandler()]);

  test('都道府県が選択されていない時は、件数が0件である', async () => {
    const { result } = renderHook(() => usePopulation(), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current.length).toEqual(0);
    });
  });
});
