import styles from './search.module.scss';

export const Search = () => {
  return (
    <input className={styles.searchInput} placeholder={'Поиск...'}/>
  );
};