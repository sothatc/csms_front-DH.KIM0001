import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { getEnterpriseList } from 'pages/api/Enterprise/EnterpriseAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from 'components/molecules/Grid/Grid';
import { useDispatch } from 'react-redux';
import { initModal } from 'reduxStore/modalSlice';


const ButtonActionRenderer = (param) => {
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
      <Button value = {'상세 보기'} onClickEvent={moveToEntpDtlPage} />
    </div>
  )
}

const ButtonAtchFileRenderer = (param) => {
	return (
		<>
			{param.data.atch_file_bool === true
				? <Button value={'첨부파일'}/>
				: null
			}
		</>
	)
}

const ColumnDefs = [
	{headerName : 'No.'             , field : ''             },
	{headerName : '사업자등록번호'  , field : 'entp_unq'     },
	{headerName : '구분'            , field : 'entp_tp'      },
	{headerName : '업체명'          , field : 'entp_nm'      },
	{headerName : '서비스 구분'     , field : 'svc_tp'       },
	{headerName : '월 STT 처리 건수', field : 'stt_month_cnt'},
	{headerName : '일 STT 처리 건수', field : 'stt_day_cnt'  },
	{headerName : '업체 등록일시'   , field : 'reg_dtm'      },
	{
		headerName : '첨부파일',
		field : 'atch_file_nm',
		cellRenderer : ButtonAtchFileRenderer
	},
  {
    field : 'action',
    cellRenderer: ButtonActionRenderer,
    cellStyle: {display: 'flex', alignItems: 'center'}
  }
];

const EnterpriseManagePage = () => {
  const [enterpriseDataList, setEnterpriseDataList] = useState([]);
	const [requestData, setRequestData] = useState({
		entp_nm : '',
		entp_tp : '',
		svc_tp  : '',
	});

	const navigate = useNavigate();

	// const dispatch = useDispatch();

  useEffect(() => {
    getEnterpriseListEvent(requestData);
		// dispatch(initModal());
  },[]);

  const getEnterpriseListEvent = (requestData) => {
    getEnterpriseList(requestData).then((response) => {
      setEnterpriseDataList(response.enterpriseList);
    })
    .catch((err) => {});
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

	return (
		<>
			<div className='client'>
				<div className='client__title'>업체관리</div>
				<div className="client__search">
					<div className="client__search--precondition">
						<div>
							<div>업체 구분</div>
							<Select
								name    = 'entp_tp'
								dataSet = {[
									{value: ''  , text:'전체'   },
									{value: 'C' , text: "고객사"},
									{value: 'S' , text: "협력사"},
								]}
								onChangeEvent={handleChangeSearchData}
							/>
						</div>
						<div>
							<div>서비스구분</div>
							<Select
								name    = 'svc_tp'
								dataSet = {[
									{value: ''  , text:'전체'           },
									{value: 'R' , text:'실시간'         },
									{value: 'SR', text:'준실시간'       },
									{value: 'B' , text:'배치'           },
									{value: 'S' , text:'self(수동/단건)'},
								]}
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
					<Button value='업체 등록' onClickEvent={moveToNoticePage} />
				</div>
				<div className="client__list">
					<Grid
						data   = {enterpriseDataList}
						header = {ColumnDefs}
					/>
				</div>
			</div>
		</>
	)
}

export default EnterpriseManagePage;