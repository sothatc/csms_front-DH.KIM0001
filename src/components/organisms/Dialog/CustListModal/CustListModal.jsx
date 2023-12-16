import { Button } from 'components/atoms/Button/Button';
import { deleteCustInfo, getCustList, insertCustInfo } from 'pages/api/Enterprise/EnterpriseAPI';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './CustListModal.module.scss';
import { CustTypeObject } from 'pages/api/CustTypeObject';
import { IconImage } from 'components/atoms';

const CustListModal = ({data}) => {
  const {entpUnqProps, entpTpProps, custDataProps} = data;

  const [custData     , setCustData     ] = useState(custDataProps);
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

  useEffect(() => {
    getCustList(entpUnqProps).then((response) => {
      setCustData(response.data);
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  },[custData, insertCustInfo, deleteCustInfo]);

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
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });

    }

    setInputCustData({
      memb_nm     : '',
      memb_pst_nm : '',
      memb_dept_nm: '',
      memb_tel    : '',
      memb_email  : '',
      flag        : '',
    })
  }

  const onChangeCustData = (name, e) => {
    const value = e.target.value;

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
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div></div>
          <div>담당자 정보 조회</div>
          <div className={styles.close} onClick={handleClose}>
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
            <div>직위</div>
            <div>담당자명</div>
            <div>연락처</div>
            <div>Email</div>
            <div>부서명</div>
            <div></div>
          </div>
          <div>
            {custData && custData.map((item, key) => (
              <div key={key}>
                <div>{CustTypeObject[item.memb_pst_nm]}</div>
                <div>{item.memb_nm}</div>
                <div>{item.memb_tel}</div>
                <div>{item.memb_email}</div>
                <div>{item.memb_dept_nm}</div>
                <IconImage icon={'CLOSE'} onClickEvent={() => onClickDeleteCust(item.cust_unq)} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.modal__add}>
          <input placeholder='부서이름' value={inputCustData.memb_dept_nm} onChange={(e)=>onChangeCustData('memb_dept_nm', e)}/>
          <input placeholder='*직위' value={inputCustData.memb_pst_nm} onChange={(e)=>onChangeCustData('memb_pst_nm', e)}/>
          <input placeholder='*담당자명' value={inputCustData.memb_nm} onChange={(e)=>onChangeCustData('memb_nm', e)}/>
          <input
            type        = 'tel'
            value       = {inputCustData.memb_tel}
            maxLength   = {11}
            onChange    = {(e)=>onChangeCustData('memb_tel', e)}
            placeholder = '*연락처 (숫자만)'
          />
          <input placeholder='*Email' value={inputCustData.memb_email} onChange={(e)=>onChangeCustData('memb_email', e)}/>
          <Button value={'추가'} onClickEvent={onClickAddCust}/>
        </div>
        <div className={styles.modal__btn}>
          <Button value={'닫기'} onClickEvent={handleClose} />
        </div>
      </div>
    </div>
  )
}

export { CustListModal };
