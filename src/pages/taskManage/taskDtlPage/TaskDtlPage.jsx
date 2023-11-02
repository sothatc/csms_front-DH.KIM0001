import { Select } from 'components/atoms/Select/Select';
import styles from './TaskDtlPage.module.scss';
import { useEffect, useState } from 'react';
import { Button } from 'components/atoms/Button/Button';
import { getTaskDtlInfoAPI } from 'pages/api/Task/TaskAPI';

const TaskDtlPage = () => {
  const [selectedCust, setSelectCust] = useState({});
  const [atchFiles, setAtchFiles] = useState([]);
  const [enterpriseData, setEnterpriseData] = useState({});
  const [selectedTaskMemb, setSelectedTaskMemb] = useState({});

  useEffect(() => {
    // getTaskDtlInfoAPI().then((response) => {
    //   console.log("taskDtl response = ", response);
    // })
    // .catch((error) => {
    //   alert(`Error: ${error}`);
    // })
  },[])

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
              <Button value={'수정'} />
              <Button value={'메인으로'}/>
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
                <Select
                  name  = 'task_tp'
                  // value = {taskData.task_tp}
                  // onChangeEvent = {onChangeTaskInfoCode}
                  dataSet = {[
                    {value: 'INS', text: "정기정검"   },
                    {value: 'ISS', text: "이슈"       },
                    {value: 'SET', text: "설정변경"   },
                    {value: 'TRN', text: "학습수행"   },
                    {value: 'ACC', text: "인식률 측정"},
                    {value: 'DEV', text: "개발적용"   },
                    {value: 'EDT', text: "수정적용"   },
                  ]}
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
              </div>
              <div>
              <span className={styles.compulsory}>*</span>
                고객사 담당자
              </div>
              <div>
                <div>{selectedCust?.memb_nm}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 담당자
              </div>
              <div>
                <div>{selectedTaskMemb?.task_usr_nm}</div>
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
                  {/* <label>
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
                    pattern     = '\d{2}'
                    onChange    = {(e) => limitInputTimeToTwoNum('startHour', e)}
                  />
                  <div>시</div>
                  <input
                    value       = {inputTime.startMinute}
                    pattern     = '\d{2}'
                    onChange    = {(e) => limitInputTimeToTwoNum('startMinute', e)}
                  />
                  <div>분</div> */}
                </div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 종료 일시
              </div>
              <div>
                <div>
                  {/* <label>
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
                    pattern  = '\d{2}'
                    onChange = {(e) => limitInputTimeToTwoNum('endHour', e)}
                  />
                  <div>시</div>
                  <input
                    value    = {inputTime.endMinute}
                    pattern  = '\d{2}'
                    onChange = {(e) => limitInputTimeToTwoNum('endMinute', e)}
                  />
                  <div>분</div> */}
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
                  // value   = {taskData.task_job_tp}
                  // onChangeEvent = {onChangeTaskInfoCode}
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
                  // value = {taskData.svc_efc}
                  // onChangeEvent={onChangeTaskInfoCode}
                  dataSet = {[
                    {value: '3', text: "상"  },
                    {value: '2', text: "중"  },
                    {value: '1', text: "하"  },
                    {value: '0', text: "없음"},
                  ]}
                />
              </div>
            </div>
            <div>
              <div>월 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  {/* <input value={taskData.stt_month_total_cnt} /> */}
                  <input  />
                  <div>성공</div>
                  {/* <input value={taskData.stt_month_s_cnt} onChange={(e) => onChangeSTTCnt('stt_month_s_cnt', e)}/> */}
                  <input />
                  <div>실패</div>
                  {/* <input value={taskData.stt_month_f_cnt} onChange={(e) => onChangeSTTCnt('stt_month_f_cnt', e)}/> */}
                  <input />
                </div>
              </div>
            </div>
            <div>
              <div>일 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  {/* <input value={taskData.stt_day_total_cnt} /> */}
                  <input />
                  <div>성공</div>
                  {/* <input value={taskData.stt_day_s_cnt} onChange={(e) => onChangeSTTCnt('stt_day_s_cnt', e)}/> */}
                  <input/>
                  <div>실패</div>
                  {/* <input value={taskData.stt_day_f_cnt} onChange={(e) => onChangeSTTCnt('stt_day_f_cnt', e)}/> */}
                  <input />
                </div>
              </div>
            </div>
            <div>
              <div>작업 내용</div>
              <div>
                {/* <textarea value={taskData.task_memo} onChange={(e) => onChangeTaskData('task_memo', e)}/> */}
                <textarea />
              </div>
            </div>
          </div>
          <div className={styles.detail__file}>
            <div className={`${styles['detail__file--th']}`}>첨부파일</div>
            <div className={`${styles['detail__file--td']}`}>
              <div>
                <input
                  // id       = 'fileInput'
                  // type     = 'file'
                  // multiple = 'multiple'
                  // onChange = {onSelectFile}
                />
                <label htmlFor='fileInput'>
                  <div>첨부하기</div>
                </label>
              </div>
              <div>
                {atchFiles && atchFiles.map((file, index) => (
                  <div key={index}>
                    <div>
                      <div>{file.name || file.atch_file_nm}</div>
                    </div>
                    {/* <button className={`${styles.closeBtn} ${styles.close}`} onClick={() => onClickOneDeleteFile(index)}> */}
                    <button className={`${styles.closeBtn} ${styles.close}`} >
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

export {TaskDtlPage};