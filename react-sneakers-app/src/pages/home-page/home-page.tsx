import styles from './home-page.module.scss';
import { Search } from "../../shared/search/search.tsx";
import { SneakerCard } from "../../shared/sneaker-card/sneaker-card.tsx";

const HomePage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.titleWrapper}>
        <h1>Все кроссовки</h1>
        <Search/>
      </div>
      <div className={styles.sneakerCardsWrapper}>
        <SneakerCard/>
        <SneakerCard/>
        <SneakerCard/>
        <SneakerCard/>
        <SneakerCard/>
        <SneakerCard/>
      </div>
    </div>
  );
};

export default HomePage;