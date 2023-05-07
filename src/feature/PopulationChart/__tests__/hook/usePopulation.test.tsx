import { describe, test, expect } from 'vitest';
import { RecoilRoot } from 'recoil';
import { act, renderHook, waitFor } from '@testing-library/react';

import { setupMockServer } from '@/src/mock/setup';
import { populationsHandler } from '@/src/feature/PopulationChart/mock/population';

import { usePopulation } from '@/src/feature/PopulationChart/hook/usePopulation';
import { useSelectedPrefectures } from '@/src/feature/PopulationChart/hook/useSelectedPrefectures';

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
  test('チェックされた都道府県がある時、APIからデータを取得しているか', async () => {
    const { result } = renderHook(
      () => {
        const population = usePopulation();
        const [, setPref] = useSelectedPrefectures();

        return { population, setPref };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current.population.length).toEqual(0);
    });

    //現状あまりいいやり方ではないため
    //The current testing environment is not configured to support act(...)が発生するため
    //解決するのだったら、Recoil内でループをやめて、サードライブラリでデータ取得をしたほうがよい
    await act(async () => {
      await waitFor(() => {
        result.current.setPref({ checked: true, value: 1, name: 'Mock' });
        result.current.setPref({ checked: true, value: 2, name: 'Mock2' });
      });
    });

    await waitFor(() => {
      expect(result.current.population.length).toEqual(18);
    });
  });
});
