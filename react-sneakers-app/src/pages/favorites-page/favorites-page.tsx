import styles from './favorites-page.module.scss';
import arrowBackIcon from '../../assets/arrow-back/arrow-back-alt.svg';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useEffect } from 'react';
import {
  fetchFavoriteSneakers,
  fetchSneakersByIds,
  removeAllFavorites
} from '../../redux/slice/sneaker-favorites-slice.ts';
import { SneakerCard } from '../../components/shared/sneaker-card/sneaker-card.tsx';
import { useNavigate } from 'react-router';
import { SneakerCardSkeleton } from '../../components/shared/sneaker-card/skeleton/sneaker-card-skeleton.tsx';
import { ErrorResult } from '../../components/shared/error-result/error-result.tsx';
import { EmptyFavorites } from '../../components/shared/empty-favorites/empty-favorites.tsx';
import { TrashIcon } from '../../components/ui/trash-icon.tsx';
import { clearFavorites } from '../../redux/slice/favorite-slice.ts';

export const FavoritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const {items, loading, error} = useSelector((state: RootState) => state.sneakerFavorites);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const onClickClearFavorites = () => {
    if(token) {
      dispatch(removeAllFavorites());
    } else {
      dispatch(clearFavorites());
    }
  };

  useEffect(() => {
    if(token) {
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
  if(!loading && items.length === 0) {
    return (
      <div className={styles.root}>
        <EmptyFavorites />
      </div>
    )
  }
  return (
    <div className={styles.root}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <div className={styles.backButton} onClick={() => navigate(-1)}>
            <img src={arrowBackIcon} alt={'arrow back icon'} />
          </div>
          <h1>Мои закладки</h1>
        </div>
        <div className={styles.clearFavorites} onClick={onClickClearFavorites}>
          <span>Очистить закладки</span>
          <TrashIcon/>
        </div>

      </div>
      <div className={styles.sneakerCardsWrapper}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <SneakerCardSkeleton key={index} />
          ))
          : items.map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
      </div>
    </div>
  )
}