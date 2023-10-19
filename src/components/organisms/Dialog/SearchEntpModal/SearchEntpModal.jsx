import { Button } from 'components/atoms/Button/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import { useEffect, useState } from 'react';
import { getEnterpriseList } from 'pages/api/Enterprise/EnterpriseAPI';
import styles from './SearchEntpModal.module.scss';



const SearchEntpModal = () => {
  const [entpDataList    , setEntpDataList    ] = useState([]);
  const [requestData     , setRequestData     ] = useState({
		entp_nm : '',
	});


  useEffect(() => {
    getEnterpriseListEvent();
  },[])

  const getEnterpriseListEvent = () => {
    getEnterpriseList(requestData).then((response) => {
      setEntpDataList(response.enterpriseList);
    })
    .catch((err) => {});
  }

  const dispatch = useDispatch();

  const handleClose = (selectedEntpProps) => {
    dispatch(closeModal({
      data: {"selectedEntpProps": selectedEntpProps},
    }));
  }

  const onChangeSearchEntpName = (e) => {
		setRequestData({...requestData, entp_nm : e.target.value});
	}

  const onClickRequestSearch = () => {
    getEnterpriseListEvent();
  }

  const onClickSelEntp = (selectedEntpProps) => {
    handleClose(selectedEntpProps);
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div></div>
          <div>업체 정보 조회</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <div className={styles.modal__search}>
          <div>고객사명</div>
          <input maxLength={30} onChange={(e) => onChangeSearchEntpName(e)} />
          <Button value={'조회'} onClickEvent={onClickRequestSearch} />
        </div>
        <div className={styles.modal__list}>
          <div>
            <div>No.</div>
            <div>고객사명</div>
            <div></div>
          </div>
          <div>
            {entpDataList && entpDataList.map((item, key) => (
              <div key={key}>
                <div>{key}</div>
                <div>{item.entp_nm}</div>
                <Button value={'선택'} onClickEvent={() => onClickSelEntp(item)} />
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

export {SearchEntpModal};