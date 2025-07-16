import styles from './error-page.module.scss';
import { Button } from '../../components/ui/button/button.tsx';
import { Link } from 'react-router';
import * as React from 'react';

interface Props {
  title: string;
  description: string;
  image: string;
}

export const ErrorPage: React.FC<Props> = ({ title, description, image }) => {
  return (
    <div className={styles.root}>
      <div className={styles.textWrapper}>
        <h1>{title}</h1>
        <span>{description}</span>
        <div className={styles.buttonWrapper}>
          <Link to={'/'}>
            <Button content={'На главную'} width={'auto'} height={'auto'} />
          </Link>
          <Button
            content={'Обновить'}
            width={'auto'}
            height={'auto'}
            alt={true}
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
      <img src={image} alt={'error image'} />
    </div>
  );
};
