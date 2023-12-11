import { IconImage } from 'components/atoms';
import { ScheduleCalendar } from 'components/molecules/Calendar/ScheduleCalendar';
import { getTaskDataListAPI } from 'pages/api/Task/TaskAPI';
import { TaskJobTypeObject, TaskTypeObject } from 'pages/api/TaskTypeObject';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const HeaderName = {
  icon        : '',
  task_st_dt  : "작업일",
  entp_nm     : "업체",
  task_job_tp : "지원 유형",
  task_tp     : "작업방식",
  task_usr_nm : "담당자",
}

const HomePage = () => {
  const [taskDataList  , setTaskDataList  ] = useState([]);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [requestData   , setRequestData   ] = useState({
    entp_nm   : '',
    task_tp   : '',
    noDate    : true,
    limit_num : 20,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getTaskDataListAPI(requestData).then((response) => {
      const updatedTaskDataList = [...response.taskList];

			updatedTaskDataList.forEach(task => {
				task.task_tp     = TaskTypeObject[`${task.task_tp}`];
				task.task_job_tp = TaskJobTypeObject[`${task.task_job_tp}`];
			});

			setTaskDataList(updatedTaskDataList);
    })
    .catch((err) => {
      alert(`Axios Error: ${err}`);
    })

    /** calculate Scroll Bar */
    const element = document.querySelector('.homepage__job--list');
    if (element) {
      const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;
      const scrollbarWidth = hasVerticalScrollbar ? element.offsetWidth - element.clientWidth : 0;

      if(hasVerticalScrollbar) {
        setScrollbarWidth(scrollbarWidth);
      }
    }
  },[])

  const onClickMoveToTaskDtl = (task_unq) => {
    navigate(`/task/detail?task_unq=${task_unq}`);
  }

  const HeaderValuesDiv = () => {
    const headerValues = Object.values(HeaderName).map((value, idx) => (
      <div key={idx}>{value}</div>
    ));

    return headerValues;
  };

  return (
    <div className='homepage'>
      <div></div>
      <div>
        <div className='homepage__job'>
          <div>{`최근 작업 내역 ${requestData.limit_num}건`}</div>
          <div style={{width:`calc(100% - ${scrollbarWidth}px)`}}>
            {HeaderValuesDiv()}
          </div>
          <div className='homepage__job--list'>
            {taskDataList.length > 0 ?
              taskDataList.map((task, key) => (
                <div key={key} onClick={() => onClickMoveToTaskDtl(task.task_unq)}>
                  <div>
                    {task.task_tp === '정기점검' &&
                      <IconImage icon={'CHECK'} />
                    }
                    {task.task_tp === '이슈' &&
                      <IconImage icon={'ERRORICON'} />
                    }
                  </div>
                  <div>{task.task_st_dt}</div>
                  <div>{task.entp_nm}</div>
                  <div>{task.task_tp}</div>
                  <div>{task.task_job_tp}</div>
                  <div>{task.task_usr_nm}</div>
                </div>
              ))
              : null
            }
          </div>
        </div>
        <div className='homepage__calendar'>
          <div>유지보수 일정</div>
          <div>
            <ScheduleCalendar />
          </div>
        </div>
        <div className='homepage__etc'>
          <div>지원 유형 그래프</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;