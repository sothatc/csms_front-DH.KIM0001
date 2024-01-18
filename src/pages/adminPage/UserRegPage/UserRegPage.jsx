import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { OrgChCodeObject, OrgCodeObject } from 'pages/api/AuthTypeObject';
import { setUserInfoAPI } from 'pages/api/adminMg/UserManageAPI';
import { GenerateOptions } from 'pages/api/common/dataSet/dataSet';
import { useMemo, useState } from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import { useNavigate } from 'react-router-dom';
import styles from './UserRegPage.module.scss';

const UserRegPage = () => {
  const [orgCodeData, setOrgCodeData] = useState([]);
  const [orgChCodeData, setOrgChCodeData] = useState([]);
  const [userData, setUserData] = useState({
    user_id     : '',
    user_pwd    : '',
    user_re_pwd : '',
    use_yn      : '',
    org_cd      : '',
    org_ch_cd   :'',
    memo        : '',
    reg_id      : '',
    reg_dtm     : '',
  });

  const navigate = useNavigate();

  const orgCodeOptoins   = useMemo(() => GenerateOptions(OrgCodeObject), []);
  const orgChCodeOptoins = useMemo(() => GenerateOptions(OrgChCodeObject), []);
console.log("orgChCodeData = ",orgChCodeData);
  const onChangeUserData = (name, value) => {
    setUserData((prev) => {
      return (
        {...prev,
          [name]: value,
        }
      )
    })
  }

  const onClickRegUser = () => {
    setUserInfoAPI(userData).then((response) => {
      if(response.data.status === 'FAIL') {
        alert('이미 존재하는 사용자입니다.');
      }else {
        alert('사용자가 등록되었습니다.');
        navigate('/system/userMg');
      }
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  }

  const onChangeOrgCode = (name, value) => {
    setUserData((prev) => {
      return {...prev, [name]: value};
    });

    if(name === 'org_cd') {
      setOrgChCodeData(orgChCodeOptoins.filter(option => option.value.startsWith(value)));
    }
  }

  return (
    <div className={styles.admin}>
      <div className={styles.nav}>
        <Navigation
          onSelect = {({itemId}) => {
            navigate(itemId);
          }}
          items = {[
            {
              title: '사용자 관리',
              itemId: '/system/userMg',
              elemBefore: () => <IconImage icon={'USERMG'}/>,
              subNav: [
                {
                  title: '추가/등록',
                  itemId: '/system/addUser'
                },
              ],
            },
            {
              title: '설정',
              itemId: '/setting',
              elemBefore: () => <IconImage icon={'SETTING'}/>,
              subNav: [
                {
                  title: '테마',
                  itemId: '/setting/theme',
                },
              ],
            },
          ]}
        />
      </div>
      <div className={styles.content}> {/** admin, nav, content까지 공통 Layout으로 분리 예정 */}
        <div className={styles.content__reg}>
          <div>
            <div>
              <input value={userData.user_id} placeholder='*아이디(필수)' onChange={(e)=>onChangeUserData('user_id', e.target.value)}/>
              <button value={''}>중복확인</button>
            </div>
            <div>
              <input value={userData.user_pwd} placeholder='*비밀번호(필수)' onChange={(e)=>onChangeUserData('user_pwd', e.target.value)}/>
            </div>
            <div>
              <input value={userData.user_re_pwd} placeholder='*비밀번호 확인(필수)' onChange={(e)=>onChangeUserData('user_re_pwd', e.target.value)}/>
            </div>
            <div>
              <input value={userData.user_nm} placeholder='사용자 이름' onChange={(e)=>onChangeUserData('user_nm', e.target.value)}/>
            </div>
            <div>
              <div>부서분류(대)</div>
              <Select
                name          = 'org_cd'
                value         = {userData.org_cd}
                dataSet       = {orgCodeOptoins}
                onChangeEvent = {onChangeOrgCode}
              />
              <div>부서분류(중)</div>
              <Select
                name          = 'org_ch_cd'
                value         = {userData.org_ch_cd}
                dataSet       = {orgChCodeData}
                onChangeEvent = {onChangeOrgCode}
              />
            </div>
            <div>
              <textarea value={userData.memo} placeholder='Memo' onChange={(e)=>onChangeUserData('memo', e.target.value)}/>
            </div>
            <div>
              <Button value={'등록'} onClickEvent={onClickRegUser}/>
              <Button value={'취소'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserRegPage };

