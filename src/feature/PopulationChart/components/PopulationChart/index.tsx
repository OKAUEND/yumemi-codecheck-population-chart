import {
  usePopulation,
  usePopulationCategories,
} from '@/src/feature/PopulationChart/hook/usePopulation';
import { LineChrt } from '@/src/base/Parts/Chart';
import { RadioList } from '@/src/base/Parts/RadioList';
import { useSelectedPrefectures } from '../../hook/useSelectedPrefectures';
export const PopulationChart = () => {
  const population = usePopulation();
  const [selectedPref] = useSelectedPrefectures();
  const [categories, selectedCategory, changeCategory] =
    usePopulationCategories();

  return (
    <article>
      <h2>人口</h2>
      <RadioList
        categories={categories}
        selected={selectedCategory}
        group="populationCategories"
        changeHandler={changeCategory}
      />
      <LineChrt populationInfo={population} selectedPref={selectedPref} />
    </article>
  );
};