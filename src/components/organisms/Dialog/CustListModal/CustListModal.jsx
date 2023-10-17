import { Button } from 'components/atoms/Button/Button';
import { deleteCustInfo, getCustList, insertCustInfo } from 'pages/api/Enterprise/EnterpriseAPI';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './CustListModal.module.scss';


const CustListModal = ({data}) => {
  const {entpUnqProps, entpTpProps, cuatDataProps} = data;

  const [custData     , setCustData     ] = useState(cuatDataProps);
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

  },[custData]);

  const handleClose = () => {
    dispatch(closeModal());
  }

  const onClickAddCust = () => {
    const newCustData = inputCustData;
    newCustData['flag'] = 'I';

    alert('추가 완료 되었습니다.');

    insertCustInfo(newCustData);

    getCustList(entpUnqProps).then((response) => {
      setCustData(response.data);
    });
  }

  const onChangeCustData = (name, e) => {
    setInputCustData({...inputCustData, [name]: e.target.value});
  }

  const onChangeSearchCustName = () => {

  }

  const onClickDeleteCust = (cust_unq) => {
    alert("삭제 완료 되었습니다.");

    deleteCustInfo(cust_unq);

    getCustList(entpUnqProps).then((response) => {
      setCustData(response.data);
    });
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div></div>
          <div>담당자 정보 조회</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <div className={styles.modal__search}>
          <div>담당자명</div>
          <input value={''} maxLength={10} onChange={onChangeSearchCustName}/>
          <Button value={'조회'} />
        </div>
        <div className={styles.modal__list}>
          <div>
            <div>부서명</div>
            <div>직위</div>
            <div>담당자명</div>
            <div>연락처</div>
            <div>Email</div>
            <div></div>
          </div>
          <div>
            {custData && custData.map((item, key) => (
              <div key={key}>
                <div>{item.memb_dept_nm}</div>
                <div>{item.memb_pst_nm}</div>
                <div>{item.memb_nm}</div>
                <div>{item.memb_tel}</div>
                <div>{item.memb_email}</div>
                <div className={`${styles['modal__list--btn']}`} onClick={() => onClickDeleteCust(item.cust_unq)}>x</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.modal__add}>
          <input placeholder='부서이름' value={inputCustData.memb_dept_nm} onChange={(e)=>onChangeCustData('memb_dept_nm', e)}/>
          <input placeholder='직위' value={inputCustData.memb_pst_nm} onChange={(e)=>onChangeCustData('memb_pst_nm', e)}/>
          <input placeholder='담당자명' value={inputCustData.memb_nm} onChange={(e)=>onChangeCustData('memb_nm', e)}/>
          <input placeholder='연락처' value={inputCustData.memb_tel} onChange={(e)=>onChangeCustData('memb_tel', e)}/>
          <input placeholder='Email' value={inputCustData.memb_email} onChange={(e)=>onChangeCustData('memb_email', e)}/>
          <Button value={'추가'} onClickEvent={onClickAddCust}/>
        </div>
        <div className={styles.modal__btn}>
          <Button value={'닫기'} />
        </div>
      </div>
    </div>
  )
}

export { CustListModal };
