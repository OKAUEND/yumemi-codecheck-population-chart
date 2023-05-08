import { Suspense } from 'react';
import style from '@/src/feature/PopulationChart/styles/router.module.scss';

import { PrefectureList } from '@/src/feature/PopulationChart/components/Prefectures';
import { PopulationChart } from '@/src/feature/PopulationChart/components/PopulationChart';

import { ErrorBoundaryExtended } from '@/src/base/Parts/Error';

export const PopulationInfo = () => {
  return (
    <section className={style.population}>
      <ErrorBoundaryExtended>
        <Suspense fallback={<div>Loading...</div>}>
          <PrefectureList />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PopulationChart />
        </Suspense>
      </ErrorBoundaryExtended>
    </section>
  );
};
