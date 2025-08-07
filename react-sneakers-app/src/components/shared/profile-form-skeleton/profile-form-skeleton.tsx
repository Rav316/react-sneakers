import styles from './profile-form-skeleton.module.scss';
import { Skeleton } from '../../ui';

export const ProfileFormSkeleton = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Skeleton height={50} borderRadius={10} />
        <Skeleton height={50} borderRadius={10} />
      </div>
      <div className={styles.wrapper}>
        <Skeleton height={50} borderRadius={10} />
        <Skeleton height={50} borderRadius={10} />
      </div>
      <Skeleton style={{ marginTop: '40px' }} height={50} borderRadius={10} />
    </>
  );
};
