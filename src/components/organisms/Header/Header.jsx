import { IconImage } from 'components/atoms';
import { HeaderMenu } from 'pages/api/HeaderObject';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = React.memo((childrenElemant) => {
  const navigate = useNavigate();

  const onClickMoveToPage = (path) => {
    if(childrenElemant[2] || childrenElemant[5]) {
      const confirmNavigation = window.confirm("다른 페이지로 이동하시겠습니까? 입력정보가 저장되지 않을 수 있습니다.");

      if(confirmNavigation) {

        navigate(path);
      }

    }else {
      navigate(path);
    }
  }

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.nav__logo}>
          <IconImage icon = "LOGO" onClickEvent = {() => navigate('/')} />
        </div>
        <div className={styles.nav__menu}>
          <ul className={styles.nav__menu__bar}>
            {HeaderMenu.filter((menu) => menu.mnu_type_cd === '01').map((menu, key) => (
              <>
                <li key={key} onClick={() => onClickMoveToPage(menu.prgr_path)}>
                  {menu.name}
                </li>
                <div></div>
              </>
            ))}
          </ul>
        </div>
        <div className={styles.nav__user}>
          <div>itfact</div>
          <IconImage icon='ADMIN' />
        </div>
      </nav>
    </header>
  )
});

export default Header;