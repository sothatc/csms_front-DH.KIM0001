import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './CustAddModal.module.scss';

const CustAddModal = () => {

  const isOpen = useSelector((state) => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleClose = () => {
    // dispatch(closeModal());
    dispatch(closeModal({
      modalTypeToClose: 'CustAddModal',
    }));
  }


  return(
    <div className={styles.background}>
      <div className={styles.modal}>
        담당자 추가 모달
        <div onClick={handleClose}>닫기</div>
      </div>
    </div>
  )
}

export {CustAddModal};