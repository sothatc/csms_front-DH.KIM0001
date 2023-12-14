import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { CustTypeObject } from 'pages/api/CustTypeObject';
import { getEnterpriseDtlInfo, insertEnterprise, searchCorRegNumberAPI, updateEnterprise } from 'pages/api/Enterprise/EnterpriseAPI';
import { EntpTypeObject, SolutionTypeObject, SvcTypeObject } from 'pages/api/EnterpriseTypeObject';
import { GenerateOptions } from 'pages/api/common/dataSet/dataSet';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EnterpriseRegPage.module.scss';



const sysDataDivs = [
  {data : 'os_vers'      , type: 'I', label: 'OS'         }
, {data : 'svr_hst'      , type: 'I', label: '서버 호스트'}
, {data : 'svr_ip'       , type: 'I', label: '서버 IP'    }
, {data : 'svr_cont'     , type: 'I', label: '서버 용도'  }
, {data : 'kern_vers'    , type: 'I', label: 'kenel'      }

, {data : 'gpu_model'    , type: 'I', label: 'GPU'        }
, {data : 'cpu_cnt'      , type: 'I', label: 'CPU 코어'   }
, {data : 'trn_use_flag' , type: 'S', label: '학습 사용'  }
, {data : 'use_flag'     , type: 'S', label: '사용 여부'  }
, {data : 'resc_use_flag', type: 'S', label: '리소스 사용'}
, {data : 'base_path'    , type: 'I', label: '기본경로'   }
, {data : 'log_path'     , type: 'I', label: '로그경로'   }

, {data : 'total_mem_sz' , type: 'I', label: 'Memory'     }
, {data : 'total_disk_sz', type: 'I', label: 'Disk'       }
];

const defaultSysData = {
  svr_unq      : '',
  entp_unq     : '',
  svr_hst      : '',
  svr_ip       : '',
  svr_cont     : '',
  use_flag     : '',
  resc_use_flag: '',
  trn_use_flag : '',
  os_vers      : '',
  kern_vers    : '',
  cpu_cnt      : '',
  total_mem_sz : '',
  used_mem_sz  : '',
  gpu_model    : '',
  total_disk_sz: '',
  used_disk_sz : '',
  base_path    : '',
  log_path     : '',
  gnr_memo     : '',
  reg_usr_id   : '',
  reg_dtm      : ''
}
const defaultEntpData = {
  entp_nm        : '',
  entp_tp        : 'C',
  svc_tp         : '',
  solution_tp    : 'STT',
  entp_unq       : '',
}

const defaultCustData = {
  memb_dept_nm : '',
  memb_email   : '',
  memb_nm      : '',
  memb_pst_nm  : '',
  memb_tel     : '',
  principal_tp : '',
}
const delFileArray = [];

const FILE_SIZE_MAX_LIMIT = 20 * 1024 * 1024;

const EnterpriseRegPage = () => {
  const [atchFiles      , setAtchFiles      ] = useState([]);
  const [enterpriseData , setEnterpriseData ] = useState({...defaultEntpData});
  const [custData       , setCustData       ] = useState({...defaultCustData});
  const [systemData     , setSystemData     ] = useState([]);
  const [systemInputData, setSystemInputData] = useState({...defaultSysData});
  const [systemRowIndex , setSystemRowIndex ] = useState(-1);
  const [isCorRegNum    , setIsCorRegNum    ] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const entp_unq = searchParams.get('entp_unq');

  const entpOptions = useMemo(() => GenerateOptions(EntpTypeObject), []);
  const custOptions = useMemo(() => GenerateOptions(CustTypeObject), []);
  const svcOptions = useMemo(() => GenerateOptions(SvcTypeObject), []);
  const solutionOptoins = useMemo(() => GenerateOptions(SolutionTypeObject), []);

  if(entp_unq) {
    getEnterpriseDtlInfo(entp_unq).then((response) => {
      setEnterpriseData(response.enterpriseData);
      setAtchFiles(response.enterpriseAtchData);
      setSystemData(response.enterpriseSvcData);
      setCustData(response.enterpriseCustData[0]);
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

  const onChangeEnterpriseCode = (name, value) => {
    setEnterpriseData((prev) => {
      return {...prev, [name] : value};
    });
  }

  const onChangeEnterpriseInfoData = (name, e) => {
    const value = e.target.value;

    if(name === 'entp_unq') {
      const entp_unq = value.replace(/[^0-9]/g, '').substring(0, 10);
      setEnterpriseData({...enterpriseData, [name] : entp_unq});
    }else {
      setEnterpriseData({...enterpriseData, [name] : value});
    }
  }

  const onChangeCustInfoData = (name, e) => {
    if(name === 'memb_tel') {
      const memb_tel_num = e.target.value.replace(/[^0-9]/g, '').substring(0, 11);
      setCustData({...custData, [name] : memb_tel_num});
    }else {
      setCustData({...custData, [name] : e.target.value});
    }

  }

  const onChangeCustInfoCode = (name, value) => {
    setCustData((prev) => {
      return {...prev, [name] : value};
    })
  }

  const onChangeSystemData = (name, e) => {
    setSystemInputData({...systemInputData, [name] : e.target.value});

    const newData = JSON.parse(JSON.stringify(systemData));
    newData[systemRowIndex] = {...systemInputData, [name] : e.target.value}

    setSystemData(newData);

  }
  const onChangeSystemUseYnCode = (name, value) => {
    setSystemInputData({...systemInputData, [name] : value});

    const newData = JSON.parse(JSON.stringify(systemData));
    newData[systemRowIndex] = {...systemInputData, [name] : value}

    setSystemData(newData);
  }

  const totalFileSizeInByte = useMemo(() => {
    let totalSize = 0;

    atchFiles.forEach((file) => {
      totalSize += file.size;
    });

    return totalSize;
  }, [atchFiles])

  const onClickInsertEntp = () => {
    let validationBoolean = true;

    if(!isCorRegNum) {
      alert('사업자등록번호를 조회해주세요.');
      validationBoolean = false;
    }

    const numericPattern = /^[0-9]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(enterpriseData.entp_unq === '' || enterpriseData.entp_nm === '' || enterpriseData.entp_tp === '' || custData.memb_nm === '' || custData.memb_pst_nm === '') {
      validationBoolean = false;
      alert('필수 내용을 입력해주세요.');
    }else if(!numericPattern.test(enterpriseData.entp_unq)) {
      validationBoolean = false;
      alert('사업자등록번호는 숫자만 입력해주세요.');
    }else if(enterpriseData.solution_tp === 'STT' && enterpriseData.svc_tp === ''  ) {
      validationBoolean = false;
      alert('STT 서비스 형태를 성택해주세요.');
    }else if(!numericPattern.test(custData.memb_tel)) {
      validationBoolean = false;
      alert('전화번호는 숫자만 입력해주세요.');
    }else if(!emailPattern.test(custData.memb_email)) {
      validationBoolean = false;
      alert('이메일 형식에 맞게 입력해주세요.');
    }else if(totalFileSizeInByte > FILE_SIZE_MAX_LIMIT){
      validationBoolean = false;
      alert('파일 최대 용량은 20MB입니다.');
    }else {
      systemData.forEach((item) => {
        if (!numericPattern.test(item.cpu_cnt)) {
          validationBoolean = false;
          alert('CPU코어 수는 숫자만 입력해주세요.');
        }
        // if (!numericPattern.test(item.mem_sz)) {
        //   validationBoolean = false;
        //   alert('메모리 용량은 숫자만 입력해주세요.');
        // }
        // if (!numericPattern.test(item.disk_sz)) {
        //   validationBoolean = false;
        //   alert('디스크 용량은 숫자만 입력해주세요.');
        // }
      });
    }

    if(!validationBoolean) {
      return;
    }

    const newEnterpriseData = enterpriseData;
    newEnterpriseData['flag'] = 'I';

    const newCustData = custData;
    newCustData['principal_tp'] = 'Y';

    let formData = new FormData();

    atchFiles?.forEach((atchFile) => {
      formData.append('files', atchFile);
    });

    formData.append('enterpriseData', JSON.stringify(newEnterpriseData));
    formData.append('systemData', JSON.stringify(systemData));
    formData.append('custData', JSON.stringify(newCustData));

    insertEnterprise(formData).then((response) => {
      alert('업체 등록 완료');
      navigate('/enterprise', {state: {from: '/enterprise/register'}});
    })
    .catch((err) => {
      alert(`AxiosError: ${err}`);
    })
  }

  const onClickModifyEntp = () => {
    const numericPattern = /^[0-9]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let validationBoolean = true;

    if(enterpriseData.entp_nm === '' || enterpriseData.entp_tp === '' || custData.memb_dept_nm === '' || custData.memb_nm === '' || custData.memb_pst_nm === '' || enterpriseData.svc_tp === '') {
      validationBoolean = false;
      alert('필수 내용을 입력해주세요.');
    }else if(!numericPattern.test(custData.memb_tel)) {
      // validationBoolean = false;
      // alert('전화번호는 숫자만 입력해주세요.');
    }else if(!emailPattern.test(custData.memb_email)) {
      validationBoolean = false;
      alert('이메일 형식에 맞게 입력해주세요.');
    }else {
      // systemData.forEach((item) => {
      //   if (!numericPattern.test(item.cpu_cnt)) {
      //     validationBoolean = false;
      //     alert('CPU코어 수는 숫자만 입력해주세요.');
      //   }
      // });
    }

    if(!validationBoolean) {
      return;
    }

    const newEnterpriseData = enterpriseData;
    newEnterpriseData['flag'] = 'U';
    newEnterpriseData['delAtchFileNum'] = delFileArray.join(',');

    let formData = new FormData();

    atchFiles?.forEach((atchFile) => {
      formData.append('files', atchFile);
    });

    formData.append('enterpriseData', JSON.stringify(newEnterpriseData));
    formData.append('systemData', JSON.stringify(systemData));
    formData.append('custData', JSON.stringify(custData));

    updateEnterprise(formData).then((response) => {

    })
    .catch((err) => {
      alert(`Axios Error: ${err}`);
    })

    alert('업체 수정 완료');
    navigate('/enterprise');
  }

  const isAnyPropertyNotEmpty = (obj) => {
    if(systemData.length < 1) {
      return true;
    }else {
      for(const key in obj) {
        if(systemInputData[key] !== '') {
          return true;
        }
      }
      return false;
    }
  }

  const deleteSystemRow = () => {
    let newData = systemData.filter((_, index) => index !== systemRowIndex);

    setSystemData(newData);
    setSystemRowIndex(systemData.length-2);

    //ToDo 시스템 정보 삭제시 다음 선택된 정보에 버그
    setSystemInputData(systemData[systemData.length-2]);
  }

  const addNewSystemRow = () => {
    const isNotEmpty = isAnyPropertyNotEmpty(systemInputData);
    let newData = JSON.parse(JSON.stringify(systemData));
    newData.push(defaultSysData);

    if(!isNotEmpty) {
      alert("시스템 정보를 입력해주세요.");
      return;
    }

    setSystemData(newData);
    setSystemRowIndex(systemData.length);
    setSystemInputData({...defaultSysData});
  }

  const selectRowItem = (index) => {
    setSystemRowIndex(index);
    setSystemInputData(systemData[index]);
  }

  const onClickSearchCorRegNum = () => {
    if(!enterpriseData.entp_unq) {
      return;
    }
    searchCorRegNumberAPI(enterpriseData).then((response) => {

      if(!response) {
        alert('존재하지 않는 사업자등록번호입니다.');
        return;
      }else {
        alert('조회되었습니다.');
        setEnterpriseData({...enterpriseData, ['entp_nm']: response.company})
        setIsCorRegNum(true);
      }
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  }

  const onClickCancel = () => {
    const confirmed = window.confirm('취소하시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');

    if(confirmed) {
      navigate('/task');
    }else {
      return;
    }
  }

  return (
    <>
      <div className={styles.register}>
        <div className={styles.register__area}>
          <div className={styles.register__title}>
            <div>
              <h4>{'>'}</h4>
              <h4>업체 정보</h4>
            </div>
            <div>
              {entp_unq !== null || ''
                ? <Button value={'수정'} onClickEvent={onClickModifyEntp}/>
                : <Button value={'등록'} onClickEvent={onClickInsertEntp}/>
              }
              <Button value={'취소'} onClickEvent={onClickCancel}/>
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
                업체 구분
              </div>
              <div>
                <Select
                  name    = 'entp_tp'
                  value   = {enterpriseData && enterpriseData.entp_tp}
                  dataSet = {entpOptions}
                  onChangeEvent  = {onChangeEnterpriseCode}
                />
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                솔루션 구분
              </div>
              <div>
                <Select
                  name    = 'solution_tp'
                  value   = {enterpriseData && enterpriseData.solution_tp}
                  dataSet = {solutionOptoins}
                  onChangeEvent  = {onChangeEnterpriseCode}
                />
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                사업자등록번호
              </div>
              <div>
                <input
                  type        = 'text'
                  value       = {enterpriseData && enterpriseData.entp_unq}
                  onChange    = {(e) => onChangeEnterpriseInfoData('entp_unq', e)}
                  disabled    = {entp_unq && true}
                  placeholder = "'-'생략"
                  maxLength   = {10}
                />
                <Button
                  value           = {'조회'}
                  onClickEvent    = {onClickSearchCorRegNum}
                  backgroundColor = {enterpriseData.entp_unq && entp_unq === null ? 'blue' : 'default' }
                  disabled        = {entp_unq !== null && true}
                />
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                회사명
              </div>
              <div>
                <div>{enterpriseData && enterpriseData.entp_nm}</div>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                담당자
              </div>
              <div>
                <input type='text' placeholder='(업체측)' value={custData && custData.memb_nm} onChange={(e) => onChangeCustInfoData('memb_nm', e)}/>
              </div>
              <div>
                <span className={styles.compulsory}></span>
                부서명
              </div>
              <div>
                <input type='text' value={custData && custData.memb_dept_nm} onChange={(e) => onChangeCustInfoData('memb_dept_nm', e)}/>
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                직위
              </div>
              <div>
                <Select
                  name          = 'memb_pst_nm'
                  value         = {custData && custData.memb_pst_nm}
                  onChangeEvent = {onChangeCustInfoCode}
                  dataSet={custOptions}
                />
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                연락처
              </div>
              <div>
                <input
                  type        = 'tel'
                  value       = {custData && custData.memb_tel}
                  placeholder = '숫자만 입력'
                  maxLength   = {11}
                  onChange    = {(e) => onChangeCustInfoData('memb_tel', e)}
                />
              </div>
            </div>
            <div>
              <div>
                <span className={styles.compulsory}>*</span>
                이메일
              </div>
              <div>
                <input type='text' value={custData && custData.memb_email} placeholder='Ex) Email@gmail.com'onChange={(e) => onChangeCustInfoData('memb_email', e)}/>
              </div>
              <div>
                <span className={styles.compulsory}>*</span>
                STT 서비스 형태
              </div>
              <div>
                <Select
                  value    = {enterpriseData && enterpriseData.svc_tp}
                  name     = 'svc_tp'
                  dataSet  = {svcOptions}
                  disabled ={enterpriseData.solution_tp !== 'STT' && true}
                  onChangeEvent={onChangeEnterpriseCode}
                />
              </div>
            </div>
            <div>
              <div>추가정보</div>
              <div>
                <textarea value={enterpriseData && enterpriseData.gnr_memo} onChange={(e) => onChangeEnterpriseInfoData('gnr_memo', e)}/>
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
      <div className={styles.system}>
        <div className={styles.system__title}>
          <div>
            <h4>{'>'}</h4>
            <h4>시스템 정보</h4>
          </div>
          <div>
            <Button value={'추가'} onClickEvent = {addNewSystemRow}/>
            <Button value={'삭제'} onClickEvent = {deleteSystemRow}/>
          </div>
        </div>
        <div className={styles.system__info}>
          <div>
            {sysDataDivs.map(item =>{
              return (
                <div>
                  <div>{item.label}</div>
                  <div>
                    {item.type === 'I' ? (
                      ['Disk', 'Memory'].includes(item.label) ? (
                        <>
                          <input
                            value       = {item.label === 'Disk' ? systemInputData['used_disk_sz'] : systemInputData['used_mem_sz']}
                            disabled    = {systemRowIndex === -1}
                            placeholder = ''
                            onChange    = {(e) => item.label === 'Disk' ? setSystemInputData({...systemInputData, ['used_disk_sz']:e.target.value}) : setSystemInputData({...systemInputData, ['used_mem_sz']:e.target.value}) }
                          />
                          <span></span>
                          <span>/</span>
                          <input
                            value       = {systemInputData[item.data]}
                            disabled    = {systemRowIndex === -1}
                            placeholder = 'total'
                            onChange    = {(e) => onChangeSystemData(item.data, e)}
                          />
                          <span>G</span>
                        </>
                      ) : (
                          <input value={systemInputData[item.data]} onChange={(e) => onChangeSystemData(item.data, e)} disabled={systemRowIndex === -1}/>
                      )
                    ) : (
                      <Select
                        name          = {item.data}
                        value         = {systemInputData[item.data]}
                        onChangeEvent = {onChangeSystemUseYnCode}
                        disabled      = {systemRowIndex === -1}
                        dataSet = {[
                          {value: 'Y' , text: "사용"  },
                          {value: 'N' , text: "미사용"},
                        ]}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.system__list}>
          <div>
            {sysDataDivs.map(item =>{
              return (<div>{item.label}</div>)
            })}
          </div>
          {systemData.map((sys, index) => {
            return (<div onClick={() => selectRowItem(index)} style={{backgroundColor: systemRowIndex === index ? '#00ffd08c' : 'transparent'}}>
              {sysDataDivs.map(item =>{
                return (
                  <div>
                    {['Disk', 'Memory'].includes(item.label) ? (
                      <>
                        <div>{item.label === 'Disk' ? sys['used_disk_sz'] : sys['used_mem_sz']}</div>
                        <span>G</span>
                        <div>{sys[item.data]}</div>
                        <span>G</span>
                      </>
                    )
                    :
                    (
                      <div>{sys[item.data]}</div>
                    )}
                  </div>
                )
              })}
            </div>)
          })}
        </div>
        {/* <div className={styles.system__etc}>
          <div>추가정보</div>
          <div></div>
        </div> */}
      </div>
    </>
  )
}

export default EnterpriseRegPage;