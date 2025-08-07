import styles from './cancel-order-modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { closeModal } from '../../redux/slice/cancel-order-slice.ts';
import { cancelOrder } from '../../redux/slice/order-slice.ts';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { Modal } from '../../hoc';

export const CancelOrderModal = () => {
  const orderId = useSelector(
    (state: RootState) => state.cancelOrderModal.orderId,
  );
  const dispatch = useDispatch<AppDispatch>();

  const onClickCancel = async () => {
    if (orderId) {
      try {
        const action = await dispatch(cancelOrder(orderId));
        unwrapResult(action);
        toast.success('Заказ успешно отменен');
        dispatch(closeModal());
      } catch {
        toast.error('Ошибка при отмене заказа');
      }
    }
  };
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
          <button className={styles.yesButton} onClick={onClickCancel}>
            да, отменить
          </button>
          <button
            className={styles.noButton}
            onClick={() => dispatch(closeModal())}
          >
            нет
          </button>
        </div>
      </div>
    </Modal>
  );
};
