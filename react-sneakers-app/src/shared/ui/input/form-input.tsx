import styles from './form-input.module.scss';
import * as React from "react";

interface Props {
  id: string;
  placeholder: string;
  label?: string;
}

export const FormInput: React.FC<Props> = ({id, placeholder, label}) => {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}
      </label>
      <input id={id} placeholder={placeholder}/>
    </div>
  )
}