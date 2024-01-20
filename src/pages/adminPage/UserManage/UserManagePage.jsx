import { IconImage } from 'components/atoms';
import Grid from 'components/molecules/Grid/Grid';
import { getUserListAPI } from 'pages/api/User/UserManageAPI';
import { useEffect, useState } from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate } from 'react-router-dom';
import styles from './UserManagePage.module.scss';
import { Button } from 'components/atoms/Button/Button';


const ColumnDefs = [
  {headerName: '사용자 ID'           , field: 'user_id'      },
  {headerName: '사용여부'            , field: 'use_yn'       },
  {headerName: '사용자명'            , field: 'user_nm'      },
  {headerName: '최근 접속 IP'        , field: 'conn_ip'      },
  {headerName: '로그인 시간'         , field: 'lgn_tm'       },
  {headerName: '로그아웃 시간'       , field: 'lgout_tm'     },
  {headerName: '비밀번호 초기화 여부', field: 'pwd_ini_yn_cd'},
  {headerName: '로그인 상태'         , field: 'lgn_yn_cd'    },
]

const UserManagePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagingData , setPagingData ] = useState({});
  const [userList   , setUserList   ] = useState([]);
  const [requestData, setRequestData] = useState({
    use_yn : '',
    user_id: '',
    user_nm: '',
    conn_ip: '',
    paging : {
      limit : 10,
      offset: 1,
    }
  })

  const navigate = useNavigate();

  useEffect(() => {
    getUserListEvent(requestData);
  },[])

  const getUserListEvent = (requestData) => {
    getUserListAPI(requestData).then((response) => {
      setUserList(response.userList);
      setPagingData(response.paging);
    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    });
  }

  const onClickPaging = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {

    const totalPages = pagingData.page_cnt; // 전체 페이지 수
    const visiblePages = 5; // 보이는 번호 갯수

    const pageNumbers = [];
    const halfVisiblePages = Math.floor(visiblePages / 2);

     let start = currentPage - halfVisiblePages;
     let end = currentPage + halfVisiblePages;

     if (start <= 0) {
       start = 1;
       end = Math.min(totalPages, visiblePages);
     }

     if (end > totalPages) {
       end = totalPages;
       start = Math.max(1, totalPages - visiblePages + 1);
     }

     for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'client__pagination--active' : ''} onClick={() => onClickPaging(i)}>
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.admin}>
      {/* <div className={styles.nav}>
        <Navigation
          onSelect = {({itemId}) => {
            navigate(itemId);
          }}
          items = {[
            {
              title: '사용자 관리',
              itemId: '/admin/userMg',
              elemBefore: () => <IconImage icon={'USERMG'}/>,
              subNav: [
                {
                  title: '추가/등록',
                  itemId: '/admin/userReg'
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
      </div> */}

      <div className={styles.content}> {/** admin, nav, content까지 공통 Layout으로 분리 예정 */}
        <div className={styles.content__grid}>
          <Grid
            data   = {userList}
            header = {ColumnDefs}
          />
        </div>
        <div className={styles.content__pagination}>
        <div>
            <div className={`${styles['content__pagination--arrow']} ${styles['content__pagination--pre']}`}>
              <Button
                image           = "ARROW-LEFT"
                onClickEvent    = {() => setCurrentPage((prev) => Math.max( prev - 1, 1 ))}
                backgroundColor = ''
                disabled        = {currentPage === 1}
              />
            </div>
            <div className={`${styles['content__pagination--num']}`}>
              {renderPageNumbers()}
            </div>
            <div className={`${styles['content__pagination--arrow']} ${styles['content__pagination--next']}`}>
              <Button
                image="ARROW-RIGHT"
                onClickEvent = {() => setCurrentPage((prev) => Math.min( prev + 1, pagingData.page_cnt ))}
                disabled     = {currentPage === pagingData.page_cnt}
                backgroundColor = ''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserManagePage };

