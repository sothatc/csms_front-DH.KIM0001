import { ScheduleCalendar } from 'components/molecules/Calendar/ScheduleCalendar';
import { getTaskDataListAPI } from 'pages/api/Task/TaskAPI';
import { TaskJobTypeObject, TaskTypeObject } from 'pages/api/TaskTypeObject';
import { useEffect, useState } from 'react';


const HomePage = () => {
  const [taskDataList, setTaskDataList] = useState([]);
  const [requestData , setRequestData ] = useState({
    entp_nm   : '',
    task_tp   : '',
    task_st_dt: '',
    noDate    : true,
    limit_num : 20,
  });

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
  },[])

  const onClickMoveToTaskDtl = () => {
    alert('move');
  }

  return (
    <div className='homepage'>
      <div></div>
      <div>
        <div className='homepage__job'>
          <div>{`최근 작업 내역 ${requestData.limit_num}건`}</div>
          <div className='homepage__job--list'>
            {taskDataList.length > 0 ?
              taskDataList.map((task, key) => (
                <div key={key} onClick={onClickMoveToTaskDtl}>
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
          <div>일정</div>
          <div>
            <ScheduleCalendar />
          </div>
        </div>
        <div className='homepage__etc'>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;