import { Button } from "components/atoms/Button/Button";
import { getCustList, getTaskMembList } from "pages/api/Enterprise/EnterpriseAPI";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "reduxStore/modalSlice";
import styles from './SearchMembModal.module.scss';

const SearchMembModal = ({data}) => {
  const {entp_unq} = data;

  const [selectedItem, setSelectedItem] = useState({});
  const [custDataList, setCustDataList] = useState([]);
  const [taskMembList, setTaskMembList] = useState([]);

  const dispatch = useDispatch();

  const handleDivClick = (item) => {
    setSelectedItem(item);
  }

  useEffect(() => {
    if(entp_unq) {
      getCustList(entp_unq).then((response) => {
        setCustDataList(response.data);
      })
      .catch((err) => {});

    }else {
      getTaskMembList().then((response) => {
        setTaskMembList(response.data);
      })
      .catch((err) => {});
    }

  },[])

  const handleClose = () => {
    if(entp_unq) {
      dispatch(closeModal({
        data: {"selectedCust": selectedItem},
      }));
    }else {
      dispatch(closeModal({
        data: {"selectedTaskMemb": selectedItem},
      }));
    }
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
            <div>No.</div>
            <div>부서</div>
            <div>담당자명</div>
            <div>직위</div>
          </div>
          <div>
            {custDataList.length !== 0
              ? custDataList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleDivClick(item)}
                  className={selectedItem.cust_unq === item.cust_unq ? styles.active : ''}
                >
                  <div>{index}</div>
                  <div>{item.memb_dept_nm}</div>
                  <div>{item.memb_nm}</div>
                  <div>{item.memb_pst_nm}</div>
                </div>
              ))
              : taskMembList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleDivClick(item)}
                  className={selectedItem.memb_unq === item.memb_unq ? styles.active : ''}
                >
                  <div>{index}</div>
                  <div>{item.memb_dept_nm}</div>
                  <div>{item.memb_nm}</div>
                  <div>{item.memb_pst_nm}</div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.modal__btn}>
          <Button value={'선택'} onClickEvent={handleClose} />
        </div>
      </div>
    </div>
  )
}

export { SearchMembModal };

