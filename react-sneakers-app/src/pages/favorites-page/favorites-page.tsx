import styles from './favorites-page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useEffect } from 'react';
import {
  fetchFavoriteSneakers,
  fetchSneakersByIds,
  removeAllFavorites,
} from '../../redux/slice/sneaker-favorites-slice.ts';
import { clearFavorites } from '../../redux/slice/favorite-slice.ts';
import {
  EmptyFavorites,
  ErrorResult,
  SneakerCard,
  SneakerCardSkeleton,
} from '../../components/shared';
import { ArrowBack, TrashIcon } from '../../components/ui';
import { FadeContent } from '../../hoc';

const FavoritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { items, loading, error } = useSelector(
    (state: RootState) => state.sneakerFavorites,
  );
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const onClickClearFavorites = () => {
    if (token) {
      dispatch(removeAllFavorites());
    } else {
      dispatch(clearFavorites());
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchFavoriteSneakers());
    } else {
      dispatch(fetchSneakersByIds(favorites ?? []));
    }
  }, [token, dispatch, favorites]);
  if (error) {
    return (
      <div className={styles.root}>
        <ErrorResult />
      </div>
    );
  }
  if (!loading && items.length === 0) {
    return (
      <div className={styles.root}>
        <EmptyFavorites />
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <ArrowBack />
          <h1>Мои закладки</h1>
        </div>
        <div className={styles.clearFavorites} onClick={onClickClearFavorites}>
          <span>Очистить закладки</span>
          <TrashIcon />
        </div>
      </div>
      <div className={styles.sneakerCardsWrapper}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SneakerCardSkeleton key={index} />
            ))
          : items.map((sneaker) => (
              <FadeContent key={sneaker.id}>
                <SneakerCard sneaker={sneaker} />
              </FadeContent>
            ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
