import { Button } from 'components/atoms/Button/Button';
import { deleteTaskInfo, downloadTaskAtchFileAPI, getTaskDtlInfoAPI } from 'pages/api/Task/TaskAPI';
import { TaskJobTypeObject, TaskSvcEfc, TaskTypeObject } from 'pages/api/TaskTypeObject';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TaskDtlPage.module.scss';

const TaskDtlPage = () => {
  const [atchFiles       , setAtchFiles       ] = useState([]);
  const [enterpriseData  , setEnterpriseData  ] = useState({});
  const [taskData        , setTaskData        ] = useState({});
  const [custData        , setCustData        ] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const taskNoArr = window.location.search.substring(1).split("=");

    getTaskDtlInfoAPI(taskNoArr[1]).then((response) => {
      setEnterpriseData(response.enterpriseData);
      setTaskData({...response.taskData,
        task_job_tp: TaskJobTypeObject[`${response.taskData.task_job_tp}`] || '알 수 없음',
        task_tp    : TaskTypeObject[`${response.taskData.task_tp}`] || '알 수 없음',
        svc_efc    : TaskSvcEfc[`${response.taskData.svc_efc}`] || '알 수 없음',
      });
      setAtchFiles(response.taskAtchData);
      setCustData(response.enterpriseCustData);
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    })
  },[])

  const handleClickMoveToModify = () => {
    navigate(`/task/register?task_unq=${taskData.task_unq}`);
  }

  const onClickDownAtchFile = (atch_file_unq) => {
    downloadTaskAtchFileAPI(atch_file_unq).then((response) => {
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
    })
    .catch((err) => {
      alert(`API Error: ${err}`);
    });
  }

  const handleClickMoveToMain = () => {
    navigate('/task');
  }

  const onClickDeleteTask = () => {
    const confirmed = window.confirm('작업을 삭제하시겠습니까?');

    if(confirmed) {
      deleteTaskInfo(taskData.task_unq).then((respose) => {

      })
      .catch((err) => {
        alert(`Axios Error: ${err}`);
      });

      alert('삭제되었습니다.');
      navigate('/task');
    }else {
      alert('취소하였습니다.');
    }
  }
  const currentPathName = window.location.pathname;

  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detail__area}>
          <div className={styles.detail__title}>
            <div>
              <h4>{'>'}</h4>
              <h4>작업 상세</h4>
            </div>
            <div>
              <Button value={'수정'} onClickEvent={handleClickMoveToModify}/>
              <Button value={'삭제'} onClickEvent={onClickDeleteTask}/>
              <Button value={'메인으로'} onClickEvent={handleClickMoveToMain} />
            </div>
          </div>
          <div className={styles.detail__content}>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                는 필수 입력사항입니다.
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                지원 유형
              </div>
              <div>
                <div>{taskData.task_tp}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                회사명
              </div>
              <div>
                <div>{enterpriseData?.entp_nm}</div>
              </div>
              <div>
              <span className={styles.compulsory}>*</span>
                고객사 담당자
              </div>
              <div>
                <div>{custData?.memb_nm}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 담당자
              </div>
              <div>
                <div>{taskData?.task_usr_nm}</div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                담당 부서
              </div>
              <div>
                <div>{custData?.memb_dept_nm}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                고객사 담당자 연락처
              </div>
              <div>
                <div>{custData?.memb_tel}</div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                고객사 담당자 이메일
              </div>
              <div>
                <div>{custData?.memb_email}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 시작 일시
              </div>
              <div>
                <div>
                  <div>{taskData.task_st_dt}</div>
                  <div>{taskData.task_st_dt && taskData.task_st_tm.split(":")[0]} 시</div>
                  <div>{taskData.task_st_dt && taskData.task_st_tm.split(":")[1]} 분</div>
                </div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 종료 일시
              </div>
              <div>
                <div>
                  <div>{taskData.task_ed_dt}</div>
                  <div>{taskData.task_ed_tm && taskData.task_ed_tm.split(":")[0]} 시</div>
                  <div>{taskData.task_ed_tm && taskData.task_ed_tm.split(":")[1]} 분</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 방식
              </div>
              <div>
                <div>{taskData.task_job_tp}</div>
              </div>
              <div>
                서비스 영향
              </div>
              <div>
                <div>{taskData.svc_efc && taskData.svc_efc}</div>
              </div>
            </div>
            <div>
              <div>월 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  <div>{taskData && taskData.stt_month_total_cnt}</div>
                  <div>성공</div>
                  <div>{taskData && taskData.stt_month_s_cnt}</div>
                  <div>실패</div>
                  <div>{taskData && taskData.stt_month_f_cnt}</div>
                </div>
              </div>
            </div>
            <div>
              <div>일 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  <div>{taskData && taskData.stt_day_total_cnt}</div>
                  <div>성공</div>
                  <div>{taskData && taskData.stt_day_s_cnt}</div>
                  <div>실패</div>
                  <div>{taskData && taskData.stt_day_f_cnt}</div>
                </div>
              </div>
            </div>
            <div>
              <div>작업 내용</div>
              <div>
                <div>{taskData && taskData.task_memo}</div>
              </div>
            </div>
          </div>
          <div className={styles.detail__file}>
            <div className={`${styles['detail__file--th']}`}>첨부파일</div>
            <div className={`${styles['detail__file--td']}`}>
              <div>
                {atchFiles && atchFiles.map((file, index) => (
                  <div key={index}>
                    <div>
                      <div onClick={() => onClickDownAtchFile(file.atch_file_unq)}>{file.name || file.atch_file_org_nm}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { TaskDtlPage };

