import styles from './sneaker-card-skeleton.module.scss';
import { Skeleton } from '../../../ui';

export const SneakerCardSkeleton = () => {
  return (
    <Skeleton height={300} borderRadius={20} className={styles.root}>
      <Skeleton height={200} borderRadius={20} />
      <Skeleton width={200} height={20} borderRadius={3} />

      <div className={styles.priceInfo}>
        <Skeleton width={150} height={15} borderRadius={3} />
        <Skeleton width={180} height={20} borderRadius={3} />
      </div>
    </Skeleton>
  );
};
