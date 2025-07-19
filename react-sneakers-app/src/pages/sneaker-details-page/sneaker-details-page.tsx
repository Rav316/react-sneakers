import styles from './sneaker-details-page.module.scss';
import img404 from '../../assets/404.svg';
import { SneakerSizes } from '../../components/shared/sneaker-sizes/sneaker-sizes.tsx';
import { Button } from '../../components/ui/button/button.tsx';
import { SneakerCounter } from '../../components/shared/sneaker-counter/sneaker-counter.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { fetchSneakerDetails } from '../../redux/slice/sneaker-details-slice.ts';
import { useParams } from 'react-router';
import { SneakerDetailsSkeleton } from '../../components/shared/sneaker-details-skeleton/sneaker-details-skeleton.tsx';
import { ErrorPage } from '../error-page/error-page.tsx';

export const SneakerDetailsPage = () => {
  const staticUrl: string = import.meta.env.VITE_STATIC_URL;
  const params = useParams();

  const [counter, setCounter] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { sneaker, loading, error } = useSelector(
    (state: RootState) => state.sneakerDetails,
  );

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

  useEffect(() => {
    dispatch(fetchSneakerDetails(Number(params.id)));
  }, [dispatch, params.id]);

  if (error) {
    return (
      <ErrorPage
        image={img404}
        title={'Страница не найдена'}
        description={
          'Проверьте корректность введённого адреса или повторите попытку позже'
        }
      />
    );
  }

  return (
    <>
      {loading ? (
        <SneakerDetailsSkeleton />
      ) : (
        <div className={styles.root}>
          <h1>{sneaker.name}</h1>
          <h3>{sneaker.type.name}</h3>
          <p>{sneaker.description}</p>

          <div className={styles.mainInfo}>
            <div className={styles.imgWrapper}>
              <img
                src={`${staticUrl}${sneaker.imageUrl}`}
                alt={'sneaker image'}
              />
            </div>
            <div className={styles.infoWrapper}>
              <span className={styles.sneakerInfo}>
                Бренд: <b>{sneaker.firm}</b>
              </span>
              <span className={styles.sneakerInfo}>
                Цена: <b>{sneaker.price * counter} ₽</b>
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
                  availableSizes={sneaker.items.map((item) => item.size)}
                  selectedSize={selectedSize}
                  onClickSize={onClickSize}
                />
              </div>
              <Button content={'Добавить в корзину'} width={'100%'} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
