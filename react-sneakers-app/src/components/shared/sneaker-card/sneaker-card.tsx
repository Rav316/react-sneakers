import styles from './sneaker-card.module.scss';
import * as React from 'react';
import clsx from 'clsx';

import favoritesIcon from '../../../assets/favorites/favorites-light.svg';
import selectedFavoritesIcon from '../../../assets/favorites/selected-favorites.svg';
import type { SneakerListItem } from '../../../service/model.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store.ts';
import {
  addFavoriteToLocalStorage,
  addToFavorites,
  removeFavoriteFromLocalStorage,
  removeFromFavorites,
} from '../../../redux/slice/favorite-slice.ts';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface Props {
  sneaker: SneakerListItem;
}

export const SneakerCard: React.FC<Props> = ({
  sneaker: { imageUrl, price, name, type, id, isFavorite },
}) => {
  const staticUrl: string = import.meta.env.VITE_STATIC_URL;

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const token = useSelector((state: RootState) => state.auth.token);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(false);

  useEffect(() => {
    setIsFavoriteLocal(token ? isFavorite : favorites.includes(id));
  }, [token, isFavorite, favorites, id]);

  const onClickFavorite = useDebouncedCallback(
    () => {
      if (!token) {
        if (isFavoriteLocal) {
          dispatch(removeFavoriteFromLocalStorage(id));
        } else {
          dispatch(addFavoriteToLocalStorage(id));
        }
      } else {
        if (isFavoriteLocal) {
          dispatch(removeFromFavorites(id));
        } else {
          dispatch(addToFavorites(id));
        }
      }
      setIsFavoriteLocal((prev) => !prev);
    },
    300,
    { leading: true, trailing: false },
  );

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.favoritesButton, {
          [styles.selected]: isFavoriteLocal,
        })}
        onClick={onClickFavorite}
      >
        <img
          src={isFavoriteLocal ? selectedFavoritesIcon : favoritesIcon}
          alt="favorites icon"
        />
      </div>
      <Link to={`/sneakers/${id}`}>
        <img src={`${staticUrl}${imageUrl}`} alt={'sneaker image'} />
      </Link>
      <span className={styles.name}>{`${type.name} ${name}`}</span>
      <div className={styles.priceInfo}>
        <div>
          <span className={styles.priceLabel}>ЦЕНА:</span>
          <span className={styles.price}>{price} руб.</span>
        </div>
      </div>
    </div>
  );
};
