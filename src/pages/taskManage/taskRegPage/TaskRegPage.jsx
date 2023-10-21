
import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { ko } from 'date-fns/esm/locale';
import { getEnterpriseDtlInfo } from 'pages/api/Enterprise/EnterpriseAPI';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { initModal, openModal } from 'reduxStore/modalSlice';
import styles from './TaskRegPage.module.scss';


const defaultTaskData = {

}

const delFileArray = [];

const FILE_SIZE_MAX_LIMIT = 20 * 1024 * 1024;

const TaskRegPage = () => {
  const [startDate       , setStartDate       ] = useState(new Date());
  const [endDate         , setEndDate         ] = useState(new Date());
  const [enterpriseData  , setEnterpriseData  ] = useState({});
  const [taskData        , setTaskData        ] = useState({});
  const [selectedCust    , setSelectedCust    ] = useState({});
  const [selectedTaskMemb, setSelectedTaskMemb] = useState({});

  const dispatch = useDispatch();

  const entpNoArr = window.location.search.substring(1).split("=");

  const selectedCustProps     = useSelector((state) => state?.modal.data.selectedCust);
  const selectedTaskMembProps = useSelector((state) => state?.modal.data.selectedTaskMemb);

  useEffect(() => {
    getEnterpriseDtlInfo(entpNoArr[1]).then((response) => {
      setEnterpriseData(response.enterpriseData);
    });
    dispatch(initModal());
  }, [])

  useEffect(() => {
    if(selectedCustProps) {
      setSelectedCust(selectedCustProps);
    }
    if(selectedTaskMembProps) {
      setSelectedTaskMemb(selectedTaskMembProps);
    }

  },[useSelector((state) => state?.modal.data)])

  const openSerachModal = (modalType, target) => {
    switch(target) {
      case '고객사담당':
        dispatch(
          openModal({
            modalType : modalType,
            isOpen    : true,
            data: {'entp_unq' : entpNoArr[1]},
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
            data: {'entp_unq' : entpNoArr[1]},
          })
        );
    }
  }

  const onChangeTaskInfoCode = (name, value) => {
    setTaskData((prev) => {
      return {...prev, [name]: value};
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
              {/* {entp_unq !== null || '' */}
                ? <Button value={'수정'} />
                : <Button value={'등록'} />
              {/* } */}
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
                  name  = 'task_tp'
                  value = {taskData.task_tp}
                  onChangeEvent = {onChangeTaskInfoCode}
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
                <Button value={'조회'} onClickEvent={() => openSerachModal('SearchEntpModal', '업체조회')} />
              </div>
              <div>
              <span className={styles.compulsory}>*</span>
                고객사 담당자
              </div>
              <div>
                <div>{selectedCust?.memb_nm}</div>
                <Button value={'조회'} onClickEvent={() => openSerachModal('SearchMembModal', '고객사담당')} />
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 담당자
              </div>
              <div>
                <div>{selectedTaskMemb?.memb_nm}</div>
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
                      selected   = {startDate}
                      onChange   = {date => setStartDate(date)}
                      dateFormat = "yyyy년 MM월 dd일"
                      locale     = {ko}
                    />
                    <IconImage icon={'CALENDAR'} />
                  </label>
                  <Select />
                  <Select />
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
                      selected   = {endDate}
                      onChange   = {date => setEndDate(date)}
                      dateFormat = "yyyy년 MM월 dd일"
                      locale     = {ko}
                    />
                    <IconImage icon={'CALENDAR'} />
                  </label>
                  <Select />
                  <Select />
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
                  onChangeEvent = {onChangeTaskInfoCode}
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
                  dataSet = {[
                    {value: '3', text: "상"  },
                    {value: '2', text: "중"  },
                    {value: '1', text: "하"  },
                    {value: '0', text: "없음"},
                  ]}
                  // onChangeEvent={onChangeEnterpriseCode}
                />
              </div>
            </div>
            <div>
              <div>월 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  <input />
                  <div>성공</div>
                  <input />
                  <div>실패</div>
                  <input />
                </div>
              </div>
            </div>
            <div>
              <div>일 STT 처리건수</div>
              <div>
                <div>
                  <div>총 건수</div>
                  <input />
                  <div>성공</div>
                  <input />
                  <div>실패</div>
                  <input />
                </div>
              </div>
            </div>
            <div>
              <div>작업 내용</div>
              <div>
                {/* <textarea value={'ddd'} /> */}
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
                  // onChange = {onSelectFile}
                />
                <label htmlFor='fileInput'>
                  <div>첨부하기</div>
                </label>
              </div>
              <div>
                {/* {atchFiles && atchFiles.map((file, index) => ( */}
                  <div>
                    <div>
                      <div>{''}</div>
                    </div>
                    <button className={`${styles.closeBtn} ${styles.close}`}>
                      <span className={`${styles['a11y--hidden']}`}>닫기</span>
                    </button>
                  </div>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { TaskRegPage };
