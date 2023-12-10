
import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { getEnterpriseDtlInfo } from 'pages/api/Enterprise/EnterpriseAPI';
import { getTaskDtlInfoAPI, insertTaskInfoAPI, updateTaskInfoAPI } from 'pages/api/Task/TaskAPI';
import { TaskSvcEfc, TaskTypeObject } from 'pages/api/TaskTypeObject';
import { GenerateOptions } from 'pages/api/common/dataSet/dataSet';
import { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initModal, openModal, selectModals } from 'reduxStore/modalSlice';
import styles from './TaskRegPage.module.scss';

const FILE_SIZE_MAX_LIMIT = 20 * 1024 * 1024;

const HourDataSet = [];
for (let i = 9; i <= 23; i++) {
  const value = i < 10 ? `0${i}` : `${i}`;
  HourDataSet.push({ value, text: `${i}시` });
}
HourDataSet.push({ value: '00', text: '00시' });

const MinuteDataSet = [];
for (let i = 0; i <= 60; i += 10) {
  const value = i < 10 ? `0${i}` : `${i}`;
  MinuteDataSet.push({ value, text: `${value}분` });
}

const delFileArray = [];

const TaskRegPage = () => {
  const [enterpriseData  , setEnterpriseData  ] = useState({});
  const [atchFiles       , setAtchFiles       ] = useState([]);
  const [taskData        , setTaskData        ] = useState({
    stt_month_total_cnt: 0,
    stt_month_s_cnt    : 0,
    stt_month_f_cnt    : 0,
    stt_day_total_cnt  : 0,
    stt_day_s_cnt      : 0,
    stt_day_f_cnt      : 0,
    task_st_dt : new Date(),
    task_ed_dt : new Date(),
    task_st_tm : '',
    task_ed_tm : '',
    task_job_tp: 'VST',
  });
  const [selectedCust    , setSelectedCust    ] = useState({});
  const [selectedTaskMemb, setSelectedTaskMemb] = useState({});
  const [dateString      , setDateString      ] = useState({
    task_st_dt: '',
    task_ed_dt: '',
  });
  const [inputTime       , setInputTime       ] = useState({
    startHour   : '',
    endHour     : '',
    startMinute : '',
    endMinute   : '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate() ;

  // const selectedCustProps     = useSelector(selectModals);
  // const selectedTaskMembProps = useSelector(selectModals);
  // const selectedEntpProps     = useSelector(selectModals);
  // console.log("selectedCustProps = ", selectedCustProps);
  const selectedCustProps     = useSelector((state) => state?.modal.data.data?.selectedCust);
  const selectedTaskMembProps = useSelector((state) => state?.modal.data.data?.selectedTaskMemb);
  const selectedEntpProps     = useSelector((state) => state?.modal.data.data?.selectedEntpProps);

  const queryString = window.location.search.substring(1).split("=");
  let entpNoArr = '';
  let taskNoArr = '';

  if(queryString[0] === 'entp_unq') {
    entpNoArr = window.location.search.substring(1).split("=");
  }else if(queryString[0] === 'task_unq') {
    taskNoArr = window.location.search.substring(1).split("=");
  }

  const taskTpOptions = useMemo(() => GenerateOptions(TaskTypeObject), []);
  const svcEfcOptions = useMemo(() => GenerateOptions(TaskSvcEfc), []);

  useEffect(() => {
    if(entpNoArr !== '') {
      getEnterpriseDtlInfo(entpNoArr[1]).then((response) => {
        setEnterpriseData(response.enterpriseData);
      })
      .catch((err) => {
        alert(`API Error: ${err}`);
      });
      dispatch(initModal());

    }else if(taskNoArr !== '') {
      getTaskDtlInfoAPI(taskNoArr[1]).then((response) => {
        const rsTaskData = response.taskData;

        setTaskData({...rsTaskData,
          task_st_dt: new Date(rsTaskData.task_st_dt),
          task_ed_dt: new Date(rsTaskData.task_ed_dt),
        });
        setSelectedCust({...response.enterpriseCustData});
        setSelectedTaskMemb({...rsTaskData});
        setEnterpriseData({...response.enterpriseData});
        setAtchFiles([...response.taskAtchData]);
        setInputTime({
          startHour  : rsTaskData.task_st_tm.split(':')[0],
          startMinute: rsTaskData.task_st_tm.split(':')[1],
          endHour    : rsTaskData.task_ed_tm.split(':')[0],
          endMinute  : rsTaskData.task_ed_tm.split(':')[1],
        });
      })
      .catch((err) => {
        alert(`API Error: ${err}`);
      });
    }
  }, [])

  useEffect(() => {
    if(selectedCustProps) {
      setSelectedCust(selectedCustProps);
    }
    if(selectedTaskMembProps) {
      setSelectedTaskMemb(selectedTaskMembProps);
    }
    if(selectedEntpProps) {
      setEnterpriseData(selectedEntpProps);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[useSelector((state) => state?.modal.data)])

  const openSerachModal = (modalType, target) => {
    switch(target) {
      case '고객사담당':
        dispatch(
          openModal({
            modalType : modalType,
            isOpen    : true,
            data: {'entp_unq' : enterpriseData.entp_unq},
          })
        );
        break;
      case '작업담당':
        dispatch(
          openModal({
            modalType : modalType,
            isOpen    : true,
            data: {},
          })
        );
        break;
      default:
        dispatch(
          openModal({
            modalType : modalType,
            isOpen    : true,
            // data: {'entp_unq' : enterpriseData.entp_unq},
            data: {},
          })
        );
    }
  }

  const onChangeTaskDateParsing = (name, date) => {
    onChangeTaskInfoCode(name, date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const twoDigitMonth = month.toString().padStart(2, '0');
    const day = date.getDate();
    const twoDigitDay = day.toString().padStart(2, '0');

    const dateString = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    const parseISODate = parseISO(dateString);
    const formattedDate = format(parseISODate, 'yyyy-MM-dd');

    setDateString((prev) => {
      return {...prev, [name]: formattedDate};
    });
  }

  const onChangeTaskInfoCode = (name, value) => {
    setTaskData((prev) => {
      return {...prev, [name]: value};
    })
  }

  const onChangeSTTCnt = (name, e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    const numericValue = parseFloat(value);

    if(name === 'stt_month_s_cnt' || name === 'stt_month_f_cnt') {
      setTaskData((prev) => ({
        ...prev,
        [name]: numericValue,
        stt_month_total_cnt: name === "stt_month_s_cnt"
          ? numericValue + prev.stt_month_f_cnt
          : name === "stt_month_f_cnt"
            ? prev.stt_month_s_cnt + numericValue
            : prev.stt_month_total_cnt
      }));
    }else if(name === 'stt_day_s_cnt' || name === 'stt_day_f_cnt'){
      setTaskData((prev) => ({
        ...prev,
        [name]: numericValue,
        stt_day_total_cnt: name === "stt_day_s_cnt"
          ? numericValue + prev.stt_day_f_cnt
          : name === "stt_day_f_cnt"
            ? prev.stt_day_s_cnt + numericValue
            : prev.stt_day_total_cnt
      }));
    }
  }

  const onChangeTaskData = (name, e) => {
    setTaskData({...taskData, [name]: e.target.value});
  }

  const limitInputTimeToTwoNum = (name, e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, '');
    if(value.length > 2) {
      value = value.slice(0,2);
    }

    if(name === 'startHour' || name === 'endHour') {
      if(value > 24) {
        alert('24를 초과 입력할 수 없습니다.');
        return;
      }
    }
    setInputTime({...inputTime, [name] : value});
  }

  const isInsertEssentialValue = (value) => {
    if(value === '' || value === null || value === undefined) {
      alert('필수사항을 입력해주세요.');
      return false;
    }
    return true;
  }

  const onClickInsertTaskInfo = () => {

    const boolIsValue = isInsertEssentialValue(taskData.task_tp);

    if(!boolIsValue) {
      return;
    }

    if(totalFileSizeInByte > FILE_SIZE_MAX_LIMIT){
      alert('파일 최대 용량은 20MB입니다.');
      return;
    }

    const newTaskData = taskData;
    newTaskData['flag']         = 'I';
    newTaskData['task_st_tm']   = `${inputTime.startHour.padStart(2, '0')}:${inputTime.startMinute.padStart(2, '0')}`;
    newTaskData['task_ed_tm']   = `${inputTime.endHour.padStart(2, '0')}:${inputTime.endMinute.padStart(2, '0')}`;

    newTaskData['cust_unq']     = selectedCust.cust_unq;
    newTaskData['entp_unq']     = selectedCust.entp_unq;

    newTaskData['task_dept']    = selectedTaskMemb.task_dept;
    newTaskData['task_usr_unq'] = selectedTaskMemb.task_usr_unq;
    newTaskData['task_usr_nm']  = selectedTaskMemb.task_usr_nm;

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const twoDigitMonth = month.toString().padStart(2, '0');
    const day = date.getDate();
    const twoDigitDay = day.toString().padStart(2, '0');

    const dateStr = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    const parseISODate = parseISO(dateStr);
    const formattedDate = format(parseISODate, 'yyyy-MM-dd');

    if(dateString.task_st_dt === '') {
      newTaskData['task_st_dt'] = formattedDate;
    }else {
      newTaskData['task_st_dt'] = dateString.task_st_dt;
    }

    if(dateString.task_ed_dt === '') {
      newTaskData['task_ed_dt'] = formattedDate;
    }else {
      newTaskData['task_ed_dt'] = dateString.task_ed_dt;
    }


    let formData = new FormData();

    formData.append('taskData', JSON.stringify(newTaskData));

    atchFiles?.forEach((atchFile) => {
      formData.append('files', atchFile);
    });

    insertTaskInfoAPI(formData)
      .then((resolve) => {
        alert("작업 등록 완료");
        navigate('/task');
      })
      .catch((err) => {
        alert(`API Error: ${err}`);
      });
  }

  const onClickOneDeleteFile = (index) => {
    delFileArray.push(atchFiles[index].atch_file_unq);
    const remainingFiles = atchFiles.filter((_, idx) => idx !== index);
    setAtchFiles([...remainingFiles]);
  }

  const onSelectFile = (e) => {
    const selectFiles = e.target.files;
    setAtchFiles((prev) => [...prev, ...selectFiles]);
  }

  const totalFileSizeInByte = useMemo(() => {
    let totalSize = 0;

    atchFiles.forEach((file) => {
      totalSize += file.size;
    });

    return totalSize;
  }, [atchFiles])

  const onClickModifyTaskInfo = () => {

    if(totalFileSizeInByte > FILE_SIZE_MAX_LIMIT){
      alert('파일 최대 용량은 20MB입니다.');
      return;
    }

    const newTaskData = taskData;
    newTaskData['flag']           = 'U';
    newTaskData['delAtchFileNum'] = delFileArray.join(',');
    newTaskData['task_st_tm']     = `${inputTime.startHour.padStart(2, '0')}:${inputTime.startMinute.padStart(2, '0')}`;
    newTaskData['task_ed_tm']     = `${inputTime.endHour.padStart(2, '0')}:${inputTime.endMinute.padStart(2, '0')}`;

    newTaskData['cust_unq']       = selectedCust.cust_unq;
    newTaskData['entp_unq']       = selectedCust.entp_unq;

    newTaskData['task_dept']      = selectedTaskMemb.task_dept;
    newTaskData['task_usr_nm']    = selectedTaskMemb.task_usr_nm;
    newTaskData['task_usr_unq']   = selectedTaskMemb.task_usr_unq;

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const twoDigitMonth = month.toString().padStart(2, '0');
    const day = date.getDate();
    const twoDigitDay = day.toString().padStart(2, '0');

    const dateStr = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    const parseISODate = parseISO(dateStr);
    const formattedDate = format(parseISODate, 'yyyy-MM-dd');

    if(dateString.task_st_dt === '') {
      newTaskData['task_st_dt'] = formattedDate;
    }else {
      newTaskData['task_st_dt'] = dateString.task_st_dt;
    }

    if(dateString.task_ed_dt === '') {
      newTaskData['task_ed_dt'] = formattedDate;
    }else {
      newTaskData['task_ed_dt'] = dateString.task_ed_dt;
    }


    let formData = new FormData();

    formData.append('taskData', JSON.stringify(newTaskData));

    atchFiles?.forEach((atchFile) => {
      formData.append('files', atchFile);
    });

    updateTaskInfoAPI(formData).then((response) => {
      alert("작업 수정 완료");
      navigate('/task');
    })
    .catch((err) => {
      alert(`API Error: ${err}`);
    })
  }

  return (
    <>
      <div className={styles.register}>
        <div className={styles.register__area}>
          <div className={styles.register__title}>
            <div>
              <h4>{'>'}</h4>
              <h4>작업 등록</h4>
            </div>
            <div>
              {taskNoArr !== null && taskNoArr !==''
                ? <Button value={'저장'} onClickEvent={onClickModifyTaskInfo}/>
                : <Button value={'등록'} onClickEvent={onClickInsertTaskInfo}/>
              }
              <Button value={'취소'}/>
            </div>
          </div>
          <div className={styles.register__content}>
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
                <Select
                  name    = 'task_tp'
                  value   = {taskData.task_tp}
                  dataSet = {taskTpOptions}
                  onChangeEvent = {onChangeTaskInfoCode}
                />
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                회사명
              </div>
              <div>
                <div>{enterpriseData?.entp_nm}</div>
                <Button value={'조회'} onClickEvent={() => openSerachModal('SearchEntpModal', '업체조회')} />
              </div>
              <div>
              <span className={styles.compulsory}>*</span>
                고객사 담당자
              </div>
              <div>
                <div>{selectedCust?.memb_nm}</div>
                <Button value={'조회'} onClickEvent={() => openSerachModal('SearchCustModal', '고객사담당')} />
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 담당자
              </div>
              <div>
                <div>{selectedTaskMemb?.task_usr_nm}</div>
                <Button value={'조회'} onClickEvent={() => openSerachModal('SearchTaskMembModal', '작업담당')} />
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                담당 부서
              </div>
              <div>
                <div>{selectedCust?.memb_dept_nm}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                고객사 담당자 연락처
              </div>
              <div>
                <div>{selectedCust?.memb_tel}</div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                고객사 담당자 이메일
              </div>
              <div>
                <div>{selectedCust?.memb_email}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 시작 일시
              </div>
              <div>
                <div>
                  <label>
                    <DatePicker
                      className  = {styles.datepicker}
                      selected   = {taskData.task_st_dt}
                      onChange   = {date => onChangeTaskDateParsing('task_st_dt', date)}
                      dateFormat = "yyyy년 MM월 dd일"
                      locale     = {ko}
                    />
                    <IconImage icon={'CALENDAR'} />
                  </label>
                  <input
                    value       = {inputTime.startHour}
                    placeholder = '24시간'
                    pattern     = '\d{2}'
                    onChange    = {(e) => limitInputTimeToTwoNum('startHour', e)}
                  />
                  <div>시</div>
                  <input
                    value       = {inputTime.startMinute}
                    pattern     = '\d{2}'
                    onChange    = {(e) => limitInputTimeToTwoNum('startMinute', e)}
                  />
                  <div>분</div>
                </div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 종료 일시
              </div>
              <div>
                <div>
                  <label>
                    <DatePicker
                      className  = {styles.datepicker}
                      selected   = {taskData.task_ed_dt}
                      onChange   = {date => onChangeTaskDateParsing('task_ed_dt', date)}
                      dateFormat = "yyyy년 MM월 dd일"
                      locale     = {ko}
                    />
                    <IconImage icon={'CALENDAR'} />
                  </label>
                  <input
                    value    = {inputTime.endHour}
                    placeholder = '24시간'
                    pattern  = '\d{2}'
                    onChange = {(e) => limitInputTimeToTwoNum('endHour', e)}
                  />
                  <div>시</div>
                  <input
                    value    = {inputTime.endMinute}
                    pattern  = '\d{2}'
                    onChange = {(e) => limitInputTimeToTwoNum('endMinute', e)}
                  />
                  <div>분</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 방식
              </div>
              <div>
                <Select
                  name    = {'task_job_tp'}
                  value   = {taskData.task_job_tp}
                  onChangeEvent  = {onChangeTaskInfoCode}
                  dataSet = {[
                    {value: 'VST', text: '방문'},
                    {value: 'RMT', text: '원격'},
                  ]}
                />
              </div>
              <div>
                서비스 영향
              </div>
              <div>
                <Select
                  name  = 'svc_efc'
                  value = {taskData.svc_efc}
                  onChangeEvent={onChangeTaskInfoCode}
                  dataSet = {svcEfcOptions}
                />
              </div>
            </div>
            <div>
              <div>월 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  <input value={taskData.stt_month_total_cnt} />
                  <div>성공</div>
                  <input value={taskData.stt_month_s_cnt} onChange={(e) => onChangeSTTCnt('stt_month_s_cnt', e)}/>
                  <div>실패</div>
                  <input value={taskData.stt_month_f_cnt} onChange={(e) => onChangeSTTCnt('stt_month_f_cnt', e)}/>
                </div>
              </div>
            </div>
            <div>
              <div>일 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  <input value={taskData.stt_day_total_cnt} />
                  <div>성공</div>
                  <input value={taskData.stt_day_s_cnt} onChange={(e) => onChangeSTTCnt('stt_day_s_cnt', e)}/>
                  <div>실패</div>
                  <input value={taskData.stt_day_f_cnt} onChange={(e) => onChangeSTTCnt('stt_day_f_cnt', e)}/>
                </div>
              </div>
            </div>
            <div>
              <div>작업 내용</div>
              <div>
                <textarea value={taskData.task_memo} onChange={(e) => onChangeTaskData('task_memo', e)}/>
              </div>
            </div>
          </div>
          <div className={styles.register__file}>
            <div className={`${styles['register__file--th']}`}>첨부파일</div>
            <div className={`${styles['register__file--td']}`}>
              <div>
                <input
                  id       = 'fileInput'
                  type     = 'file'
                  multiple = 'multiple'
                  onChange = {onSelectFile}
                />
                <label htmlFor='fileInput'>
                  <div>첨부하기</div>
                </label>
              </div>
              <div>
                {atchFiles && atchFiles.map((file, index) => (
                  <div key={index}>
                    <div>
                      <div>{file.name || file.atch_file_org_nm}</div>
                    </div>
                    <button className={`${styles.closeBtn} ${styles.close}`} onClick={() => onClickOneDeleteFile(index)}>
                      <span className={`${styles['a11y--hidden']}`}>닫기</span>
                    </button>
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

export { TaskRegPage };

