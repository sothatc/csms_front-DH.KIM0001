import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import Grid from 'components/molecules/Grid/Grid';
import { getEnterpriseList } from 'pages/api/Enterprise/EnterpriseAPI';
import { EntpTypeObject, SvcTypeObject } from 'pages/api/EnterpriseTypeObject';
import { GenerateOptions } from 'pages/api/common/dataSet/dataSet';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { openModal } from 'reduxStore/modalSlice';


const ButtonMoveActionRenderer = (param) => {
  const navigate = useNavigate();
  const moveToEntpDtlPage = () => {
    navigate(`/enterprise/detail?entp_unq=${param.data.entp_unq}`);
  }

  const moveToTaskInsertPage = () => {
    navigate(`/task/register?entp_unq=${param.data.entp_unq}`);
  }

  return (
    <div className='grid__btn'>
      <Button value = {'작업 등록'} onClickEvent={moveToTaskInsertPage}/>
      <Button value = {'상세 보기'} onClickEvent={moveToEntpDtlPage}   />
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
        data: {'entp_unq' : param.data.entp_unq},
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



const EnterpriseManagePage = () => {
  const [enterpriseDataList, setEnterpriseDataList] = useState([]);
  const [pagingData        , setPagingData        ] = useState({});
  const [currentPage       , setCurrentPage       ] = useState(1);
  const [selectedSolution  , setSelectedSolution  ] = useState('ALL');
  const [selSolutionBtn    , setSelSolutionBtn    ] = useState(); //requestData를 useEffect 디펜던시에 넣지 않기 위해
	const [requestData       , setRequestData       ] = useState({
		entp_nm     : '',
		entp_tp     : '',
		svc_tp      : '',
    solution_tp : '',
    paging : {
      limit : 10,
      offset: 1,
    }
	});

  const location = useLocation();

  const navigate = useNavigate();

  const entpOptions = useMemo(() => GenerateOptions(EntpTypeObject, true), []); // 2번째 매개변수: SelectBox '전체' value 포함 여부
  const svcOptions  = useMemo(() => GenerateOptions(SvcTypeObject , true), []);


  const onCellClicked = (event) => {
    navigate(`/enterprise/detail?entp_unq=${event.data.entp_unq}`);
  }

  const ColumnDefs = [
    {headerName : '솔루션'          , field : 'solution_tp'  },
    {headerName : '사업자등록번호'  , field : 'entp_unq'     , onCellClicked: onCellClicked},
    {headerName : '업체 구분'       , field : 'entp_tp'      , onCellClicked: onCellClicked},
    {headerName : '업체명'          , field : 'entp_nm'      , onCellClicked: onCellClicked},
    {headerName : '서비스 구분'     , field : 'svc_tp'       },
    {headerName : '월 STT 처리 건수', field : 'stt_month_cnt'},
    {headerName : '일 STT 처리 건수', field : 'stt_day_cnt'  },
    {headerName : '업체 등록일시'   , field : 'reg_dtm'      },
    {
      headerName : '첨부파일',
      field : 'atch_file_nm',
      cellRenderer : ButtonAtchFileRenderer,
      cellStyle: {display: 'flex', alignItems: 'center'}
    },
    {
      field : 'action',
      cellRenderer: ButtonMoveActionRenderer,
      cellStyle: {display: 'flex', alignItems: 'center'}
    }
  ];

  useEffect(() => {
    getEnterpriseListEvent(requestData);
		// dispatch(initModal());
  },[currentPage, selSolutionBtn, location])

  const getEnterpriseListEvent = (requestData) => {

    getEnterpriseList(requestData).then((response) => {
      const entpDataList = [...response.enterpriseList];

      entpDataList.forEach((entp) => {
        entp.entp_tp = EntpTypeObject[`${entp.entp_tp}`];
        entp.svc_tp  = SvcTypeObject[`${entp.svc_tp}`];
      });
      setEnterpriseDataList(entpDataList);
      setPagingData(response.paging);
    })
    .catch((err) => {
      alert(`API Error: ${err}`);
    });
  }

	const moveToNoticePage = () => {
		navigate('/enterprise/register');
	}

	const handleChangeSearchData = (name, codeVal) => {
		setRequestData({...requestData, [name] : codeVal});
	}
	const onChangeSearchEntpName = (e) => {
		setRequestData({...requestData, entp_nm : e.target.value});
	}

	const handleClickSearch = () => {
		getEnterpriseListEvent(requestData);
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
        <li key={i} className={i === currentPage ? 'client__pagination--active' : ''} onClick={() => onClickPaging(i)}>
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  const onClickSelSolution = (solutionType) => {

    if(solutionType !== 'ALL') {
      setSelectedSolution(solutionType);
      setRequestData({...requestData, solution_tp: solutionType});
    }else {
      setSelectedSolution(solutionType);
      setRequestData({...requestData, solution_tp: ''});
    }
    setSelSolutionBtn(solutionType);
  }

	return (
		<>
			<div className='client'>
				<div className='client__title'>
          <div></div>
          <div>업체관리</div>
        </div>
				<div className="client__search">
					<div className="client__search--precondition">
						<div>
							<div>업체 구분</div>
							<Select
								name    = 'entp_tp'
								label   = {'전체'}
								value   = {requestData && requestData.entp_tp}
                dataSet = {entpOptions}
								onChangeEvent={handleChangeSearchData}
							/>
						</div>
						<div>
							<div>서비스구분</div>
							<Select
								name    = 'svc_tp'
								label   = {'전체'}
								value   = {requestData && requestData.svc_tp}
								dataSet = {svcOptions}
								onChangeEvent={handleChangeSearchData}
							/>
						</div>
						<div className="client__search--input">
							<div className="search__input--title">회사명</div>
							<input type='text'onChange={(e)=>onChangeSearchEntpName(e)}/>
						</div>
						<div className="client__search--btn">
							<Button value={'검색'} onClickEvent={handleClickSearch}/>
						</div>
					</div>
				</div>
				<div className='client__btn'>
          <div>
            <Button value={'전체 솔루션'} onClickEvent={()=>onClickSelSolution('ALL')} backgroundColor={selectedSolution === 'ALL' && 'blue'}/>
            <Button value={'STT'} image={''} onClickEvent={()=>onClickSelSolution('STT')} backgroundColor={selectedSolution === 'STT' && 'blue'}/>
            <Button value={'CRM'} image={''} onClickEvent={()=>onClickSelSolution('CRM')} backgroundColor={selectedSolution === 'CRM' && 'blue'}/>
          </div>
					<Button value='업체 등록' onClickEvent={moveToNoticePage} />
				</div>
				<div className="client__list">
					<Grid
						data   = {enterpriseDataList}
						header = {ColumnDefs}
					/>
				</div>
        <div className='client__pagination'>
          <div>
            <div className='client__pagination--arrow client__pagination--pre'>
              <Button
                image="ARROW-LEFT"
                onClickEvent = {() => setCurrentPage((prev) => Math.max( prev - 1, 1 ))}
                backgroundColor = ''
                disabled     = {currentPage === 1}
              />
            </div>
            <div className='client__pagination--num'>
              {renderPageNumbers()}
            </div>
            <div className='client__pagination--arrow client__pagination--next'>
              <Button
                image="ARROW-RIGHT"
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

export default EnterpriseManagePage;