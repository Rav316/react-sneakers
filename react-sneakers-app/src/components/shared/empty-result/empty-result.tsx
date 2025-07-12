import * as React from "react";
import styles from './empty-result.module.scss';

export const EmptyResult: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>😔</h1>
      <span>По заданным фильтрам ничего не найдено</span>
    </div>

  )
}