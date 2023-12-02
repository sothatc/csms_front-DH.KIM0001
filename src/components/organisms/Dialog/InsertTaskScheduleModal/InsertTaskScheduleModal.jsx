import { useDispatch, useSelector } from 'react-redux';
import styles from './InsertTaskScheduleModal.module.scss';
import { closeModal } from 'reduxStore/modalSlice';
import { Button } from 'components/atoms/Button/Button';
import { IconImage } from 'components/atoms';
import { useEffect, useState } from 'react';
import { insertTaskScheduleAPI } from 'pages/api/Task/TaskAPI';

const InsertTaskScheduleModal = () => {
  const [scheduleInfo     , setScheduleInfo     ] = useState([]);
  const [scheduleInputInfo, setScheduleInputInfo] = useState({
    sch_title    : '',
    sch_contents : '',
    sch_st_dt    : '',
    sch_ed_dt    : '',
    sch_st_tm    : '',
    sch_ed_tm    : '',
  });

  const dispatch = useDispatch();

  const slotInfo = useSelector((state) => state.modal.data);

  useEffect(() => {
    formatDateFn();
  },[])

  const formatDateFn = () => {
    const startDate = new Date(slotInfo.slots[0]);
    const endDate   = new Date(slotInfo.slots[slotInfo.slots.length -1]);

    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
    const startDay = String(startDate.getDate()).padStart(2, '0');
    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;

    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
    const endDay = String(endDate.getDate()).padStart(2, '0');
    const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;

    setScheduleInputInfo({...scheduleInputInfo,
      sch_st_dt: formattedStartDate,
      sch_ed_dt: formattedEndDate,
    })
  }


  const formattedStartDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(slotInfo.slots[0]));

  const formattedEndDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(slotInfo.slots[slotInfo.slots.length - 1]));

  const handleClose = () => {
    dispatch(closeModal({
      // data:
    }))
  }

  const onClickInsertSchedule = () => {

    const confirmed = window.confirm('일정 등록을 하시겠습니까?');

    if(confirmed) {
      insertTaskScheduleAPI(scheduleInputInfo).then((response) => {
        alert('등록 완료.');
        dispatch(closeModal());
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      })
    }
  }

  const onChangeContents = (e, name) => {
    setScheduleInputInfo({...scheduleInputInfo, [name] : e.target.value});
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div></div>
          <div>일정 등록</div>
          <div className={styles.close} onClick={handleClose}>x</div>
        </div>
        <div className={styles.modal__date}>
          <IconImage icon={'CALENDAR'}/>
          {formattedStartDate} - {formattedEndDate}
          <input type='time' max='23:59:59' onChange={(e)=>onChangeContents(e, 'sch_st_tm')}/>
          <div>~</div>
          <input type='time' max='23:59:59' onChange={(e)=>onChangeContents(e, 'sch_ed_tm')}/>
        </div>
        <div className={styles.modal__contents}>
          <input placeholder='일정 제목' onChange={(e)=>onChangeContents(e, 'sch_title')}/>
          <textarea placeholder='일정 내용' onChange={(e)=>onChangeContents(e, 'sch_contents')}/>
        </div>
        <div className={styles.modal__btn}>
          <Button value={'등록'} onClickEvent={onClickInsertSchedule} />
          <Button value={'취소'} onClickEvent={handleClose} />
        </div>
      </div>
    </div>
  )
}

export {InsertTaskScheduleModal};