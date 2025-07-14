import styles from "./form-input.module.scss";
import * as React from "react";

interface Props {
  id: string;
  placeholder: string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const FormInput: React.FC<Props> = ({
  id,
  placeholder,
  label,
  value,
  onChange,
}) => {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
