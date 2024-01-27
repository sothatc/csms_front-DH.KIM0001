import { IconImage } from 'components/atoms';
import Footer from 'components/organisms/Footer/Footer';
import Header from 'components/organisms/Header/Header';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = ({ children, loginCheck }) => {

  const location = useLocation();
  const boolAdminUrl = location.pathname.startsWith('/admin');
  // const childrenArr = children[1].props.children.props.children;
  // const adminPages = childrenArr.filter(item => {
  //   return item.props.path.startsWith('/admin');
  // });
  // const childrenPages = childrenArr.filter(item => {
  //   return !item.props.path.startsWith('/admin');
  // });
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      {loginCheck ? (
        boolAdminUrl ? (
          <>
            <Header childrenElemant={children[1].props.children}/>
            <main className={styles.admin}>
              <div className={styles.admin__wrap}>
                <div className={styles.nav}>
                  <Navigation
                    onSelect = {({itemId}) => {
                      navigate(itemId);
                    }}
                    items = {[
                      {
                        title: '사용자 관리',
                        elemBefore: () => <IconImage icon={'USERMG'}/>,
                        subNav: [
                          {
                            title: '사용자 정보',
                            itemId: '/admin/userMg'
                          },
                          {
                            title: '추가/등록',
                            itemId: '/admin/userReg'
                          },
                        ],
                      },
                      {
                        title: '설정',
                        itemId: '/admin/setting',
                        elemBefore: () => <IconImage icon={'SETTING'}/>,
                        subNav: [
                          {
                            title: '테마',
                            itemId: '/admin/theme',
                          },
                        ],
                      },
                    ]}
                  />
                </div>
                <div className={styles.content}>
                  {children}
                </div>
              </div>
            </main>
          </>
        ) : (
          <>
            <Header childrenElemant={children[1].props.children}/>
            <main>
              {children}
            </main>
          </>
        )
      ) : (
        <>
          <main className={styles.login}>
            {children}
          </main>
        </>
      )
      }
      <Footer />
    </div>
  )
}

export { Layout };

