import Footer from 'components/organisms/Footer/Footer';
import Header from 'components/organisms/Header/Header';
import styles from './Layout.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from 'react-minimal-side-navigation';
import { IconImage } from 'components/atoms';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Layout = ({ children, loginCheck }) => {
  const childrenArr = children[1].props.children.props.children;

  const location = useLocation();
  const boolAdminUrl = location.pathname.startsWith('/admin');
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
            <main>
              <div className={styles.admin}>
                <div className={styles.nav}>
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
                            itemId: '/admin/addUser'
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
                            itemId: '/admin/theme',
                          },
                        ],
                      },
                    ]}
                  />
                </div>
                {children}
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
