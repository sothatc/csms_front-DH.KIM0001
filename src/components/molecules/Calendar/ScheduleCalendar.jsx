import { Button } from 'components/atoms/Button/Button';
import { format, parseISO } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';
import { getTaskScheduleListAPI } from 'pages/api/Task/TaskAPI';
import { useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from 'reduxStore/modalSlice';
import styles from './ScheduleCalendar.module.scss';

moment.locale('ko');
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);


const ScheduleCalendar = () => {
  const [taskSchedules, setTaskSchedules] = useState([]);

  const dispatch = useDispatch();

  const reRendering = useSelector((state) =>state);

  const FormatingcurrentDate = () => {
    const date  = new Date();
    const year  = date.getFullYear();
    const month = date.getMonth()+1;

    const dateString    = `${year}-${month}`;
    const parseISODate  = parseISO(dateString);
    const formattedDate = format(parseISODate, 'yyyy-MM');

    return formattedDate;
  }

  useEffect(() => {
    getTaskScheduleListAPI(FormatingcurrentDate()).then((response) => {
      setTaskSchedules(response);
    })
    .catch((err) => {
      alert(`Axios Error: ${err}`);
    });
  },[reRendering])

  const events = useMemo(() => (
    taskSchedules.map((taskSchedule) => ({
      id       : taskSchedule.sch_unq,
      title    : taskSchedule.sch_title,
      start    : new Date(`${taskSchedule.sch_st_dt}T${taskSchedule.sch_st_tm}`),
      end      : new Date(`${taskSchedule.sch_ed_dt}T${taskSchedule.sch_ed_tm}`),
      resource : taskSchedule.sch_contents,
    }))
  ), [taskSchedules])

  const handleSelectSlot = (slotInfo) => {
    dispatch(
      openModal({
        modalType : 'InsertTaskScheduleModal',
        isOpen    : true,
        data      : slotInfo,
      })
    )
  }

  const handleSelectEvent = (event) => {
    const eventData = {
      id   : event.id,
      start: event.start,
      end  : event.end,
      conts: event.resource,
      title: event.title
    };

    dispatch(
      openModal({
        modalType : 'ScheduleDtlModal',
        isOpen    : true,
        data      : eventData,
      })
    )
  }


  const EventComponent = ({ event }) => (
    <div className={styles.event}>
      <p>{event.title}</p>
      <p>{event.resource}</p>
    </div>
  );

  const CustomToolbar = ({label, onNavigate, onView}) => {

    return (
      <div className={styles.toolbar}>
        <div>
          <div>{label}</div>
          <Button image={'ARROW-LEFT'} onClickEvent={()=>onNavigate('PREV')}/>
          <Button image={'ARROW-RIGHT'} onClickEvent={()=>onNavigate('NEXT')}/>
        </div>
        <div>
          <Button value={'Today'} onClickEvent={()=>onNavigate('TODAY')}/>
          <div>
            <Button value={'월별'} onClickEvent={()=>onView('month')}/>
            <Button value={'일별'} onClickEvent={()=>onView('day')}/>
            <Button value={'일정'} onClickEvent={()=>onView('agenda')}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DragAndDropCalendar
      style         = {{ height: 500 }}
      localizer     = {localizer}
      events        = {events}
      startAccessor = "start"
      endAccessor   = "end"
      onSelectSlot  = {handleSelectSlot}
      onSelectEvent = {handleSelectEvent}
      selectable    = {true}
      components = {{
        event: EventComponent,
        toolbar: CustomToolbar,
      }}
    />
  )
}


export { ScheduleCalendar };

