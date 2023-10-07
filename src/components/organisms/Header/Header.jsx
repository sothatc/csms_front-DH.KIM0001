import React, { useCallback, useState } from 'react'
import { IconImage } from 'components/atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderMenu } from 'pages/api/HeaderObject';
import styles from './Header.module.scss';


// const Nav = React.memo(()=>{
//   // const location = useLocation();
//   const navigate = useNavigate();
//   const [hover, setHover] = useState(false);

//   const moveToPage = () => {
//     setHover(false);
//     // navigate("/");
//   }

//   // const submitLogout = useCallback(() => {
//   //     deleteCookie('token');
//   //     deleteCookie('userId');
//   //     navigate('/');
//   // }, [])

//   return (

//   )
// });

const Header = React.memo(() => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const moveToPage = () => {
    setHover(false);
    // navigate("/");
  }

  // const submitLogout = useCallback(() => {
  //     deleteCookie('token');
  //     deleteCookie('userId');
  //     navigate('/');
  // }, [])

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.nav__logo}>
          <IconImage icon = "LOGO" onClickEvent = {() => navigate('/')} />
        </div>
        <div className={styles.nav__menu}>
          <ul className={styles.nav__menu__bar}>
            {HeaderMenu.filter((menu) => menu.mnu_type_cd === '01').map((menu, key) => (
              <li key={key} onClick={() => navigate(menu.prgr_path)}>
                {menu.name}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
});

export default Header;