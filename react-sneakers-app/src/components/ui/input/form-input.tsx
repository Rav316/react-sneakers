import styles from './form-input.module.scss';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  id?: string;
  name: string;
  placeholder: string;
  label?: string;
  type?: 'text' | 'password';
}

export const FormInput: React.FC<Props> = ({
  id,
  name,
  placeholder,
  label,
  type = 'text',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;
  return (
    <div className={styles.root}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <input
        id={id || name}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
