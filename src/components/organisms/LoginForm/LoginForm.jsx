import { IconImage } from 'components/atoms';
import { submitLoginInfoAPI } from 'pages/api/Login/LoginAPI';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    user_id : '',
    user_pwd: '',
  });

  const onChangeLoginData = (name, value) => {
    setLoginData((prev) => {
      return (
        {...prev,
          [name]: value,
        }
      )
    });
  }

  const onClickLogin = () => {
    submitLoginInfoAPI(loginData).then((response) => {

    })
    .catch((err) => {
      alert(`Axios API Error: ${err}`);
    })
  }

  return (
    <div className={styles.login}>
      <div>
        <div>
          <IconImage icon={'LOGINFORM'} />
        </div>
        <div className={styles.login__form}>
          <div>
            <div>Customer Management</div>
            <div>Service</div>
          </div>
          <input value={loginData.user_id} placeholder='User ID' onChange={(e)=>onChangeLoginData('user_id', e.target.value)}/>
          <input value={loginData.user_pwd} placeholder='User Password' onChange={(e)=>onChangeLoginData('user_pwd', e.target.value)}/>
          <button className={`${styles.custom__btn} ${styles.btn}`} onClick={onClickLogin}>
            <span>Login</span>
          </button>
          <div>
            <Link>ID/PW를 잊으셨습니까?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;