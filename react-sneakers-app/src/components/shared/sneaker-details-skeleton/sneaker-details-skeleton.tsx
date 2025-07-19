import styles from '../../../pages/sneaker-details-page/sneaker-details-page.module.scss';

import { Skeleton } from '../../ui/skeleton/skeleton.tsx';

export const SneakerDetailsSkeleton = () => {
  return (
    <div className={styles.root}>
      <Skeleton style={{ marginTop: '49px', marginBottom: '7px' }} height={25} width="70%" borderRadius={5}/>
      <Skeleton style={{ marginBottom: '6px' }} height={25} width="20%" borderRadius={5}/>
      <Skeleton height={20} width="20%" borderRadius={5}/>

      <div className={styles.mainInfo}>
        <div className={styles.imgWrapper}>
          <Skeleton style={{ marginTop: '30px', marginBottom: '30px' }} width={499} height={350} borderRadius={10} />
        </div>
        <div className={styles.infoWrapper}>
          <Skeleton style={{marginBottom: '8px'}} height={28} width="20%" borderRadius={5}/>
          <Skeleton style={{marginBottom: '8px'}} height={28} width="20%" borderRadius={5} />
          <Skeleton style={{marginBottom: '8px'}} height={39} width="35%" borderRadius={5} />
          <Skeleton style={{ marginBottom: '18px' }} height={28} width="20%" borderRadius={5}/>
          <Skeleton style={{ marginBottom: '74px' }} height={105} width="100%" borderRadius={5}/>
          <Skeleton width="100%" height={55} borderRadius={10} />
        </div>
      </div>
    </div>
  );
}