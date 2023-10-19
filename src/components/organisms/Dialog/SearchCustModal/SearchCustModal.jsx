import { Button } from "components/atoms/Button/Button";
import { getCustList, getCustOneInfo } from "pages/api/Enterprise/EnterpriseAPI";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "reduxStore/modalSlice";
import styles from './SearchCustModal.module.scss';

const SearchCustModal = ({data}) => {
  const {entp_unq} = data;

  const [custDataList, setCustDataList] = useState([]);
  const [custData    , setCustData    ] = useState({});
console.log("custData = ", custData);
  const dispatch = useDispatch();

  useEffect(() => {
    getCustList(entp_unq).then((response) => {
      setCustDataList(response.data);
    })
    .catch((err) => {})

  },[])

  const handleClose = (custData) => {
    dispatch(closeModal({
      data: {"custData": custData},
    }));
  }

  const onClickSelCust = (cust_unq) => {
    getCustOneInfo(cust_unq).then((response) => {
      setCustData(response.data);
    });
    handleClose(custData);
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
          <input maxLength={30}  />
          <Button value={'조회'}  />
        </div>
        <div className={styles.modal__list}>
          <div>
            <div>부서</div>
            <div>담당자명</div>
            <div>직위</div>
            <div></div>
          </div>
          <div>
            {custDataList && custDataList.map((item, key) => (
              <div key={key}>
                <div>{item.memb_dept_nm}</div>
                <div>{item.memb_nm}</div>
                <div>{item.memb_pst_nm}</div>
                <Button value={'선택'} onClickEvent={()=>onClickSelCust(item.cust_unq)} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.modal__btn}>
          <Button value={'닫기'} onClickEvent={handleClose} />
        </div>
      </div>
    </div>
  )
}

export { SearchCustModal };
