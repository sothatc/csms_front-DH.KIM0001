import { Button } from "components/atoms/Button/Button";
import { getTaskMembList } from "pages/api/Enterprise/EnterpriseAPI";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "reduxStore/modalSlice";
import styles from './SearchTaskMembModal.module.scss';

const SearchTaskMembModal = () => {
  const [selectedTaskMemb, setSelectedTaskMemb] = useState({});
  const [taskMembList, setTaskMembList] = useState([]);

  const dispatch = useDispatch();

  const handleDivClick = (item) => {
      setSelectedTaskMemb(item);
  }

  useEffect(() => {
    getTaskMembList().then((response) => {
      setTaskMembList(response.data);
    })
    .catch((err) => {});
  },[])

  const handleClose = () => {
    dispatch(closeModal({
      data: {"selectedTaskMemb": selectedTaskMemb},
    }));
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div></div>
          <div>작업담당자 정보 조회</div>
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
            {taskMembList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleDivClick(item)}
                className={selectedTaskMemb.memb_unq === item.memb_unq ? styles.active : ''}
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

export { SearchTaskMembModal };

