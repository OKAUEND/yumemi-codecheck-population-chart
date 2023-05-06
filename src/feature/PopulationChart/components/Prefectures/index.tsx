import { CheckBoxList } from '@/src/base/Parts/CheckBoxList';
import { usePrefectures } from '@/src/feature/PopulationChart/hook/usePrefectures';
import { useSelectedPrefectures } from '@/src/feature/PopulationChart/hook/useSelectedPrefectures';

export const PrefectureList = () => {
  const prefectures = usePrefectures();
  const [selectedPrefectures, selectPrefectures] = useSelectedPrefectures();
  return (
    <article>
      <h2>都道府県</h2>
      <CheckBoxList values={prefectures} changeHandler={selectPrefectures} />
    </article>
  );
};
