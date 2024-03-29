import { Checkbox, IconImage } from 'components/atoms';
import { Button } from "components/atoms/Button/Button";
import { Select } from "components/atoms/Select/Select";
import Grid from "components/molecules/Grid/Grid";
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { getTaskDataListAPI } from "pages/api/Task/TaskAPI";
import { TaskJobTypeObject, TaskTypeObject } from 'pages/api/TaskTypeObject';
import { GenerateOptions } from 'pages/api/common/dataSet/dataSet';
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
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

const TaskManagePage = () => {
  const [transformedTaskList , setTransformedTaskList ] = useState([]);
  const [selectedRange       , setSelectedRange       ] = useState([null, null]);
  const [pagingData          , setPagingData          ] = useState({});
  const [currentPage         , setCurrentPage         ] = useState(1);
  const [requestData         , setRequestData         ] = useState({
    entp_nm        : '', //업체 이름별 검색
    task_tp        : '', //지원유형별 검색
    searchDateFrom : '', // 기간 범위 조건 검색
    searchDateTo   : '',
    noDate         : true, //날짜 조건여부
    paging : {
      limit : 10,
      offset: 1,
    }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const taskTpOptions = useMemo(() => GenerateOptions(TaskTypeObject), []);

  const onCellClicked = (event) => {
    navigate(`/task/detail?task_unq=${event.data.task_unq}`);

  }

  const ColumnDefs = [
    {headerName : 'No.'        , field : 'task_unq'    , onCellClicked: onCellClicked},
    {headerName : '고객사'     , field : 'entp_nm'     , onCellClicked: onCellClicked},
    {headerName : '지원유형'   , field : 'task_tp'     , onCellClicked: onCellClicked},
    {headerName : '작업방식'   , field : 'task_job_tp' , onCellClicked: onCellClicked},
    {headerName : '작업 담당자', field : 'task_usr_nm' , onCellClicked: onCellClicked},
    {headerName : '작업 시작일', field : 'task_st_dtm' },
    {headerName : '작업 종료일', field : 'task_ed_dtm' },
    {
      headerName  : '첨부파일',
      field       : 'atch_file_nm',
      cellRenderer: ButtonAtchFileRenderer,
      cellStyle   : {display: 'flex', alignItems: 'center'}
    },
    {headerName : '등록일'     , field : 'reg_dtm'     },
    {
      field       : 'action',
      cellRenderer: ButtonActionRenderer,
      cellStyle   : {display: 'flex', alignItems: 'center'}
    }
  ];

  useEffect(() => {
    getTaskDataListEvent(requestData);
    dispatch(initModal());
  },[currentPage])

  const getTaskDataListEvent = () => {
    let reqData = {
      ...requestData,
      paging: {
        ...requestData.paging,
        offset: currentPage
      }
    }

    getTaskDataListAPI(reqData).then((response) => {
			const taskDataList = [...response.taskList];

			taskDataList.forEach(task => {
        let task_st_tm_without_sec = task.task_st_tm.split(':').slice(0, -1).join(':');
        let task_ed_tm_without_sec = task.task_ed_tm.split(':').slice(0, -1).join(':');

				task.task_tp     = TaskTypeObject[`${task.task_tp}`];
				task.task_job_tp = TaskJobTypeObject[`${task.task_job_tp}`];
        task.reg_dtm     = task.reg_dtm.split(" ")[0];
        task.task_st_dtm = `${task.task_st_dt} / ${task_st_tm_without_sec}`
        task.task_ed_dtm = `${task.task_ed_dt} / ${task_ed_tm_without_sec}`
			});

			setTransformedTaskList(taskDataList);
      setPagingData(response.paging);
    })
    .catch((err) => {
      alert(`API Error: ${err}`);
    });
  }

  const formatDateFn = (date) => {
    const year  = date.getFullYear();
    const month = date.getMonth() + 1;
    const day   = date.getDate();
    const twoDigitMonth = month.toString().padStart(2, '0');
    const twoDigitDay   = day.toString().padStart(2, '0');

    const dateString = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    const parseISODate = parseISO(dateString);
    const formattedDate = format(parseISODate, 'yyyy-MM-dd');

    return formattedDate;
  }

  const moveToTaskInsertPage = () => {
    navigate(`/task/register`);
  }

	const handleClickSearch = () => {
    if(requestData.searchDateFrom !== undefined && requestData.searchDateTo === undefined && requestData.noDate === false) {
      alert('나머지 날짜를 지정해주세요');
      return;
    }
		getTaskDataListEvent(requestData);
	}

	const handleChangeSearchData = (name, codeVal) => {
		setRequestData({...requestData, [name] : codeVal});
	}

	const onChangeSearchEntpName = (e) => {
		setRequestData({...requestData, entp_nm : e.target.value});
	}

  const onChangeHandler = (name, value) => {
    setRequestData((prev) => {
      return {
        ...prev,
        [name] : value,
      }
    });
  }

  const handleDateChange = (dates) => {
    let dateFrom;
    let dateTo;

    if(dates[0] !== null) {
      dateFrom = formatDateFn(dates[0]);
    }
    if(dates[1] !== null) {
      dateTo = formatDateFn(dates[1]);
    }

    setRequestData({...requestData,  // API위한 formated date
      'searchDateFrom': dateFrom,
      'searchDateTo': dateTo,
    });
    setSelectedRange(dates);        //DatePicker value
  }

  const onClickPaging = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const totalPages = pagingData.page_cnt; // 전체 페이지 수
    const visiblePages = 5; // 보이는 번호 갯수

    const pageNumbers = [];
    const halfVisiblePages = Math.floor(visiblePages / 2);

      let start = currentPage - halfVisiblePages;
      let end = currentPage + halfVisiblePages;

      if (start <= 0) {
        start = 1;
        end = Math.min(totalPages, visiblePages);
      }

      if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, totalPages - visiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <li key={i} className={i === currentPage ? 'task__pagination--active' : ''} onClick={() => onClickPaging(i)}>
            {i}
          </li>
        );
    }
    return pageNumbers;
  };

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
              <label className={requestData.noDate === true ? 'disabled' : ''}>
                <DatePicker
                  startDate    = {selectedRange[0]}
                  endDate      = {selectedRange[1]}
                  dateFormat   = "yyyy년 MM월 dd일"
                  disabled     = {requestData.noDate}
                  onChange     = {handleDateChange}
                  locale       = {ko}
                />
                <IconImage icon={'CALENDAR'} />
              </label>
						</div>
						<div>
							<div>지원유형</div>
							<Select
								name    = 'task_tp'
                label   = {'전체'}
								value   = {requestData.task_tp}
								dataSet = {taskTpOptions}
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
						data   = {transformedTaskList}
						header = {ColumnDefs}
					/>
				</div>
        <div className='task__pagination'>
          <div>
            <div className='task__pagination--arrow task__pagination--pre'>
              <Button
                image        = "ARROW-LEFT"
                onClickEvent = {() => setCurrentPage((prev) => Math.max( prev - 1, 1 ))}
                disabled     = {currentPage === 1}
                backgroundColor = ''
              />
            </div>
            <div className='task__pagination--num'>
              {renderPageNumbers()}
            </div>
            <div className='task__pagination--arrow task__pagination--next'>
              <Button
                image        = "ARROW-RIGHT"
                onClickEvent = {() => setCurrentPage((prev) => Math.min( prev + 1, pagingData.page_cnt ))}
                disabled     = {currentPage === pagingData.page_cnt}
                backgroundColor = ''
              />
            </div>
          </div>
        </div>
			</div>
		</>
  )
}

export default TaskManagePage;