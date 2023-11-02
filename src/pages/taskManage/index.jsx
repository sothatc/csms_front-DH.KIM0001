import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { IconImage } from 'components/atoms';
import { Button } from "components/atoms/Button/Button";
import { Select } from "components/atoms/Select/Select";
import Grid from "components/molecules/Grid/Grid";
import { ko } from 'date-fns/esm/locale';
import { getTaskDataListAPI } from "pages/api/Task/TaskAPI";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";


const ButtonActionRenderer = (param) => {
  const navigate = useNavigate();
  // console.log("상세보기 param = ", param);

  const moveToTaskDtlPage = () => {
    navigate(`/task/detail`);
  }

  return (
    <div className='grid__btn'>
      <Button value={'상세 보기'} onClickEvent={moveToTaskDtlPage} />
    </div>
  )
}

const ButtonAtchFileRenderer = (param) => {
  // console.log("atchFile param = ", param);
  return (
    <div>
      <Button value={'첨부파일'} />
    </div>
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
	},
  {
    field : 'action',
    cellRenderer: ButtonActionRenderer,
		cellStyle: {display: 'flex', alignItems: 'center'}
  }
];

const TaskManagePage = () => {
  const [taskDataList, setTaskDataList] = useState([]);
  const [requestData, setRequestData] = useState({
    entp_nm   : '', //업체 이름별 검색
    task_tp   : '', //지원유형별 검색
    task_st_dt: '', //작업 시작 날짜별 검색
  });

  useEffect(() => {
    getTaskDataListEvent(requestData);
  },[])

	const getTextForTaskType = (value) => {
		if (value === 'INS') return '정기정검';
		if (value === 'ISS') return '이슈';
		if (value === 'SET') return '설정변경';
		if (value === 'TRN') return '학습수행';
		if (value === 'ACC') return '인식률 측정';
		if (value === 'DEV') return '개발적용';
		if (value === 'EDT') return '수정적용';
		return '알 수 없음';
	}

	const getTextForTaskJobType = (value) => {
		if (value === 'VST') return '방문';
		if (value === 'RMT') return '원격';
		return '알 수 없음';
	}

  const getTaskDataListEvent = (requestData) => {

    getTaskDataListAPI(requestData).then((response) => {
			const updatedTaskDataList = [...response.taskList];

			updatedTaskDataList.forEach(task => {
				task.task_tp     = getTextForTaskType(task.task_tp);
				task.task_job_tp = getTextForTaskJobType(task.task_job_tp);
			});

			setTaskDataList(updatedTaskDataList);
    })
    .catch((err) => {console.log("reject Err => ", err)});

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
    // onChangeTaskInfoCode(name, date);

    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const twoDigitMonth = month.toString().padStart(2, '0');
    // const day = date.getDate();
    // const twoDigitDay = day.toString().padStart(2, '0');

    // const dateString = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    // const parseISODate = parseISO(dateString);
    // const formattedDate = format(parseISODate, 'yyyy-MM-dd');

    // setRequestData((prev) => {
    //   return {...prev, [name]: formattedDate};
    // });

		setRequestData({...requestData, [name]: date});
  }


console.log("taskDataList = ", taskDataList);
  return (
    <>
			<div className='task'>
				<div className='task__title'>작업관리</div>
				<div className="task__search">
					<div className="task__search--precondition">
						<div>
							<div>작업일자</div>
							<label>
								<DatePicker
									// className  = {styles.datepicker}
									selected   = {requestData.task_st_dt}
									onChange   = {date => onChangeTaskDateParsing('task_st_dt', date)}
									dateFormat = "yyyy년 MM월 dd일"
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
					{/* <Button value='업체 등록' onClickEvent={moveToNoticePage} /> */}
					<Button value='작업등록' />
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