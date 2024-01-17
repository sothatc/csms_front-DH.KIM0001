import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { CustTypeObject } from 'pages/api/CustTypeObject';
import { deleteCustInfo, getCustList, insertCustInfo, updateCustInfo } from 'pages/api/Enterprise/EnterpriseAPI';
import { GenerateOptions } from 'pages/api/common/dataSet/dataSet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './CustListModal.module.scss';

const CustListModal = ({data}) => {
  const {entpUnqProps, entpTpProps, custDataProps} = data;

  const [custDataList , setCustDataList ] = useState(custDataProps);
  const [enabledEdit  , setEnabledEdit  ] = useState(false);
  const [inputCustData, setInputCustData] = useState({
    entp_unq    : entpUnqProps,
    entp_tp     : entpTpProps,
    memb_nm     : '',
    memb_pst_nm : '',
    memb_dept_nm: '',
    memb_tel    : '',
    memb_email  : '',
    flag        : '',
  });

  const dispatch = useDispatch();

  const textEl = useRef(null);

  const custOptions = useMemo(() => GenerateOptions(CustTypeObject), []);

  useEffect(() => {
    if(enabledEdit && textEl.current) {
      textEl.current.focus();
    }
  },[enabledEdit])

  const callGetCustList = () => {
    getCustList(entpUnqProps).then((response) => {
      setCustDataList(response.data);
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  }

  useEffect(() => {
    callGetCustList();
  },[]);

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'CustListModal',
    }));
  }

  const onClickAddCust = () => {
    if(inputCustData.memb_nm === '' || inputCustData.memb_pst_nm === '' || inputCustData.memb_tel === '' || inputCustData.memb_email === '') {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(inputCustData.memb_email)) {
      alert('이메일 형식에 맞게 입력해주세요.');
      return;
    }

    const confirmed = window.confirm('추가하시겠습니까?');

    const newCustData = inputCustData;
    newCustData['flag'] = 'I';

    if(confirmed) {
      insertCustInfo(newCustData).then((response) => {
        alert('추가 완료 되었습니다.');
        callGetCustList();
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });

    }

    setInputCustData({
      entp_unq    : entpUnqProps,
      entp_tp     : entpTpProps,
      memb_nm     : '',
      memb_pst_nm : '',
      memb_dept_nm: '',
      memb_tel    : '',
      memb_email  : '',
      flag        : '',
    })
  }

  const onChangeCustData = (name, value) => {
    if(name === 'memb_tel') {
      const memb_tel_num = value.replace(/[^0-9]/g, '').substring(0, 11);
      setInputCustData({...inputCustData, [name]: memb_tel_num});
    }else {
      setInputCustData({...inputCustData, [name]: value});
    }
  }

  const onChangeSearchCustName = () => {

  }

  const onClickDeleteCust = (cust_unq) => {
    const confirmed = window.confirm('삭제하시겠습니까?');
    if(confirmed) {
      deleteCustInfo(cust_unq).then((response) => {
        alert("삭제 완료 되었습니다.");
        callGetCustList();
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });
    }
  }

  const onChangeCustListInfo = (name, value, cust_unq) => {
    setCustDataList((prev) => {
      return prev.map((item) => (
        item.cust_unq === cust_unq ? {...item, [name]: value, flag: 'U'} : item
      ))
    });
  }

  const onClickEdit = () => {
    setEnabledEdit(!enabledEdit);
  }

  const onClickSave = () => {
    updateCustInfo(custDataList).then((response) => {
      alert('수정 완료되었습니다.')
    }).catch((err) => {
      alert(`Axios API Error: ${err}`);
    })
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div className={enabledEdit && `${styles['modal__title--active']}`}>
            <Button image={'EDIT'} onClickEvent={onClickEdit} value={enabledEdit ? '편집중..' : '편집'} />
          </div>
          <div>담당자 정보 조회</div>
          <div className={styles.close}>
            <IconImage icon={'CLOSE'} onClickEvent={handleClose} />
          </div>
        </div>
        <div className={styles.modal__search}>
          <div>담당자명</div>
          <input value={''} maxLength={10} onChange={onChangeSearchCustName}/>
          <Button value={'조회'} />
        </div>
        <div className={styles.modal__list}>
          <div>
            <div>정/부</div>
            <div>직위</div>
            <div>담당자명</div>
            <div>연락처</div>
            <div>Email</div>
            <div>부서명</div>
            <div></div>
          </div>
          <div>
            {custDataList && custDataList.map((item, index) => (
              <div key={index}>
                <Select
                  name          = 'principal_tp'
                  value         = {item.principal_tp}
                  primaryKey    = {item.cust_unq}
                  onChangeEvent = {onChangeCustListInfo}
                  dataSet = {[
                    {value: 'Y', text: '정'},
                    {value: 'N', text: '부'},
                  ]}
                />
                <Select
                  name          = 'memb_pst_nm'
                  value         = {item.memb_pst_nm}
                  primaryKey    = {item.cust_unq}
                  onChangeEvent = {onChangeCustListInfo}
                  dataSet = {custOptions}
                />
                <input value={item.memb_nm} onChange={(e)=>onChangeCustListInfo('memb_nm', e.target.value, item.cust_unq)} readOnly={!enabledEdit} ref={textEl}/>
                <input value={item.memb_tel} onChange={(e)=>onChangeCustListInfo('memb_tel', e.target.value, item.cust_unq, )} readOnly={!enabledEdit}/>
                <input value={item.memb_email} onChange={(e)=>onChangeCustListInfo('memb_email', e.target.value, item.cust_unq, )} readOnly={!enabledEdit}/>
                <input value={item.memb_dept_nm} onChange={(e)=>onChangeCustListInfo('memb_dept_nm', e.target.value, item.cust_unq, )} readOnly={!enabledEdit}/>
                {enabledEdit &&
                  <IconImage icon={'CLOSE'} onClickEvent={() => onClickDeleteCust(item.cust_unq)} />
                }
              </div>
            ))}
          </div>
        </div>
        <div className={styles.modal__add}>
          <input placeholder='부서명' value={inputCustData.memb_dept_nm} onChange={(e)=>onChangeCustData('memb_dept_nm', e.target.value)}/>
          <Select
            name          = 'memb_pst_nm'
            label         = '*직위'
            value         = {inputCustData.memb_pst_nm}
            dataSet       = {custOptions}
            onChangeEvent = {onChangeCustData}
          />
          <input placeholder='*담당자명' value={inputCustData.memb_nm} onChange={(e)=>onChangeCustData('memb_nm', e.target.value)}/>
          <input
            type        = 'tel'
            value       = {inputCustData.memb_tel}
            maxLength   = {11}
            onChange    = {(e)=>onChangeCustData('memb_tel', e.target.value)}
            placeholder = '*연락처 (숫자만)'
          />
          <input placeholder='*Email' value={inputCustData.memb_email} onChange={(e)=>onChangeCustData('memb_email', e.target.value)}/>
          <Button value={'추가'} onClickEvent={onClickAddCust}/>
        </div>
        <div className={styles.modal__btn}>
          {enabledEdit &&
            <Button value={'저장'} onClickEvent={onClickSave} />
          }
          <Button value={'닫기'} onClickEvent={handleClose} />
        </div>
      </div>
    </div>
  )
}

export { CustListModal };

