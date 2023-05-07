import style from '@/src/feature/PopulationChart/styles/router.module.scss';

import { PrefectureList } from '@/src/feature/PopulationChart/components/Prefectures';

export const PopulationInfo = () => {
  return (
    <section className={style.population}>
      <PrefectureList />
    </section>
  );
};
