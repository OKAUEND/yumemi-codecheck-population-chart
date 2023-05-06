import style from './checkbox.module.scss';

interface Props {
  label: string;
  checked: boolean;
  value: string | number;
  changeHandler: () => void;
}

export const CheckBox = ({ label, checked, value, changeHandler }: Props) => {
  return (
    <label className={style.label}>
      <input
        className={style.checkbox}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={changeHandler}
      />
      <span className={style.text}> {label}</span>
    </label>
  );
};
