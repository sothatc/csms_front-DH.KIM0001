import { Button } from 'components/atoms/Button/Button';
import Grid from 'components/molecules/Grid/Grid';
import { getUserListAPI } from 'pages/api/User/UserManageAPI';
import { useEffect, useState } from 'react';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import styles from './UserManagePage.module.scss';


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
    <div className={styles.user}>
      <div className={styles.user__grid}>
        <Grid
          data   = {userList}
          header = {ColumnDefs}
        />
      </div>
      <div className={styles.user__pagination}>
        <div>
          <div className={`${styles['user__pagination--arrow']} ${styles['user__pagination--pre']}`}>
            <Button
              image           = "ARROW-LEFT"
              onClickEvent    = {() => setCurrentPage((prev) => Math.max( prev - 1, 1 ))}
              disabled        = {currentPage === 1}
              backgroundColor = ''
            />
          </div>
          <div className={`${styles['user__pagination--num']}`}>
            {renderPageNumbers()}
          </div>
          <div className={`${styles['user__pagination--arrow']} ${styles['user__pagination--next']}`}>
            <Button
              image           = "ARROW-RIGHT"
              onClickEvent    = {() => setCurrentPage((prev) => Math.min( prev + 1, pagingData.page_cnt ))}
              disabled        = {currentPage === pagingData.page_cnt}
              backgroundColor = ''
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserManagePage };

