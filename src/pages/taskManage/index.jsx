import { Button } from "components/atoms/Button/Button";
import { Select } from "components/atoms/Select/Select";
import Grid from "components/molecules/Grid/Grid";
import { getTaskDataListAPI } from "pages/api/Task/TaskAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ButtonActionRenderer = (param) => {
  const navigate = useNavigate();
  // console.log("상세보기 param = ", param);

  const moveToTaskDtlPage = () => {
    navigate(`/`);
  }

  return (
    <div>
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
		cellRenderer : ButtonAtchFileRenderer
	},
  {
    field : 'action',
    cellRenderer: ButtonActionRenderer,
  }
];

const TaskManagePage = () => {
  const [taskDataList, setTaskDataList] = useState([]);
  const [requestData, setRequestData] = useState({
    entp_unq: '', //업체 이름별 검색
    task_tp: '', //지원유형별 검색
    task_st_dt: '', //작업 시작 날짜별 검색
  });

  useEffect(() => {
    getTaskDataListEvent(requestData);
  },[])
  const getTaskDataListEvent = (requestData) => {
    getTaskDataListAPI(requestData).then((response) => {
      console.log("response.taskList = ", response.taskList);
      setTaskDataList(response.taskList);
    })
    .catch((err) => {console.log("reject Err => ", err);});
  }

  // const getTextForValue = (value) => {
  //   if (value === 'INS') return '정기정검';
  //   if (value === 'ISS') return '이슈';
  //   if (value === 'SET') return '설정변경';
  //   if (value === 'TRN') return '학습수행';
  //   if (value === 'ACC') return '인식률 측정';
  //   if (value === 'DEV') return '개발적용';
  //   if (value === 'EDT') return '수정적용';
  //   return '알 수 없음';
  // }

  return (
    <>
			<div className='task'>
				<div className='task__title'>작업관리</div>
				<div className="task__search">
					<div className="task__search--precondition">
						<div>
							<div>작업일자</div>
							<Select
								// name    = 'entp_tp'
								// dataSet = {[
								// 	{value: ''  , text:'전체'   },
								// 	{value: 'C' , text: "고객사"},
								// 	{value: 'S' , text: "협력사"},
								// ]}
								// onChangeEvent={handleChangeSearchData}
							/>
						</div>
						<div>
							<div>지원유형</div>
							<Select
								// name    = 'svc_tp'
								// dataSet = {[
								// 	{value: ''  , text:'전체'           },
								// 	{value: 'R' , text:'실시간'         },
								// 	{value: 'SR', text:'준실시간'       },
								// 	{value: 'B' , text:'배치'           },
								// 	{value: 'S' , text:'self(수동/단건)'},
								// ]}
								// onChangeEvent={handleChangeSearchData}
							/>
						</div>
						<div className="task__search--input">
							<div className="search__input--title">업체명</div>
							{/* <input type='text'onChange={(e)=>onChangeSearchEntpName(e)}/> */}
							<input type='text'/>
						</div>
						<div className="task__search--btn">
							{/* <Button value={'검색'} onClickEvent={handleClickSearch}/> */}
							<Button value={'검색'} />
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