import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { delDiskInfoAPI, delSystemInfoAPI, getSystemInfoList, insertDiskAPI, insertSystemServerAPI, updateSystemServerAPI } from 'pages/api/Enterprise/EnterpriseAPI';
import { useEffect, useRef, useState } from 'react';
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
  base_path     : '',
  log_path      : '',
  gnr_memo      : '',
  reg_usr_id    : '',
  reg_dtm       : '',
}

const defaultDiskData = {
  svr_unq        : '',
  partition_path : '',
  used_disk_sz   : '',
  total_disk_sz  : '',
}

const systemDivsType1 = [
  {data : 'os_vers'      , type: 'I', label: 'OS'         }
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
  const [systemRowIndex , setSystemRowIndex ] = useState(0);
  const [diskDataList   , setDiskDataList   ] = useState([]);
  const [diskInputData  , setDiskInputData  ] = useState({...defaultDiskData});
  const [focusTrigger   , setFocusTrigger   ] = useState(false);
  const [boolDataSave   , setBoolDataSave   ] = useState(true);
  const [newSysServerUnq, setNewSysServerUnq] = useState();
  const [newDiskUnqList , setNewDiskUnqList ] = useState([]);
  const [enabledEdit    , setEnabledEdit    ] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const entp_unq = useSelector((state) => state.modal.modals[0].data.entp_unq);

  /** ToDo: async를 사용해야 되는지 확인 */
  const callSystemInfoAPIFn = (object) => {
    return getSystemInfoList(object).then((response) => {
      setSystemDataList(response.enterpriseSvrDTOList);
      setDiskDataList(response.enterpriseSvrDiskDTOList);
      return response;
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  }

  useEffect(() => {
    if(focusTrigger && inputRef.current) {
      inputRef.current.focus();
      setFocusTrigger(false);
    }

    callSystemInfoAPIFn(entp_unq).then((response) => {
      setDiskInputData(response.enterpriseSvrDiskDTOList[0]);
      setSystemInputData(response.enterpriseSvrDTOList[0]);
    }).catch((err) => {});

  }, [focusTrigger])

  const handleClose = () => {

    if(!boolDataSave) {
      const confirmed = window.confirm('저장하지 않은 데이터가 있습니다. 닫으시겠습니까?');
      if(confirmed) {
        delSystemInfoAPI(newSysServerUnq).then((response) => {

        }).catch((err) => {
          alert(`Axios API Error: ${err}`);
        });

        delDiskInfoAPI(newDiskUnqList).then((response) => {

        }).catch((err) => {
          alert(`Axios API Error: ${err}`);
        });

        dispatch(closeModal({
          modalTypeToClose: 'SystemInfoModal',
        }));

      }else {
        return;
      }
    }else {
      dispatch(closeModal({
        modalTypeToClose: 'SystemInfoModal',
      }));
    }
  }

  const filterDiskToSelServer = () => {
    const selectedDiskList = diskDataList.filter((disk, _) => (
      disk.svr_unq === systemDataList[systemRowIndex].svr_unq
    ))

    return selectedDiskList;
  }

  const isAnyPropertyNotEmpty = (listObj, inputObj) => {
    const excludedKeys = ['use_flag', 'resc_use_flag', 'trn_use_flag'];

    if(listObj.length < 1) {
      return true;
    }else {
      for(const key in inputObj) {
        if(!excludedKeys.includes(key) && inputObj[key] !== '') {
          return true;
        }
      }
      return false;
    }
  }

  const onClickCreateServer = () => {
    if(!boolDataSave) {
      alert('저장 후 추가해주세요.');
      return;
    }

    const confirmed = window.confirm('서버를 추가하시겠습니까?');
    if(confirmed) {
      const newData = {...defaultSysData, entp_unq: entp_unq};

      insertSystemServerAPI(newData).then((response) => {
        setNewSysServerUnq(response);

        callSystemInfoAPIFn(entp_unq).then((response) => {
          setSystemInputData(response.enterpriseSvrDTOList[response.enterpriseSvrDTOList.length - 1]);
          setSystemRowIndex(response.length - 1);
        }).catch((err) => {});

        setBoolDataSave(false);

      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });

      setFocusTrigger(true);
    }
  }

  const onClickMakeDisk = () => {
    const selectedDiskList = filterDiskToSelServer();

    const isNotEmpty = isAnyPropertyNotEmpty(selectedDiskList, diskInputData);
    if(!isNotEmpty) {
      alert('Disk 정보를 입력해주세요.');
      return;
    }

    const requestData = {
      ...defaultDiskData,
      entp_unq: entp_unq,
      svr_unq : systemInputData.svr_unq,
    }

    insertDiskAPI(requestData).then((response) => {
      const newUnq = [...newDiskUnqList];
      newUnq.push(response);

      setNewDiskUnqList(newUnq);

      const newData = JSON.parse(JSON.stringify(diskDataList));
      newData.push({
        ...defaultDiskData,
        svr_unq: systemInputData.svr_unq,
        entp_unq: entp_unq,
        disk_partition_unq: response,
      });

      setDiskDataList(newData);
      setBoolDataSave(false);
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  }

  const deleteServer = (system) => {
    const confirmed = window.confirm('서버 정보를 삭제하시겠습니까?');

    if(confirmed) {
      delSystemInfoAPI(system.svr_unq).then((response) => {

      }).catch((err) => {
        alert(`Axios API Error: ${err}`)
      });
    }
  }

  const deleteDisk = (disk) => {
    const confirmed = window.confirm('Disk 정보를 삭제하시겠습니까?');

    if(confirmed) {
      const disk_partition_unq = disk.disk_partition_unq;

      delDiskInfoAPI(disk_partition_unq).then((response) => {
        callSystemInfoAPIFn(entp_unq);

        if(newDiskUnqList.includes(disk_partition_unq)){
          setBoolDataSave(true);
        }
      }).catch((err) => {
        alert(`Axios API Error: ${err}`);
      });
    }
  }

  const onClickSaveSysInfo = () => {
    const isNotEmpty = isAnyPropertyNotEmpty(systemDataList, systemInputData);
    if(!isNotEmpty) {
      alert('시스템 정보를 입력해주세요.');
      return;
    }

    const confirmed = window.confirm('저장 하시겠습니까?');

    if(confirmed) {
      const requestData = {
        ...systemInputData,
        svr_unq: newSysServerUnq,
        svrDiskDTOList: diskDataList
      }

      updateSystemServerAPI(requestData).then((response) => {
        setBoolDataSave(true);
        alert('저장이 완료되었습니다.');
      })
      .catch((err) => {
        alert(`Axios API Error: ${err}`);
      });
    }
  }

  const onChangeSystemData = (name, value) => {
    if(!enabledEdit) {
      return;
    }
    setSystemInputData({...systemInputData, [name]: value, entp_unq: entp_unq});

    const newData = JSON.parse(JSON.stringify(systemDataList));
    newData[systemRowIndex] = {...systemInputData, [name]: value};
    setSystemDataList(newData);
  }

  const onChangeDiskInputData = (name, value, index) => {
    if(!enabledEdit) {
      return;
    }
    setDiskInputData({...diskInputData, [name]: value});

    const filteredDiskList = filterDiskToSelServer();
    filteredDiskList[index] = {...filteredDiskList[index], [name]: value};

    const existingData = diskDataList.filter((disk, _) => (
     disk.svr_unq !== systemDataList[systemRowIndex].svr_unq
    ));

    setDiskDataList(existingData.concat(filteredDiskList));
  }

  const onChangeSystemUseYnCode = (name, value) => {
    if(!enabledEdit) {
      return;
    }
    setSystemInputData({...systemInputData, [name]: value});
  }

  const onClickSelServer = (index) => {
    setSystemInputData(systemDataList[index]);
    setSystemRowIndex(index);
  }

  const onClickEdit = () => {
    setEnabledEdit(!enabledEdit);
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <div className={enabledEdit && `${styles['modal__title--active']}`}>
            <Button image={'EDIT'} onClickEvent={onClickEdit} value={enabledEdit ? '편집중..' : '편집'} />
          </div>
          <div>시스템 정보</div>
          <div className={styles.close} onClick={handleClose}>
            <IconImage icon={'CLOSE'} onClickEvent={handleClose} />
          </div>
        </div>
        <div className={styles.modal__servers}>
          {systemDataList.map((system, index) => (
            <div key={index}>
              <div onClick={() => onClickSelServer(index)}>{system.svr_hst}</div>
              {enabledEdit &&
                <IconImage icon={'CLOSE'} onClickEvent={() => deleteServer(system)} />
              }
            </div>
          ))}
          {enabledEdit &&
            <div className={styles.add__server} onClick={onClickCreateServer}>
              <IconImage icon={'PLUS'} />
            </div>
          }
        </div>
        <div className={styles.modal__content}>
          <div>
            <div>서버 Hostname</div>
            <input
              value    = {systemInputData && systemInputData['svr_hst']}
              onChange = {(e) => onChangeSystemData('svr_hst', e.target.value)}
              readOnly={systemDataList.length < 1 || !enabledEdit}
              ref      = {inputRef}
            />
          </div>
          {systemDivsType1.map((item, key) => {
            return (
              <div key={key}>
                <div>{item.label}</div>
                <input
                  value    = {systemInputData && systemInputData[item.data]}
                  onChange = {(e) => onChangeSystemData(item.data, e.target.value)}
                  readOnly={systemDataList.length < 1 || !enabledEdit}
                />
              </div>
            )
          })}
          <div>
            {systemDivsType2.map((item, key) => {
              return (
                <div key={key}>
                  <div>{item.label}</div>
                  <Select
                    name          = {item.data}
                    value         = {systemInputData && systemInputData[item.data]}
                    onChangeEvent = {onChangeSystemUseYnCode}
                    disabled      = {systemDataList.length < 1}
                    dataSet={[
                      {value: 'Y', text: '사용'},
                      {value: 'N', text: '미사용'},
                    ]}
                  />
                </div>
              )})
            }
          </div>
          <div>
            <div>Memory</div>
            <div>
              <div>
                <input
                  value       = {systemInputData && systemInputData.used_mem_sz}
                  onChange    = {(e) => onChangeSystemData('used_mem_sz', e.target.value)}
                  readOnly    = {systemDataList.length < 1 || !enabledEdit}
                  placeholder = 'Used'
                />
                  G
              </div>
              <div>
                <input
                  value       = {systemInputData && systemInputData.total_mem_sz}
                  onChange    = {(e) => onChangeSystemData('total_mem_sz', e.target.value)}
                  readOnly    = {systemDataList.length < 1 || !enabledEdit}
                  placeholder = 'Total'
                />
                  G
              </div>
              (Used / Total)
            </div>
          </div>
          <div>
            <div>
              <div>Disk (Used / Total)</div>
              {enabledEdit &&
                <IconImage icon={'PLUS'} onClickEvent={onClickMakeDisk}/>
              }
            </div>
            <div>
              {diskDataList.filter(disk => disk.svr_unq === systemInputData.svr_unq)
                .map((disk, index) => (
                  <div key={index}>
                    <input value={disk && disk.partition_path} onChange={(e) => onChangeDiskInputData('partition_path', e.target.value, index)} placeholder='Partition Path' readOnly={systemDataList.length < 1 || !enabledEdit}/>
                    <div>
                      <div>
                        <input value={disk && disk.used_disk_sz} onChange={(e) => onChangeDiskInputData('used_disk_sz', e.target.value, index)} placeholder='Used' readOnly={systemDataList.length < 1 || !enabledEdit}/>
                        G
                      </div>
                      <div>
                        <input value={disk && disk.total_disk_sz} onChange={(e) => onChangeDiskInputData('total_disk_sz', e.target.value, index)} placeholder='Total' readOnly={systemDataList.length < 1 || !enabledEdit}/>
                        G
                      </div>
                    </div>
                    {enabledEdit &&
                      <IconImage icon={'CLOSE'} onClickEvent={() => deleteDisk(disk)}/>
                    }
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className={styles.modal__btn}>
          {enabledEdit &&
            <Button value={'저장'} onClickEvent={onClickSaveSysInfo}/>
          }
          <Button value={'닫기'} onClickEvent={handleClose}/>
        </div>
      </div>
    </div>
  )
}

export { SystemInfoModal };

