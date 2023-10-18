
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
import styles from './TaskRegPage.module.scss';
import { IconImage } from 'components/atoms';





const defaultEntpData = {
  entp_nm : '',
  entp_tp : '',
  svc_tp  : '',
}

const defaultCustData = {
  memb_dept_nm : '',
  memb_email   : '',
  memb_nm      : '',
  memb_pst_nm  : '',
  memb_tel     : '',
  principal_tp : ''
}
const delFileArray = [];

const FILE_SIZE_MAX_LIMIT = 20 * 1024 * 1024;

const TaskRegPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate  , setEndDate  ] = useState(new Date());

console.log("startDate = ", startDate);
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
                  name  = 'entp_tp'
                  value = {''}
                  // onChangeEvent = {}
                  // 공통 dataSet으로 만들 예정
                  dataSet = {[
                    {value: 'C', text: "고객사"},
                    {value: 'S', text: "협력사"},
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
                <div></div>
                <Button value={'조회'} />
              </div>
              <div>
              <span className={styles.compulsory}>*</span>
                고객사 담당자
              </div>
              <div>
                <div></div>
                <Button value={'조회'} />
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                작업 담당자
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                담당 부서
              </div>
              <div>
                <div></div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                고객사 담당자 연락처
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                고객사 담당자 이메일
              </div>
              <div>
                <div></div>
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
                      className={styles.datepicker}
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      dateFormat="yyyy년 MM월 dd일"
                      locale={ko}
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
                      className={styles.datepicker}
                      selected={endDate}
                      onChange={date => setEndDate(date)}
                      dateFormat="yyyy년 MM월 dd일"
                      locale={ko}
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
                <Select />
              </div>
              <div>
                서비스 영향
              </div>
              <div>
                <Select
                  // value   = {enterpriseData && enterpriseData.svc_tp}
                  name    = 'svc_tp'
                  dataSet = {[
                    {value: 'R' , text: "실시간"  },
                    {value: 'SR', text: "준실시간"},
                    {value: 'B' , text: "배치"    },
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
                <textarea value={''} />
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

export {TaskRegPage};