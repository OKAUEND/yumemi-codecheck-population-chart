import { Radio } from '@/src/base/Element/Radio';
import styles from '@/src/base/Parts/RadioList/radioList.module.scss';

interface Props {
  categories: string[];
  selected: string;
  group: string;
  changeHandler: (selected: string) => void;
}

export const RadioList = ({
  categories,
  selected,
  group,
  changeHandler,
}: Props) => {
  return (
    <ul className={styles.radio_container}>
      {categories.map((category, index) => (
        <li key={index} className={styles.radio_list}>
          <Radio
            categories={group}
            label={category}
            value={category}
            checked={selected === category}
            changeHandler={changeHandler}
          />
        </li>
      ))}
    </ul>
  );
};
