import * as React from "react";
import styles from './empty-result.module.scss';

import pensiveFace from "../../../assets/pensive-face.png";

export const EmptyResult: React.FC = () => {
  return (
    <div className={styles.root}>
      <img src={pensiveFace} alt={"pensive face"}/>
      <span>По заданным фильтрам ничего не найдено</span>
    </div>

  )
}