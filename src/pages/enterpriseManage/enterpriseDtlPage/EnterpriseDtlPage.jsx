import { Button } from 'components/atoms/Button/Button';
import { CustTypeObject } from 'pages/api/CustTypeObject';
import { deleteEnterpriseInfo, downloadEntpAtchFileAPI, getEnterpriseDtlInfo } from 'pages/api/Enterprise/EnterpriseAPI';
import { EntpTypeObject, SvcTypeObject } from 'pages/api/EnterpriseTypeObject';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from 'reduxStore/modalSlice';
import styles from './EnterpriseDtlPage.module.scss';
import { IconImage } from 'components/atoms';

const sysDataDivs = [
  {data : 'os_vers'      , type: 'I', label: 'OS'         }
, {data : 'svr_hst'      , type: 'I', label: '서버 호스트'}
, {data : 'svr_ip'       , type: 'I', label: '서버 IP'    }
, {data : 'svr_cont'     , type: 'I', label: '서버 용도'  }
, {data : 'kern_vers'    , type: 'I', label: 'kenel'      }

, {data : 'gpu_model'    , type: 'I', label: 'GPU'        }
, {data : 'cpu_cnt'      , type: 'I', label: 'CPU 코어'   }
, {data : 'total_mem_sz' , type: 'I', label: 'Memory'     }
, {data : 'total_disk_sz', type: 'I', label: 'Disk'       }
, {data : 'resc_use_flag', type: 'S', label: '리소스 사용'}
, {data : 'base_path'    , type: 'I', label: '기본경로'   }
, {data : 'log_path'     , type: 'I', label: '로그경로'   }

, {data : 'trn_use_flag' , type: 'S', label: '학습 사용'  }
, {data : 'use_flag'     , type: 'S', label: '사용 여부'  }
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

const EnterpriseDtlPage = () => {
  const [enterpriseData     , setEnterpriseData     ] = useState({});
  const [atchFiles          , setAtchFiles          ] = useState([]);
  const [custData           , setCustData           ] = useState([]);
  const [principalCustData  , setPrincipalCustData  ] = useState({});
  // const [systemData         , setSystemData         ] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const entpNoArr = window.location.search.substring(1).split("=");

    getEnterpriseDtlInfo(entpNoArr[1]).then((response) => {
      setEnterpriseData(response.enterpriseData);
      setAtchFiles(response.enterpriseAtchData);
      setCustData(response.enterpriseCustData);
      // setSystemData(response.enterpriseSvcData);
    });
  }, [])

  useEffect(() => {
    custData.forEach((item) => {
      if(item.principal_tp === 'Y') {
        setPrincipalCustData(item);
        return;
      }
    })
  },[custData])

  const onClickModifyEvent = () => {
    navigate(`/enterprise/register?entp_unq=${enterpriseData.entp_unq}&cust_unq=${principalCustData.cust_unq}`);
  }

  const onClickDownloadAtchFile = (atch_file_unq) => {
    downloadEntpAtchFileAPI(atch_file_unq).then((response) => {
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
    .catch((err) => {});
  }

  const handleOpenCustListModal = () => {
    dispatch(
      openModal({
        modalType : 'CustListModal',
        isOpen    : true,
        data: {
          entpUnqProps: enterpriseData.entp_unq,
          entpTpProps : enterpriseData.entp_tp,
          custDataProps: custData,
        },
      })
    )
  }

  const onClickDeleteEntp = () => {
    const confirmed = window.confirm('업체를 삭제하시겠습니까?');

    if(confirmed) {
      deleteEnterpriseInfo(enterpriseData.entp_unq).then((response) => {

      })
      .catch((err) => {
        alert(`Asios Error: ${err}`);
      });
      alert('삭제완료');
      navigate('/enterprise');
    }else {
      alert('취소하였습니다.');
    }
  }

  const onClickMoveToMain = () => {
    navigate('/enterprise');
  }

  const openSysInfoModal = () => {
    dispatch(
      openModal({
        modalType : 'SystemInfoModal',
        isOpen    : true,
        data: {'entp_unq' : enterpriseData.entp_unq},
      })
    );
  }

  return (
    <>
      <div className={styles.register}>
        <div className={styles.register__area}>
          <div className={styles.register__title}>
            <div>
              <h4>{'>'}</h4>
              <h4>업체 정보</h4>
              <Button value={'시스템 정보'} image={'SYSTEM'} onClickEvent={openSysInfoModal}/>
            </div>
            <div>
              <Button value={'수정'}     onClickEvent={onClickModifyEvent}/>
              <Button value={'삭제'}     onClickEvent={onClickDeleteEntp}/>
              <Button value={'메인으로'} onClickEvent={onClickMoveToMain} />
            </div>
          </div>
          <div className={styles.register__content}>
            <div>
              <div>
                구분
              </div>
              <div>
                <div>{EntpTypeObject[`${enterpriseData?.entp_tp}`]}</div>
              </div>
            </div>
            <div>
              <div>
                회사명
              </div>
              <div>
                <div>{enterpriseData?.entp_nm}</div>
              </div>
            </div>
            <div>
              <div>
                담당자
              </div>
              <div>
                <div>{principalCustData?.memb_nm}</div>
                <IconImage icon={'PLUS'} onClickEvent={ handleOpenCustListModal } />
              </div>
              <div>
                부서명
              </div>
              <div>
                <div>{principalCustData?.memb_dept_nm}</div>
              </div>
            </div>
            <div>
              <div>
                직위
              </div>
              <div>
                <div>{CustTypeObject[`${principalCustData?.memb_pst_nm}`]}</div>
              </div>
              <div>
                연락처
              </div>
              <div>
                <div>{principalCustData?.memb_tel}</div>
              </div>
            </div>
            <div>
              <div>
                이메일
              </div>
              <div>
                <div>{principalCustData?.memb_email}</div>
              </div>
              <div>
                서비스 형태
              </div>
              <div>
                <div>{SvcTypeObject[`${enterpriseData?.svc_tp}`]}</div>
              </div>
            </div>
            <div>
              <div>추가정보</div>
              <div>
                <div>{enterpriseData?.gnr_memo}</div>
              </div>
            </div>
          </div>
          <div className={styles.register__file}>
            <div className={`${styles['register__file--th']}`}>첨부파일</div>
            <div className={`${styles['register__file--td']}`}>
              <div>
                {atchFiles && atchFiles.map((file, index) => (
                  <div key={index} onClick={() => onClickDownloadAtchFile(file.atch_file_unq)}>{file.atch_file_org_nm}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EnterpriseDtlPage;