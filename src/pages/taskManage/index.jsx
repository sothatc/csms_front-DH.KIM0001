import { Checkbox, IconImage } from 'components/atoms';
import { Button } from "components/atoms/Button/Button";
import { Select } from "components/atoms/Select/Select";
import Grid from "components/molecules/Grid/Grid";
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { getTaskDataListAPI } from "pages/api/Task/TaskAPI";
import { TaskJobTypeObject, TaskTypeObject } from 'pages/api/TaskTypeObject';
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { initModal, openModal } from 'reduxStore/modalSlice';


const ButtonActionRenderer = (param) => {
  const navigate = useNavigate();

  const moveToTaskDtlPage = () => {
    navigate(`/task/detail?task_unq=${param.data.task_unq}`);
  }

  return (
    <div className='grid__btn'>
      <Button value={'상세 보기'} onClickEvent={moveToTaskDtlPage} />
    </div>
  )
}

const ButtonAtchFileRenderer = (param) => {
  const dispatch = useDispatch();

  const openAtchFileModal = () => {
    dispatch(
      openModal({
        modalType : 'AtchFileListModal',
        isOpen    : true,
        data: {'task_unq' : param.data.task_unq},
      })
    );
  }

  return (
    <>
      {param.data.atch_file_bool === true
        ? <div className='grid__btn--atch'>
            <Button image={'ATCHFILEICON'} onClickEvent={openAtchFileModal} />
          </div>
        : null
      }
    </>

  )
}

const ColumnDefs = [
  {headerName : 'No.'        , field : 'task_unq'   },
	{headerName : '고객사'     , field : 'entp_nm'    },
	{headerName : '지원유형'   , field : 'task_tp'    },
	{headerName : '작업방식'   , field : 'task_job_tp'},
	{headerName : '작업 담당자', field : 'task_usr_nm'},
	{headerName : '작업 시작일', field : 'task_st_dt' },
	{headerName : '작업 종료일', field : 'task_ed_dt' },
  {
		headerName : '첨부파일',
		field : 'atch_file_nm',
		cellRenderer : ButtonAtchFileRenderer,
    cellStyle: {display: 'flex', alignItems: 'center'}
	},
  {
    field : 'action',
    cellRenderer: ButtonActionRenderer,
		cellStyle: {display: 'flex', alignItems: 'center'}
  }
];

const TaskManagePage = () => {
  const [taskDataList, setTaskDataList] = useState([]);
  const [dateString  , setDateString  ] = useState({});
  const [requestData , setRequestData ] = useState({
    entp_nm   : '', //업체 이름별 검색
    task_tp   : '', //지원유형별 검색
    task_st_dt: '', //작업 시작 날짜별 검색
    noDate    : true, //날짜조건여부
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getTaskDataListEvent(requestData);
    dispatch(initModal());
  },[])

  const getTaskDataListEvent = (requestData) => {

    getTaskDataListAPI(requestData).then((response) => {
			const updatedTaskDataList = [...response.taskList];

			updatedTaskDataList.forEach(task => {
				task.task_tp     = TaskTypeObject[`${task.task_tp}`];
				task.task_job_tp = TaskJobTypeObject[`${task.task_job_tp}`];
			});

			setTaskDataList(updatedTaskDataList);
    })
    .catch((err) => {
      alert(`API Error: ${err}`);
    });
  }

  const moveToTaskInsertPage = () => {
    navigate(`/task/register`);
  }

	const handleClickSearch = () => {
		getTaskDataListEvent(requestData);
	}

	const handleChangeSearchData = (name, codeVal) => {
		setRequestData({...requestData, [name] : codeVal});
	}

	const onChangeSearchEntpName = (e) => {
		setRequestData({...requestData, entp_nm : e.target.value});
	}

	const onChangeTaskDateParsing = (name, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const twoDigitMonth = month.toString().padStart(2, '0');
    const day = date.getDate();
    const twoDigitDay = day.toString().padStart(2, '0');

    const dateString = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    const parseISODate = parseISO(dateString);
    const formattedDate = format(parseISODate, 'yyyy-MM-dd')

    setRequestData((prev) => {
      return {...prev, [name]: formattedDate};
    });

    setDateString({...dateString, [name]: date});
  }

  const onChangeHandler = (name, value) => {
    setRequestData((prev) => {
      return {
        ...prev,
        [name] : value,
      }
    });
  }

  return (
    <>
			<div className='task'>
				<div className='task__title'>
          <div></div>
          <div>작업관리</div>
        </div>
				<div className="task__search">
					<div className="task__search--precondition">
						<div>
              <div>
                <div>작업일자</div>
                <Checkbox
                  name          = 'noDate'
                  label         = {'전체'}
                  onChangeEvent = {onChangeHandler}
                  checked       = {requestData.noDate}
                />
              </div>
              <label>
                <DatePicker
                  selected   = {dateString.task_st_dt}
                  onChange   = {date => onChangeTaskDateParsing('task_st_dt', date)}
                  dateFormat = "yyyy년 MM월 dd일"
                  disabled   = {requestData.noDate}
                  locale     = {ko}
                />
                <IconImage icon={'CALENDAR'} />
              </label>
						</div>
						<div>
							<div>지원유형</div>
							<Select
								name    = 'task_tp'
								value   = {requestData.task_tp}
								dataSet = {[
									{value: ''   , text: "전체"       },
									{value: 'INS', text: "정기정검"   },
									{value: 'ISS', text: "이슈"       },
									{value: 'SET', text: "설정변경"   },
									{value: 'TRN', text: "학습수행"   },
									{value: 'ACC', text: "인식률 측정"},
									{value: 'DEV', text: "개발적용"   },
									{value: 'EDT', text: "수정적용"   },
								]}
								onChangeEvent={handleChangeSearchData}
							/>
						</div>
						<div className="task__search--input">
							<div className="search__input--title">고객사명</div>
							<input value={requestData.entp_nm} type='text'onChange={(e)=>onChangeSearchEntpName(e)}/>
						</div>
						<div className="task__search--btn">
							<Button value={'검색'} onClickEvent={handleClickSearch}/>
						</div>
					</div>
				</div>
				<div className='task__btn'>
					<Button value='작업등록' onClickEvent={moveToTaskInsertPage} />
				</div>
				<div className="task__list">
					<Grid
						data   = {taskDataList}
						header = {ColumnDefs}
					/>
				</div>
			</div>
		</>
  )
}

export default TaskManagePage;