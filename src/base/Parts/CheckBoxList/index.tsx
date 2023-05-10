import { CheckBox } from '@/src/base/Element/CheckBox';
import { Prefectures } from '@/src/types/Resas';
import { SelectedCheckbox } from '@/src/types/Element';
import styles from './checkboxList.module.scss';

interface Props {
  values: Prefectures[];
  changeHandler: (selected: SelectedCheckbox) => void;
}

export const CheckBoxList = ({ values, changeHandler }: Props) => {
  return (
    <ul className={styles.checkbox_container}>
      {values.map((value) => (
        <li key={value.prefCode} className={styles.checkbox_list}>
          <CheckBox
            label={value.prefName}
            value={value.prefCode}
            changeHandler={changeHandler}
          />
        </li>
      ))}
    </ul>
  );
};
