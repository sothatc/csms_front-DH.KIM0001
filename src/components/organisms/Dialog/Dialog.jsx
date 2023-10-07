import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import { useState } from 'react';
import styles from './Dialog.module.scss';
import { Button } from 'components/atoms/Button/Button';

const PopUpModal = () => {
  const [compCode, setCompCode] = useState('C');

  const isOpen = useSelector((state) => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  }

  const onClickCompObjectSel = (code) => {
    setCompCode(code);
  }

  return (
    isOpen && (
      <div className={styles.background}>
        <div className={styles.modal}>
          <div className={styles.modal__title}>
            <div>업체 등록</div>
            <div className={styles.close} onClick={handleClose}>
              x
            </div>
          </div>
          <div className={styles.modal__conts}>
            <div className={`${styles['modal__conts--sel']}`}>
              <div className={compCode === 'C' ? styles.active : ''} onClick={() => onClickCompObjectSel('C')}>고객사</div>
              <div className={compCode === 'S' ? styles.active : ''} onClick={() => onClickCompObjectSel('S')}>협력사</div>
            </div>
            <div className={`${styles['modal__conts--name']}`}>
              <div className={`${styles.margin} ${styles['font--bold']}`}>업체명</div>
              <input />
            </div>
            <div className={`${styles['modal__conts--charge']}`}>
              <span className={`${styles['font--bold']}`}>담당자</span>
              <input />
              <span className={`${styles['font--bold']}`}>연락처</span>
              <input />
              <span className={`${styles['font--bold']}`}>이메일</span>
              <input />
            </div>
            {compCode === 'C' ?
            <>
              <div className={`${styles['modal__conts--service']}`}>
                <div className={`${styles.margin} ${styles['font--bold']}`}>서비스 형태</div>
                <div>
                  <input type='checkbox' id='real' name='real'/>
                  <label for='real'>실시간</label>
                  <input type='checkbox' id='semi-real' name='semi-real'/>
                  <label for='semi-real'>준실시간</label>
                  <input type='checkbox' id='batch' name='batch'/>
                  <label for='batch'>배치</label>
                </div>
              </div>
              <div className={`${styles['modal__conts--month']}`}>
                <span className={`${styles['font--bold']}`}>월 STT처리건수</span>
                <input />
              </div>
              <div className={`${styles['modal__conts--daliy']}`}>
                <span className={`${styles['font--bold']}`}>일 STT처리건수</span>
                <input />
              </div>
            </>
            :
            <>
              <div className={`${styles['modal__conts--client']}`}>
                <div>고객사</div>
                <input />
              </div>
            </>
            }
            <div className={`${styles['modal__conts--etc']}`}>
              <div className={`${styles.margin} ${styles['font--bold']}`}>비고</div>
              <textarea />
            </div>
            <div className={`${styles['modal__conts--btn']}`}>
              <Button value={'등록'}/>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export {PopUpModal};