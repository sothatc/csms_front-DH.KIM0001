import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './SystemInfoModal.module.scss';



const SystemInfoModal = () => {
  const [systemDataList, setSystemDataList] = useState([]);

  const dispatch = useDispatch();

  const entp_unq = useSelector((state) => state.modal.modals[0].data.entp_unq);

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'SystemInfoModal',
    }));
  }

  const onClickMakeServer = () => {

  }

  const onClickSaveSysInfo = () => {

  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div></div>
          <div>시스템 정보</div>
          <div className={styles.close} onClick={handleClose}>
            <IconImage icon={'CLOSE'} onClickEvent={handleClose} />
          </div>
        </div>
        <div className={styles.modal__servers}>
          {/* map */}
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          {/* 더미 server 데이터 */}
          <div>
            KRPCMPLV
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          <div>
            KRPCMPLVRM310
            <IconImage icon={'CLOSE'} />
          </div>
          {/* server 추가 버튼 */}
          <div>
            <IconImage icon={'PLUS'} onClickEvent={onClickMakeServer}/>
          </div>
        </div>
        <div className={styles.modal__content}>
          <div>
            <div>서버 Hostname</div>
            <input />
          </div>
          <div>
            <div>서버 IP</div>
            <input />
          </div>
          <div>
            <div>서버 용도</div>
            <input />
          </div>
          <div>
            <div>Kernel</div>
            <input />
          </div>
          <div>
            <div>GPU Model</div>
            <input />
          </div>
          <div>
            <div>기본경로</div>
            <input />
          </div>
          <div>
            <div>로그경로</div>
            <input />
          </div>
          <div>
            <div>
              <div>사용 여부</div>
              <Select
                dataSet={[
                  {value: 'Y', text: '사용'},
                  {value: 'Y', text: '미사용'},
                ]}
              />
            </div>
            <div>
              <div>학습 사용</div>
              <Select

                dataSet={[
                  {value: 'Y', text: '사용'},
                  {value: 'Y', text: '미사용'},
                ]}
              />
            </div>
            <div>
              <div>리소스 사용</div>
              <Select
                dataSet={[
                  {value: 'Y', text: '사용'},
                  {value: 'Y', text: '미사용'},
                ]}
              />
            </div>
          </div>
          <div>
            <div>Memory</div>
            <div>
              <div>
                <input placeholder='Used'/>
                G
              </div>
              <div>
                <input placeholder='Total'/>
                G
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>Disk</div>
              <IconImage icon={'PLUS'}/>
            </div>
            <div>
              {/* map */}
              <div>
                <input placeholder='Partition' />
                <div>
                  <div>
                    <input placeholder='Used'/>
                    G
                  </div>
                  <div>
                    <input placeholder='Total'/>
                    G
                  </div>
                </div>
                <IconImage icon={'CLOSE'} />
              </div>
              {/* 더미 disk 데이터 */}
              <div>
                <input placeholder='Partition' />
                <div>
                  <div>
                    <input placeholder='Used'/>
                    G
                  </div>
                  <div>
                    <input placeholder='Total'/>
                    G
                  </div>
                </div>
              </div>
              <div>
                <input placeholder='Partition' />
                <div>
                  <div>
                    <input placeholder='Used'/>
                    G
                  </div>
                  <div>
                    <input placeholder='Total'/>
                    G
                  </div>
                </div>
              </div>
              <div>
                <input placeholder='Partition' />
                <div>
                  <div>
                    <input placeholder='Used'/>
                    G
                  </div>
                  <div>
                    <input placeholder='Total'/>
                    G
                  </div>
                </div>
              </div>
              {/* 더비 disk 데이터 끝 */}
            </div>
          </div>
        </div>
        <div className={styles.modal__btn}>
          <Button value={'저장'} onClickEvent={onClickSaveSysInfo}/>
          <Button value={'닫기'} onClickEvent={handleClose}/>
        </div>
      </div>
    </div>
  )
}

export { SystemInfoModal };

