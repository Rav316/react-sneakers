import * as React from "react";
import styles from './button.module.scss';
import clsx from "clsx";

interface Props {
  content: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  alt?: boolean;
}

export const Button: React.FC<Props> = ({content, width = 325, height = 55, onClick, alt}) => {
  return (
    <button className={clsx({[styles.alt]: alt})} style={{width, height}} onClick={onClick}>{content}</button>
  )
}