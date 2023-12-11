import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { format } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './ScheduleDtlModal.module.scss';



const ScheduleDtlModal = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [disabledEdit, setDisabledEdit] = useState(true);

  const dispatch = useDispatch();
  const textareaEl = useRef(null);

  const eventProps = useSelector((state) => state.modal.modals[0].data);

  useEffect(() => {
    if(eventProps) {
      setScheduleData(eventProps);
    }
  },[])

  useEffect(() => {
    if(!disabledEdit && textareaEl.current) {
      textareaEl.current.focus();
    }
  },[disabledEdit])

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'ScheduleDtlModal',
    }));
  }

  const formattedStartDate = useMemo(() => {
    const eventStartDate = new Date(eventProps.start);
    return format(eventStartDate, 'yyyy-MM-dd HH:mm');
  },[]);

  const formattedEndDate = useMemo(() => {
    const eventEndDate = new Date(eventProps.end);
    return format(eventEndDate, 'yyyy-MM-dd HH:mm');
  },[]);

  const onClickEdit = () => {
    setDisabledEdit(!disabledEdit);
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div className={!disabledEdit && styles.active}>
            <IconImage icon={"EDIT"} onClickEvent={onClickEdit} />
          </div>
          <div>{scheduleData.title}</div>
          <div className={styles.close} onClick={handleClose}>x</div>
        </div>
        <div className={styles.modal__date}>
          <div>
            <IconImage icon={'TIME'} />
            <div>
              <div>작업 시작 예정</div>
              {formattedStartDate}
            </div>
          </div>
          <div>
            <IconImage icon={'TIME'}/>
            <div>
              <div>작업 종료 예정</div>
              {formattedEndDate}
            </div>
          </div>
        </div>
        <div className={styles.modal__conts}>
          <textarea
            value={scheduleData.conts}
            disabled={disabledEdit}
            ref={textareaEl}
          />
        </div>
        <div className={styles.modal__btn}>
          <Button value={'닫기'} onClickEvent={handleClose} />
        </div>
      </div>
    </div>
  )
}

export { ScheduleDtlModal };

