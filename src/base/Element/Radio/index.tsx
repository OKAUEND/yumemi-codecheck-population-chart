import styles from './radio.module.scss';

interface Props {
  label: string;
  value: string;
  checked: boolean;
  categories: string;
  changeHandler: (selected: string) => void;
}

export const Radio = ({
  label,
  value,
  checked,
  categories,
  changeHandler,
}: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(event.target.value);
  };

  return (
    <label className={styles.radio_group}>
      <input
        className={styles.radio}
        type="radio"
        value={value}
        name={categories}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.radio_text}> {label}</span>
    </label>
  );
};
