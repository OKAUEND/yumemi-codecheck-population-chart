import { selector, selectorFamily, useRecoilValue, waitForAll } from 'recoil';

import { Prefectures, PopulationInfo } from '@/src/types/resas';
import { populationQuery } from '@/src/feature/PopulationChart/api/populationQuery';
import { prefecturesMapToArray } from '@/src/feature/PopulationChart/hook/useSelectedPrefectures';

const prefQuery = 'prefCode=';

const filteredPopulation = selectorFamily<PopulationInfo, Prefectures>({
  key: 'data-flow/filted-population',
  get: (prefecture) => async (): Promise<PopulationInfo> => {
    const populations = await populationQuery(
      `${prefQuery}${prefecture.prefCode}`
    );

    return { prefName: prefecture.prefName, data: populations.data };
  },
});

const populations = selector({
  key: 'data-flow/populations',
  get: ({ get }) => {
    const selectedPrefectures = get(prefecturesMapToArray);

    const populations = get(
      waitForAll(
        selectedPrefectures.map((prefecture) => {
          return filteredPopulation(prefecture);
        })
      )
    );

    return populations;
  },
});

export const usePopulation = () => {
  return useRecoilValue(populations);
};
