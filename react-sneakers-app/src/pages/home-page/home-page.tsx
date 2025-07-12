import styles from './home-page.module.scss';
import { Search } from "../../components/shared/search/search.tsx";
import { SneakerCard } from "../../components/shared/sneaker-card/sneaker-card.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store.ts";
import { useEffect } from "react";
import { fetchSneakers } from "../../redux/slice/sneaker-slice.ts";
import { SneakerCardSkeleton } from "../../components/shared/sneaker-card/skeleton/sneaker-card-skeleton.tsx";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sneakers, loading } = useSelector(
    (state: RootState) => state.sneaker,
  );
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
          loading ? (
            Array.from({length: 6}).map((_, index) => (
              <SneakerCardSkeleton key={index}/>
            ))
          ) : (
            sneakers.content.map((sneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker}/>
            ))
          )
        }
      </div>
    </div>
  );
};

export default HomePage;