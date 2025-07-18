import styles from './sneaker-details-page.module.scss';
import sneakerExampleImg from '../../assets/sneaker-example.jpg';
import { SneakerSizes } from '../../components/shared/sneaker-sizes/sneaker-sizes.tsx';
import { Button } from '../../components/ui/button/button.tsx';
import { SneakerCounter } from '../../components/shared/sneaker-counter/sneaker-counter.tsx';
import { useState } from 'react';

export const SneakerDetailsPage = () => {
  const [counter, setCounter] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const onClickMinus = () => {
    if (counter > 1) {
      setCounter((prev) => prev - 1);
    }
  };

  const onClickSize = (size: number) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  return (
    <div className={styles.root}>
      <h1>Nike SB Force 58 Premium Leather</h1>
      <h3>Мужские кроссовки</h3>
      <p>Совмещение баскетбольной прочности и скейтерской гибкости</p>

      <div className={styles.mainInfo}>
        <div className={styles.imgWrapper}>
          <img src={sneakerExampleImg} alt={'sneaker image'} />
        </div>
        <div className={styles.infoWrapper}>
          <span className={styles.sneakerInfo}>
            Бренд: <b>Nike</b>
          </span>
          <span className={styles.sneakerInfo}>
            Цена: <b>{7999 * counter} ₽</b>
          </span>
          <div className={styles.counterWrapper}>
            <span className={styles.sneakerInfo}>Количество:</span>
            <SneakerCounter
              counter={counter}
              onClickMinus={onClickMinus}
              onClickPlus={() => setCounter((prev) => prev + 1)}
            />
          </div>
          <span className={styles.sneakerInfo}>Размер:</span>
          <div className={styles.sizesWrapper}>
            <SneakerSizes
              availableSizes={[41, 42, 43, 46]}
              selectedSize={selectedSize}
              onClickSize={onClickSize}
            />
          </div>
          <Button content={'Добавить в корзину'} width={'100%'} />
        </div>
      </div>
    </div>
  );
};
