import { CheckBox } from '@/src/base/Element/CheckBox';
import { Prefectures } from '@/src/types/resas';
import style from './checkboxlist.module.scss';

interface Props {
  values: Prefectures[];
  checked: boolean;
  changeHandler: () => void;
}

export const CheckBoxList = ({ values, checked, changeHandler }: Props) => {
  return (
    <ul className={style.listbase}>
      {values.map((value) => (
        <li key={value.prefCode} className={style.list}>
          <CheckBox
            label={value.prefName}
            value={value.prefCode}
            checked={checked}
            changeHandler={changeHandler}
          />
        </li>
      ))}
    </ul>
  );
};
