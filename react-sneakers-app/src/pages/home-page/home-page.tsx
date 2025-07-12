import styles from './home-page.module.scss';
import { Search } from "../../shared/search/search.tsx";
import { SneakerCard } from "../../shared/sneaker-card/sneaker-card.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store.ts";
import { useEffect } from "react";
import { fetchSneakers } from "../../redux/slice/sneaker-slice.ts";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sneakers = useSelector((state: RootState) => state.sneaker.sneakers);
  useEffect(() => {
    dispatch(fetchSneakers({}))
  }, [dispatch]);
  return (
    <div className={styles.root}>
      <div className={styles.titleWrapper}>
        <h1>Все кроссовки</h1>
        <Search/>
      </div>
      <div className={styles.sneakerCardsWrapper}>
        {
          sneakers.content.map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker}/>
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;