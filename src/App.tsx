import styles from '@/src/styles/App.module.scss';

import { PopulationInfo } from '@/src/feature/PopulationChart';

function App() {
  return (
    <section className={`${styles.main}`}>
      <PopulationInfo />
    </section>
  );
}

export default App;
