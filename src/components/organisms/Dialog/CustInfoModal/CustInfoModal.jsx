import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import { Button } from 'components/atoms/Button/Button';
import { useState } from 'react';
import styles from './CustInfoModal.module.scss'


const DummyCustList = [
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름33',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
  {
    entp_nm : '회사이름',
    cust_dept_nm : '부서이름',
    cust_pst_nm : '직위 s',
    cust_nm : '고미란',
  },
]

const defaultCustData = {
  entp_nm : '',
  cust_dept_nm : '',
  cust_pst_nm : '',
  cust_nm : '',
}


const CustListModal = () => {
  // const [compCode, setCompCode] = useState('C');
  const isOpen = useSelector((state) => state.modal.isOpen);

  const [custData, setCustData] = useState(DummyCustList);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  }

  const onClickAddCustModal = () => {
    // dispatch(op)
  }

  // const onClickCompObjectSel = (code) => {
  //   setCompCode(code);
  // }

  return (
    isOpen && (
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
            <input maxLength={10} />
            <Button value={'조회'} />
          </div>
          <div className={styles.modal__list}>
            <div>
              <div>회사명</div>
              <div>부서명</div>
              <div>직위</div>
              <div>담당자명</div>
              <div></div>
            </div>
            <div>
              {custData && custData.map((item, key) => (
                <div key={key}>
                  <div>{item.entp_nm}</div>
                  <div>{item.cust_dept_nm}</div>
                  <div>{item.cust_pst_nm}</div>
                  <div>{item.cust_nm}</div>
                  <div className={`${styles['modal__list--btn']}`}>x</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.modal__btn}>
            <Button value={'추가'} onClickEvent={onClickAddCustModal} />
            <Button value={'닫기'} />
          </div>
        </div>
      </div>
    )
  )
}

export {CustListModal};