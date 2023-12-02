import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch } from 'react-redux';
import { openModal } from 'reduxStore/modalSlice';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);


const ScheduleCalendar = () => {
  const [taskSchedule, setTaskSchedule] = useState({});
  const [myEvents, setMyEvents] = useState([]);

  const dispatch = useDispatch();

  const events = [
    {
      title: '회의', // 일정 제목
      start: new Date(2023, 10, 29, 10, 0), // 시작 시간
      end: new Date(2023, 10, 29, 12, 0), // 종료 시간
      resource: 'dfasfdfasdfdasfffffffffffffffffffffff',
    },
    {
      title: '점심', // 일정 제목
      start: new Date(2023, 10, 2, 12, 0), // 시작 시간
      end: new Date(2023, 10, 2, 13, 0), // 종료 시간
      resource: 'dfsfsd'
    },
  ];

  const EventComponent = ({ event }) => (
    <div>
      <p>{event.title}</p>
      <p>{event.resource}</p>
    </div>
  );

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
    alert(event);
  }

  return (
    <DragAndDropCalendar
      style={{ height: 500 }}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      components={{
        event: EventComponent,
      }}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      selectable={true}
    />
  )
}


export { ScheduleCalendar };
