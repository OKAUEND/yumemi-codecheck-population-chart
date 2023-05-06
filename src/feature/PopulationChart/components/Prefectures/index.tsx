import { CheckBoxList } from '@/src/base/Parts/CheckBoxList';
import { usePrefectures } from '@/src/feature/PopulationChart/hook/usePrefectures';

export const PrefectureList = () => {
  const prefectures = usePrefectures();
  return (
    <article>
      <h2>都道府県</h2>
      <CheckBoxList
        values={prefectures}
        checked={true}
        changeHandler={() => {
          return;
        }}
      />
    </article>
  );
};
