import { IconImage } from 'components/atoms';
import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import { AuthCodeObject, OrgChCodeObject, OrgCodeObject } from 'pages/api/AuthTypeObject';
import { findUserById } from 'pages/api/User/UserManageAPI';
import { setUserInfoAPI } from 'pages/api/adminMg/UserManageAPI';
import { GenerateOptions } from 'pages/api/common/dataSet/dataSet';
import { useMemo, useState } from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import { useNavigate } from 'react-router-dom';
import styles from './UserRegPage.module.scss';

const UserRegPage = () => {
  const [orgChCodeData , setOrgChCodeData ] = useState([]);
  const [boolValidation, setBoolValidation] = useState(false);
  const [boolChkPw     , setBoolChkPw     ] = useState(false);
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
    auth_cd     : '',
  });

  const navigate = useNavigate();

  const orgCodeOptoins   = useMemo(() => GenerateOptions(OrgCodeObject), []);
  const orgChCodeOptoins = useMemo(() => GenerateOptions(OrgChCodeObject), []);
  const authCodeOptions  = useMemo(() => GenerateOptions(AuthCodeObject), []);

  const onClickChkId = () => {
    findUserById(userData.user_id).then((response) => {
      if(response.status === 'FAIL') {
        alert('사용 가능한 아이디입니다.');
        setBoolValidation(true);
      }else {
        alert('중복된 아이디입니다\n다시 입력해주세요.');
        setBoolValidation(false);
      }
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  }

  const onClickRegUser = () => {
    if(!boolValidation) {
      alert('아이디를 중복확인 해주세요.');
      return;
    }else if(!boolChkPw) {
      alert('비밀번호를 확인해주세요.');
    }else {
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

  }

  const checkPw = (value) => {
    if(userData.user_pwd === value || userData.user_re_pwd === value) {
      setBoolChkPw(true);
    }else {
      setBoolChkPw(false);
    }
  }

  const onChangeUserData = (name, value) => {
    if(name === 'user_id') {
      setBoolValidation(false);
    }

    setUserData((prev) => {
      return (
        {...prev,
          [name]: value,
        }
      )
    })

    if(name === 'user_re_pwd' || name === 'user_pwd') {
      checkPw(value);
    }
  }

  const onChangeCode = (name, value) => {
    setUserData((prev) => {
      return {...prev, [name]: value};
    });

    if(name === 'org_cd') {
      setOrgChCodeData(orgChCodeOptoins.filter(option => option.value.startsWith(value)));
    }
  }

  const onClickMove = () => {
    const confirmed = window.confirm('데이터가 저장되지 않을 수 있습니다. 취소하시겠습니까?');
    if(confirmed) {
      navigate('/system/userMg');
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
              <input value={userData.user_id} placeholder='*아이디(필수)' onChange={(e)=>onChangeUserData('user_id', e.target.value)} maxLength={15}/>
              <button onClick={onClickChkId}>중복확인</button>
            </div>
            <div>
              <input type='password' value={userData.user_pwd} placeholder='*비밀번호(필수)' onChange={(e)=>onChangeUserData('user_pwd', e.target.value)} maxLength={20}/>
            </div>
            <div>
              {!boolChkPw && userData.user_pwd ? <p>비밀번호가 일치하지 않습니다.</p> : null}
              <input type='password' value={userData.user_re_pwd} placeholder='*비밀번호 확인(필수)' onChange={(e)=>onChangeUserData('user_re_pwd', e.target.value)} maxLength={20}/>
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
                onChangeEvent = {onChangeCode}
              />
              <div>부서분류(중)</div>
              <Select
                name          = 'org_ch_cd'
                value         = {userData.org_ch_cd}
                dataSet       = {orgChCodeData}
                disabled      = {!userData.org_cd}
                onChangeEvent = {onChangeCode}
              />
            </div>
            <div>
              <div>권한설정</div>
              <Select
                name          = 'auth_cd'
                value         = {userData.auth_cd}
                dataSet       = {authCodeOptions}
                onChangeEvent = {onChangeCode}
              />
            </div>
            <div>
              <textarea value={userData.memo} placeholder='Memo' onChange={(e)=>onChangeUserData('memo', e.target.value)}/>
            </div>
            <div>
              <Button value={'등록'} onClickEvent={onClickRegUser}/>
              <Button value={'취소'} onClickEvent={onClickMove}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserRegPage };

