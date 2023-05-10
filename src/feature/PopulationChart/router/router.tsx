import { Suspense } from 'react';
import styles from '@/src/feature/PopulationChart/styles/router.module.scss';

import { PrefectureList } from '@/src/feature/PopulationChart/components/Prefectures';
import { PopulationChart } from '@/src/feature/PopulationChart/components/PopulationChart';

import { ErrorBoundaryExtended } from '@/src/base/Parts/Error';
import { LoadingBasicAnimation } from '@/src/base/Parts/Loading';

export const PopulationInfo = () => {
  return (
    <section className={styles.population_router}>
      <ErrorBoundaryExtended>
        {/**Suspenseを入れ子にすることで、初期ロードは全体がロード画面になり、都道府県の選択時にはチャート部分だけをロード画面にし
         * 画面全体のロードとパーツ部分だけのロードを切り分けるようにする
         */}
        <Suspense fallback={<LoadingBasicAnimation />}>
          <PrefectureList />
          <div className={styles.population_chart_container}>
            <Suspense fallback={<LoadingBasicAnimation />}>
              <PopulationChart />
            </Suspense>
          </div>
        </Suspense>
      </ErrorBoundaryExtended>
    </section>
  );
};
