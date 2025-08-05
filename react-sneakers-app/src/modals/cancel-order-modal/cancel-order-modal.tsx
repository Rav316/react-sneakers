import styles from './cancel-order-modal.module.scss';
import { Modal } from '../../hoc/modal/modal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { closeModal } from '../../redux/slice/cancel-order-slice.ts';


export const CancelOrderModal = () => {
  const orderId = useSelector((state: RootState) => state.cancelOrderModal.orderId);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Modal>
      <div className={styles.root}>
        <h3 className={styles.title}>Отмена заказа</h3>
        <span>Вы уверены, что хотите отменить заказ #{orderId}?</span>
        <p>
          Если у вас возникли вопросы, напишите на почту поддержки
          reactSneaker@support.com
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.yesButton}>да, отменить</button>
          <button
            onClick={() => dispatch(closeModal())}
            className={styles.noButton}
          >
            нет
          </button>
        </div>
      </div>
    </Modal>
  );
};
