import { Button } from 'components/atoms/Button/Button';
import { downloadEntpAtchFileAPI, getEnterpriseDtlInfo } from 'pages/api/Enterprise/EnterpriseAPI';
import { downloadTaskAtchFileAPI, getTaskDtlInfoAPI } from 'pages/api/Task/TaskAPI';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './AtchFileListModal.module.scss';
import { IconImage } from 'components/atoms';

const AtchFileListModal = () => {
  const [atchFiles, setAtchFiles] = useState([]);

  const task_unq = useSelector((state) => state.modal?.modals[0].data.task_unq);
  const entp_unq = useSelector((state) => state.modal.modals[0].data.entp_unq);

  const dispatch = useDispatch();

  useEffect(() => {
    if(task_unq) {
      getTaskDtlInfoAPI(task_unq).then((response) => {
        setAtchFiles(response.taskAtchData);
      })
      .catch((err) => {
        alert(`API Error: ${err}`);
      });
    }else if(entp_unq) {
      getEnterpriseDtlInfo(entp_unq).then((response) => {
        setAtchFiles(response.enterpriseAtchData);
      })
      .catch((err) => {
        alert(`API Error: ${err}`);
      });
    }
  },[])

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'AtchFileListModal',
    }));
  }

  const atchFileDownFormat = (response) => {
    const contentDisposition = response.headers['content-disposition'];

      const fileNameMatch = decodeURI(contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
      .replace(/['"]/g, ''));

      if(fileNameMatch) {
        const blob =  new Blob([response.data], { type: response.headers['content-type'] });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileNameMatch;
        link.click();

        URL.revokeObjectURL(link.href);
      }
  }

  const onClickDownAtchFile = (atch_file_unq) => {
    if(task_unq) {
      downloadTaskAtchFileAPI(atch_file_unq).then((response) => {
        atchFileDownFormat(response);
      })
      .catch((err) => {
        alert(`API Error: ${err}`);
      });
    }else if(entp_unq) {
      downloadEntpAtchFileAPI(atch_file_unq).then((response) => {
        atchFileDownFormat(response);
      })
      .catch((err) => {
        alert(`API Error: ${err}`);
      });
    }
  }

  const onClickAllAtchDown = () => {

  }
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div title='모두 다운로드'>
            <IconImage icon={'ATCHDOWN'} onClickEvent={onClickAllAtchDown}/>
          </div>
          <div>첨부파일</div>
          <div>
            <IconImage icon={'CLOSE'} onClickEvent={handleClose}/>
          </div>
        </div>
        <div className={styles.modal__content}>
          {atchFiles.length > 0 ? atchFiles.map((file, key) => (
            <div>
              <div key={key} onClick={() => onClickDownAtchFile(file.atch_file_unq)}>{file.atch_file_org_nm}</div>
              <div>{file.reg_dtm}</div>
            </div>
          ))
            : null
          }
        </div>
        <div className={styles.modal__btn}>
          <Button value={'닫기'} onClickEvent={handleClose}/>
        </div>
      </div>
    </div>
  )
}

export { AtchFileListModal };

