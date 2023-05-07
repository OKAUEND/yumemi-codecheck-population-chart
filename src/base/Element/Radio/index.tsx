import style from './radio.module.scss';
import { SelectedCheckbox } from '@/src/types/Element';

interface Props {
  label: string;
  value: number;
  changeHandler: ({ checked, value, name }: SelectedCheckbox) => void;
}

export const Radio = ({ label, value, changeHandler }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected: SelectedCheckbox = {
      checked: event.target.checked,
      value: value,
      name: label,
    };
    changeHandler(selected);
  };

  return (
    <label className={style.label}>
      <input
        className={style.radio}
        type="radio"
        value={value}
        onChange={onChange}
      />
      <span className={style.text}> {label}</span>
    </label>
  );
};
