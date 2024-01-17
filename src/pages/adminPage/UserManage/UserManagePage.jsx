import { IconImage } from 'components/atoms';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate } from 'react-router-dom';
import styles from './UserManagePage.module.scss';


const dummyData = [];
for(let i=0; i<30; i++) {
  dummyData.push({
    user_id  : `test${i}`,
    user_pwd : `000${i}`,
    user_nm  : `userName${i}`,
    use_yn:'Y',
    cell_tel_no:'01022223344' ,
    email:`test${i}@email.com`,
    org_cd:'',
    org_ch_cd:'',
    jnco_dt: new Date(),
    retir_dt: new Date(),
    conn_ip:'172.16.0.49',
    lgn_tm: '',
    lgout_tm:'',
    pwd_ini_yn_cd: 'N',
    lgn_yn_cd:'N',
    memo:'memo3eeee',
    reg_id: 'admin01',
    reg_dtm: new Date(),
    chg_id: '',
    chg_dtm: '',
    session_token: '',
  })
}

const UserManagePage = () => {

  const navigate = useNavigate();

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
                  itemId: '/system/userReg'
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
        <div className={styles.content__header}>
          <div>사용자 ID</div>
          <div>사용여부</div>
          <div>사용자명</div>
          <div>최근 접속 IP</div>
          <div>로그인 시간</div>
          <div>로그아웃 시간</div>
          <div>비밀번호 초기화</div>
          <div>로그인 여부</div>
        </div>
        {dummyData && dummyData.map((user, index) => (
          <div className={styles.content__list}>
            <div>{user.user_id}</div>
            <div>{user.use_yn}</div>
            <div>{user.user_nm}</div>
            <div>{user.conn_ip}</div>
            <div>{user.lgn_tm}</div>
            <div>{user.lgout_tm}</div>
            <div>{user.pwd_ini_yn_cd}</div>
            <div>{user.lgn_yn_cd}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { UserManagePage };
