import style from './App.module.scss';

import { PopulationChart } from '@/src/feature/PopulationChart';

function App() {
  return (
    <section className={`${style.root}`}>
      <PopulationChart />
    </section>
  );
}

export default App;
