import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { insertTaskScheduleAPI } from 'pages/api/Task/TaskAPI';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from 'reduxStore/modalSlice';
import styles from './InsertTaskScheduleModal.module.scss';

const InsertTaskScheduleModal = () => {
  const [scheduleInputInfo, setScheduleInputInfo] = useState({
    sch_title    : '',
    sch_contents : '',
    sch_st_dt    : '',
    sch_ed_dt    : '',
    sch_st_tm    : '',
    sch_ed_tm    : '',
  });

  const dispatch = useDispatch();

  const slotInfoProps = useSelector((state) => state.modal.modals[0].data);
  const entpInfoProps = useSelector((state) => state.modal?.data);

  useEffect(() => {
    formatDateFn();
  },[])

  useEffect(() => {
    if(entpInfoProps) {
      setScheduleInputInfo({...scheduleInputInfo, entp_unq: entpInfoProps.entp_unq});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[useSelector((state) => state.modal)])

  const formatDateFn = () => {
    const startDate = new Date(slotInfoProps.slots[0]);
    const endDate   = new Date(slotInfoProps.slots[slotInfoProps.slots.length -1]);

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
    year : 'numeric',
    month: 'long',
    day  : 'numeric',
  }).format(new Date(slotInfoProps.slots[0]));

  const formattedEndDate = new Intl.DateTimeFormat('ko-KR', {
    year : 'numeric',
    month: 'long',
    day  : 'numeric',
  }).format(new Date(slotInfoProps.slots[slotInfoProps.slots.length - 1]));

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'InsertTaskScheduleModal',
    }));
  }

  const onClickInsertSchedule = () => {

    if(!entpInfoProps.entp_nm) {
      alert('업체를 조회해주세요');
      return;
    }else if(!scheduleInputInfo.sch_title || !scheduleInputInfo.sch_contents) {
      alert('제목 또는 내용을 입력해주세요');
      return;
    }

    const confirmed = window.confirm('일정 등록을 하시겠습니까?');

    if(confirmed) {
      insertTaskScheduleAPI(scheduleInputInfo).then((response) => {
        alert('일정 등록 완료');
        handleClose();
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      })
    }
  }

  const onChangeContents = (e, name) => {
    setScheduleInputInfo({...scheduleInputInfo, [name] : e.target.value});
  }

  const onClickSearchEntp = (modalType) => {
    dispatch(
      openModal({
        modalType : modalType,
        isOpen    : true,
        data: {},
      })
    );
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
        <div className={styles.modal__search}>
          <div>
            <IconImage icon={'ENTERPRISE'}/>
          </div>
          <div>
            <div>{entpInfoProps && entpInfoProps.entp_nm}</div>
            <Button value={'업체조회'} backgroundColor={'blue'} onClickEvent={() => onClickSearchEntp('SearchEntpModal')}/>
          </div>
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

export { InsertTaskScheduleModal };
