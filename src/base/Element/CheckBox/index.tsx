import style from './checkbox.module.scss';

interface Props {
  label: string;
  checked: boolean;
  name: string;
  changeHandler: () => void;
}

export const CheckBox = ({ label, checked, name, changeHandler }: Props) => {
  return (
    <label className={style.label}>
      <input
        className={style.checkbox}
        type="checkbox"
        value={name}
        checked={checked}
        onChange={changeHandler}
      />
      <span className={style.text}> {label}</span>
    </label>
  );
};
