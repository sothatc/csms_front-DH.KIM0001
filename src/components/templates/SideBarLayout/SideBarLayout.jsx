import { Navigation } from "react-minimal-side-navigation";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Route, useNavigate } from "react-router-dom";
import styles from './SideBarLayout.module.scss';


const SideBarLayout = ({ children, loginCheck }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <div className={styles.nav}>
        <Navigation
          onSelect = {({itemId}) => {
            navigate(itemId);
          }}
          items = {[
            {
              title: '사용자 관리',
              itemId: '/userMg',
              // elemBefore: () => <IconImage />,
            },
            {
              title: '설정',
              itemId: '/setting',
              // elemBefore: () => <IconImage />,
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
      {children}
    </div>
  )
}

export { SideBarLayout };

