import styles from "./sneaker-card.module.scss";
import * as React from "react";
import clsx from "clsx";

import favoritesIcon from "../../assets/favorites/favorites-light.svg";
import selectedFavoritesIcon from "../../assets/favorites/selected-favorites.svg";
import sneakerExampleImg from "../../assets/sneaker-example.png";
import plusIcon from "../../assets/plus.svg";
import checkIcon from "../../assets/check.svg";

export const SneakerCard = () => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);

  const onClickAddToCart = () => {
    setInCart((prev) => !prev);
  };

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.favoritesButton, {
          [styles.selected]: isFavorite,
        })}
        onClick={() => setIsFavorite((prev) => !prev)}
      >
        <img
          src={isFavorite ? selectedFavoritesIcon : favoritesIcon}
          alt="favorites icon"
        />
      </div>
      <img src={sneakerExampleImg} alt={"sneaker image"} />
      <span>Мужские Кроссовки Nike Blazer Mid Suede</span>
      <div className={styles.priceInfo}>
        <div>
          <span className={styles.priceLabel}>ЦЕНА:</span>
          <span className={styles.price}>12 999 руб.</span>
        </div>
        <div
          className={clsx(styles.cartButton, { [styles.selected]: inCart })}
          onClick={onClickAddToCart}
        >
          <img src={inCart ? checkIcon : plusIcon} alt={"add to cart"} />
        </div>
      </div>
    </div>
  );
};
