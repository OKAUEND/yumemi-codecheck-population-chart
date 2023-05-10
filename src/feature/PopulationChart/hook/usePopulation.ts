import {
  atom,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  waitForAll,
} from 'recoil';

import { Populations } from '@/src/types/Resas.ts';
import { populationQuery } from '@/src/feature/PopulationChart/api/populationQuery';
import { prefecturesMapToArray } from '@/src/feature/PopulationChart/hook/useSelectedPrefectures';

/**
 * RESAS用都道府県クエリ
 */
const prefQuery = 'prefCode=';

/**
 * 人口情報カテゴリーの型定義
 */
export type Categories = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

/**
 * 人口情報カテゴリーの配列
 */
export const populationCategories: Categories[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

/**
 * 選択中のカテゴリー。初期値は総人口
 * @returns RecoilState<string>
 */
const selectedCategoryState = atom<string>({
  key: 'state/category',
  default: populationCategories[0],
});

/**
 * 取得した人口情報データをキャッシュする
 */
const populationsQuery = selectorFamily<Populations, Prefectures>({
  key: 'data-flow/population-query',
  get: (prefecture) => async () => {
    const populations = await populationQuery(
      `${prefQuery}${prefecture.prefCode}`
    );
    return populations;
  },
});

const filteredPopulation = selectorFamily<PopulationInfo[], Prefectures>({
  key: 'data-flow/filtered-population',
  get:
    (prefecture) =>
    async ({ get }): Promise<PopulationInfo[]> => {
      const selectedCategory = get(selectedCategoryState);
      const populations = get(populationsQuery(prefecture));

      //RESASの人口情報の配列から現在選択中のカテゴリーを元に対象データの抽出を行う
      const filtered = populations.data.filter((population) => {
        return population.label === selectedCategory;
      })[0];

      //Rechartで表示するためには、ID：データ値の形式にしないと同じグループとして扱えないため、
      //抽出したデータをRechartで表示出来るように元にデータの変換を行う
      const converted = filtered.data.map((year) => {
        return { year: year.year, [prefecture.prefCode]: year.value };
      });

      return converted;
    },
});

const populations = selector({
  key: 'data-flow/populations',
  get: ({ get }) => {
    const selectedPrefectures = get(prefecturesMapToArray);

    //Recoilで取得などをループで回す場合、逐次呼び出しになるため並列化するためにwaitForAllを使う
    //選ばれた都道府県毎にAPIコール関数を呼び出す
    const populations = get(
      waitForAll(
        selectedPrefectures.map((prefecture) => {
          return filteredPopulation(prefecture);
        })
      )
    );

    //配列の要素が0だった場合、次の変換処理を行わせたくないのでここでガードする
    if (populations.length === 0) {
      return [];
    }

    //Recahrtで複数の凡例を表示する場合、同じオブジェクトのプロパティに含まれず、
    //別のオブジェクトとして配列にある場合は、チャートの表示が繰り返されてしまう。
    //そのため、複数のオブジェクトを1つにまとめる
    const formattedInfo = populations.reduce((prevInfo, currantInfo) => {
      const result = prevInfo.map((yearInfo) => {
        const currentResult = currantInfo.find(
          (currentYearInfo) => currentYearInfo.year === yearInfo.year
        );
        return { ...yearInfo, ...currentResult };
      });
      return result;
    });

    return formattedInfo;
  },
});

export const usePopulation = () => {
  return useRecoilValue(populations);
};

export const usePopulationCategories = () => {
  const selectedCategory = useRecoilValue(selectedCategoryState);

  /**
   * 人口情報カテゴリーを選択したものへ更新する
   */
  const changeCategory = useRecoilCallback(({ set }) => (target: string) => {
    set(selectedCategoryState, () => target);
  });

  return [populationCategories, selectedCategory, changeCategory] as const;
};
