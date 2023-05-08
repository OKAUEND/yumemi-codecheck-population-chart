import style from '@/src/styles/App.module.scss';

import { PopulationInfo } from '@/src/feature/PopulationChart';

function App() {
  return (
    <section className={`${style.main}`}>
      <PopulationInfo />
    </section>
  );
}

export default App;
