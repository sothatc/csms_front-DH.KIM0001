import { IconImage } from 'components/atoms';
import { useDispatch } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './SystemInfoModal.module.scss';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';



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
        <div className={styles.modal__servers}>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLV
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
        </div>
        <div className={styles.modal__content}>
          <div>
            <div>서버 Hostname</div>
            <input />
          </div>
          <div>
            <div>서버 IP</div>
            <input />
          </div>
          <div>
            <div>서버 용도</div>
            <input />
          </div>
          <div>
            <div>Kernel</div>
            <input />
          </div>
          <div>
            <div>GPU Model</div>
            <input />
          </div>
          <div>
            <div>기본경로</div>
            <input />
          </div>
          <div>
            <div>로그경로</div>
            <input />
          </div>
          <div>
            <div>
              <div>사용 여부</div>
              <Select />
            </div>
            <div>
              <div>학습 사용</div>
              <Select />
            </div>
            <div>
              <div>리소스 사용</div>
              <Select />
            </div>
          </div>
          <div>
            <div>Memory</div>
            <input />
          </div>
          <div>
            <div>Disk</div>
            <input />
          </div>
        </div>
        <div className={styles.modal__btn}>
          <Button value={'닫기'}/>
        </div>
      </div>
    </div>
  )
}

export { SystemInfoModal };
