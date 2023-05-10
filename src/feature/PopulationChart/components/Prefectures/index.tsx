import { CheckBoxList } from '@/src/base/Parts/CheckBoxList';
import { usePrefectures } from '@/src/feature/PopulationChart/hook/usePrefectures';
import { useSelectedPrefectures } from '@/src/feature/PopulationChart/hook/useSelectedPrefectures';
import styles from '@/src/feature/PopulationChart/styles/components/prefectures.module.scss';

export const PrefectureList = () => {
  const prefectures = usePrefectures();
  const [, selectPrefectures] = useSelectedPrefectures();
  return (
    <article className={styles.prefectures}>
      <h2>都道府県</h2>
      <div className={styles.prefectures_list}>
        <CheckBoxList values={prefectures} changeHandler={selectPrefectures} />
      </div>
    </article>
  );
};
