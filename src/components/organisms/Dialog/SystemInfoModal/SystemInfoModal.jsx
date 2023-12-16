import { IconImage } from 'components/atoms';
import { useDispatch } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './SystemInfoModal.module.scss';



const SystemInfoModal = () => {

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'SystemInfoModal',
    }));
  }


  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div></div>
          <div>시스템 정보</div>
          <div className={styles.close} onClick={handleClose}>
            <IconImage icon={'CLOSE'} onClickEvent={handleClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

export { SystemInfoModal };
