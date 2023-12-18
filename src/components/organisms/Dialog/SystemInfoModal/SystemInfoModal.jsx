import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { insertSystemInfoAPI } from 'pages/api/Enterprise/EnterpriseAPI';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'reduxStore/modalSlice';
import styles from './SystemInfoModal.module.scss';

const defaultSysData = {
  svr_unq       : '',
  entp_unq      : '',
  svr_hst       : '',
  svr_ip        : '',
  svr_cont      : '',
  use_flag      : 'N',
  resc_use_flag : 'N',
  trn_use_flag  : 'N',
  os_vers       : '',
  kern_vers     : '',
  cpu_cnt       : '',
  total_mem_sz  : '',
  used_mem_sz   : '',
  gpu_model     : '',
  partition_path: '',
  total_disk_sz : '',
  used_disk_sz  : '',
  base_path     : '',
  log_path      : '',
  gnr_memo      : '',
  reg_usr_id    : '',
  reg_dtm       : ''
}

const systemDivsType1 = [
  {data : 'svr_hst'      , type: 'I', label: '서버 호스트'}
, {data : 'os_vers'      , type: 'I', label: 'OS'         }
, {data : 'svr_ip'       , type: 'I', label: '서버 IP'    }
, {data : 'svr_cont'     , type: 'I', label: '서버 용도'  }
, {data : 'kern_vers'    , type: 'I', label: 'kenel'      }
, {data : 'gpu_model'    , type: 'I', label: 'GPU'        }
, {data : 'cpu_cnt'      , type: 'I', label: 'CPU 코어'   }
]

const systemDivsType2 = [
  {data : 'trn_use_flag' , type: 'S', label: '학습 사용'  }
, {data : 'use_flag'     , type: 'S', label: '사용 여부'  }
, {data : 'resc_use_flag', type: 'S', label: '리소스 사용'}
]

const SystemInfoModal = () => {
  const [systemDataList , setSystemDataList ] = useState([]);
  const [systemInputData, setSystemInputData] = useState({...defaultSysData});
  const [systemRowIndex , setSystemRowIndex ] = useState();
  const dispatch = useDispatch();

  const entp_unq = useSelector((state) => state.modal.modals[0].data.entp_unq);

  const handleClose = () => {
    dispatch(closeModal({
      modalTypeToClose: 'SystemInfoModal',
    }));
  }

  const isAnyPropertyNotEmpty = (obj) => {
    const excludedKeys = ['use_flag', 'resc_use_flag', 'trn_use_flag'];

    if(systemDataList.length < 1) {
      return true;
    }else {
      for(const key in obj) {
        if(!excludedKeys.includes(key) && obj[key] !== '') {
          return true;
        }
      }
      return false;
    }
  }

  const onClickMakeServer = () => {
    const isNotEmpty = isAnyPropertyNotEmpty(systemInputData);

    if(!isNotEmpty) {
      alert('시스템 정보를 입력해주세요.');
      return;
    }

    let newData = JSON.parse(JSON.stringify(systemDataList));
    newData.push(defaultSysData);

    setSystemDataList(newData);
    setSystemRowIndex(systemDataList.length);
    setSystemInputData({...defaultSysData});
  }

  const deleteSystemRow = (selectedIndex) => {
    let newData = systemDataList.filter((_, index) => index !== selectedIndex);

    setSystemDataList(newData);
    setSystemRowIndex(systemDataList.length-1);

    if(newData.length < 1) {
      setSystemInputData({...defaultSysData});
    }else {
      setSystemInputData(newData[newData.length-1]);
    }
  }

  const onClickSaveSysInfo = () => {
    const confirmed = window.confirm('저장 하시겠습니까?');

    if(confirmed) {
      insertSystemInfoAPI().then((response) => {
        alert('저장이 완료되었습니다.');
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });
    }
  }

  const onChangeSystemData = (name, value) => {
    setSystemInputData({...systemInputData, [name]: value});

    const newData = JSON.parse(JSON.stringify(systemDataList));
    newData[systemRowIndex] = {...systemInputData, [name]: value};

    setSystemDataList(newData);
  }

  const onChangeSystemUseYnCode = (name, value) => {
    setSystemInputData({...systemInputData, [name]: value});
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
          {systemDataList.map((system, index) => (
            <div>
              {system.svr_hst}
              <IconImage icon={'CLOSE'} onClickEvent={() => deleteSystemRow(index)} />
            </div>
          ))}
          <div onClick={onClickMakeServer}>
            <IconImage icon={'PLUS'} />
          </div>
        </div>
        <div className={styles.modal__content}>
          {systemDivsType1.map((item) => {
            return (
              <>
                <div>
                  <div>{item.label}</div>
                  <input value={systemInputData && systemInputData[item.data]} onChange={(e) => onChangeSystemData(item.data, e.target.value)}/>
                </div>
              </>
            )
          })}
          <div>
            {systemDivsType2.map((item) => {
              return (
                <>
                  <div>
                    <div>{item.label}</div>
                    <Select
                      name  = {item.data}
                      value = {systemInputData && systemInputData[item.data]}
                      onChangeEvent={onChangeSystemUseYnCode}
                      dataSet={[
                        {value: 'Y', text: '사용'},
                        {value: 'N', text: '미사용'},
                      ]}
                    />
                  </div>
                </>
              )})
            }
          </div>
          <div>
            <div>Memory</div>
            <div>
              <div>
                <input value={systemInputData && systemInputData.used_mem_sz} onChange={(e) => onChangeSystemData('used_mem_sz', e.target.value)} placeholder='Used'/>
                G
              </div>
              <div>
              <input value={systemInputData && systemInputData.total_mem_sz} onChange={(e) => onChangeSystemData('total_mem_sz', e.target.value)} placeholder='Total'/>
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
                <input value={systemInputData && systemInputData.partition_path} onChange={(e) => onChangeSystemData('partition_path', e.target.value)} placeholder='Partition Path' />
                <div>
                  <div>
                    <input value={systemInputData && systemInputData.used_disk_sz} onChange={(e) => onChangeSystemData('used_disk_sz', e.target.value)} placeholder='Used'/>
                    G
                  </div>
                  <div>
                    <input value={systemInputData && systemInputData.total_disk_sz} onChange={(e) => onChangeSystemData('total_disk_sz', e.target.value)} placeholder='Total'/>
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

