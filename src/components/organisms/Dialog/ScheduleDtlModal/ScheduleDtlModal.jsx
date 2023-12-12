import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './ScheduleDtlModal.module.scss';
import { updateTaskScheduleAPI } from 'pages/api/Task/TaskAPI';



const ScheduleDtlModal = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [disabledEdit, setDisabledEdit] = useState(true);

  const dispatch = useDispatch();
  const textareaEl = useRef(null);

  const eventProps = useSelector((state) => state.modal.modals[0].data);
  const eventProps2 = useSelector((state) => state.modal.modals);
console.log("eventProps2 = ", eventProps2);
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

  const formatForDatePickerFn = (date) =>{
    return moment(date, 'YYYY-MM-DD HH:mm').toDate();
  }

  const formattedStartDate = useMemo(() => {
    const eventStartDate = new Date(eventProps.start);
    return format(eventStartDate, 'yyyy-MM-dd HH:mm');
  },[]);

  const formattedEndDate = useMemo(() => {
    const eventEndDate = new Date(eventProps.end);
    return format(eventEndDate, 'yyyy-MM-dd HH:mm');
  },[]);

  useEffect(() => {
    setScheduleData({...eventProps,
      start: formatForDatePickerFn(formattedStartDate),
      end  : formatForDatePickerFn(formattedEndDate),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[formattedStartDate, formattedEndDate])

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'ScheduleDtlModal',
      data: [scheduleData.start, scheduleData.end],
    }));
  }

  const onClickEdit = () => {
    setDisabledEdit(!disabledEdit);
  }

  const handleDateChange = (props, date) => {
    if(props === 'start') {
      setScheduleData({...scheduleData, start: formatForDatePickerFn(date)});
    }else if(props === 'end') {
      setScheduleData({...scheduleData, end: formatForDatePickerFn(date)});
    }
  }

  const onChangeEvent = (name, value) => {
    setScheduleData({...scheduleData, [name]: value});
  }

  const onClickModify = () => {

    const newScheduleData = scheduleData;
    newScheduleData['flag'] = 'U';
    newScheduleData['sch_title'] = scheduleData.title;
    newScheduleData['sch_contents'] = scheduleData.conts;

    const eventStartDate = new Date(scheduleData.start);
    const eventEndDate = new Date(scheduleData.end);
    newScheduleData['sch_st_dt'] = format(eventStartDate, 'yyyy-MM-dd');
    newScheduleData['sch_ed_dt'] = format(eventEndDate, 'yyyy-MM-dd');
    newScheduleData['sch_st_tm'] = format(eventStartDate, 'HH:mm');
    newScheduleData['sch_ed_tm'] = format(eventEndDate, 'HH:mm');

    const confirmed = window.confirm('변경사항을 저장하시겠습니까?');

    if(confirmed) {
      updateTaskScheduleAPI(newScheduleData).then((response) => {
        alert('일정 변경이 완료되었습니다.');
        dispatch(closeModal({
          modalTypeToClose: 'ScheduleDtlModal',
        }));
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });
    }

  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div className={!disabledEdit && styles.active}>
            <IconImage icon={"EDIT"} onClickEvent={onClickEdit} />
          </div>
          <input
            value    = {scheduleData.title}
            onChange = {(e)=>onChangeEvent('title', e.target.value)}
            disabled = {disabledEdit}
          />
          <div className={styles.close} onClick={handleClose}>x</div>
        </div>
        <div className={styles.modal__date}>
          <label>
            <IconImage icon={'CALENDAR'} />
            <div>
              <div>작업 시작 예정</div>
              <DatePicker
                selected      = {scheduleData.start}
                timeFormat    = "HH:mm"
                timeIntervals = {10}
                dateFormat    = "yyyy-MM-dd HH:mm"
                timeCaption   = "Time"
                disabled      = {disabledEdit}
                onChange      = {(date)=>handleDateChange('start', date)}
                showTimeSelect
              />
            </div>
          </label>
          <label>
            <IconImage icon={'CALENDAR'}/>
            <div>
              <div>작업 종료 예정</div>
              <DatePicker
                selected      = {scheduleData.end}
                timeFormat    = "HH:mm"
                timeIntervals = {10}
                dateFormat    = "yyyy-MM-dd HH:mm"
                timeCaption   = "Time"
                disabled      = {disabledEdit}
                onChange      = {(date)=>handleDateChange('end', date)}
                showTimeSelect
              />
            </div>
          </label>
        </div>
        <div className={styles.modal__conts}>
          <textarea
            ref      = {textareaEl}
            value    = {scheduleData.conts}
            onChange = {(e)=>onChangeEvent('conts', e.target.value)}
            disabled = {disabledEdit}
          />
        </div>
        <div className={styles.modal__btn}>
          <Button value={'저장'} onClickEvent={onClickModify}/>
          <Button value={'닫기'} onClickEvent={handleClose} />
        </div>
      </div>
    </div>
  )
}

export { ScheduleDtlModal };

