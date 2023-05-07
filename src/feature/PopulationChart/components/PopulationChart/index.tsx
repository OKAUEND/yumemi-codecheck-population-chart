import { usePopulation } from '@/src/feature/PopulationChart/hook/usePopulation';
import { LineChrt } from '@/src/base/Parts/Chart';
import { useSelectedPrefectures } from '../../hook/useSelectedPrefectures';
export const PopulationChart = () => {
  const population = usePopulation();
  const [selectedPref] = useSelectedPrefectures();

  return (
    <article>
      <h2>人口</h2>
      <LineChrt populationInfo={population} selectedPref={selectedPref} />
    </article>
  );
};
