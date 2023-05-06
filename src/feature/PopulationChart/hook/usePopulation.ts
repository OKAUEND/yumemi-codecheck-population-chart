import { selector, selectorFamily, useRecoilValue, waitForAll } from 'recoil';

import { Prefectures, Populations } from '@/src/types/resas';
import { populationQuery } from '@/src/feature/PopulationChart/api/populationQuery';
import { prefecturesMapToArray } from '@/src/feature/PopulationChart/hook/useSelectedPrefectures';

const prefQuery = 'prefCode=';

const filteredPopulation = selectorFamily<Populations, Prefectures>({
  key: 'data-flow/filted-population',
  get: (prefecture) => async (): Promise<Populations> => {
    const populations = await populationQuery(
      `${prefQuery}${prefecture.prefCode}`
    );
    return populations;
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
