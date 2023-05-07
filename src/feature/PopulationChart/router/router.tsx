import style from '@/src/feature/PopulationChart/styles/router.module.scss';

import { PrefectureList } from '@/src/feature/PopulationChart/components/Prefectures';
import { PopulationChart } from '@/src/feature/PopulationChart/components/PopulationChart';
import { Suspense } from 'react';

export const PopulationInfo = () => {
  return (
    <section className={style.population}>
      <Suspense fallback={<div>Loading...</div>}>
        <PrefectureList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PopulationChart />
      </Suspense>
    </section>
  );
};
