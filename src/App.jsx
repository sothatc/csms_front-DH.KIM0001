import LoginForm from 'components/organisms/LoginForm/LoginForm';
import { Layout } from 'components/templates/Layout/Layout';
import EnterpriseManagePage from 'pages/enterpriseManage';
import EnterpriseDtlPage from 'pages/enterpriseManage/enterpriseDtlPage/EnterpriseDtlPage';
import EnterpriseRegPage from 'pages/enterpriseManage/enterpriseRegPage/EnterpriseRegPage';
import TaskManagePage from 'pages/taskManage';
import { TaskDtlPage } from 'pages/taskManage/taskDtlPage/TaskDtlPage';
import { TaskRegPage } from 'pages/taskManage/taskRegPage/TaskRegPage';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { GlobalModal } from 'reduxStore/GlobalModal';
import { store } from 'reduxStore/store';
import HomePage from './pages/home';
import { UserManagePage } from 'pages/adminPage/UserManage/UserManagePage';
import { UserRegPage } from 'pages/adminPage/UserRegPage/UserRegPage';
import { checkCookieTokenExistence } from 'pages/api/useCookie';

function App() {
  const loginCheck = checkCookieTokenExistence();

  return (
    <Provider store={store}>
      <Layout loginCheck={loginCheck}>
        <GlobalModal />
        <Routes>
          {!loginCheck
            ?
            <Route exact path ="/" element = {<LoginForm />} />
            :
            <>
              <Route exact path="/"                     element = {<HomePage />            } />
              <Route exact path ="/enterprise"          element = {<EnterpriseManagePage />} />
              <Route exact path ="/enterprise/register" element = {<EnterpriseRegPage />   } />
              <Route exact path ="/enterprise/detail"   element = {<EnterpriseDtlPage />   } />
              <Route exact path ="/task"                element = {<TaskManagePage />      } />
              <Route exact path ="/task/register"       element = {<TaskRegPage />         } />
              <Route exact path ="/task/detail"         element = {<TaskDtlPage />         } />
              <Route exact path ="/admin/userMg"        element = {<UserManagePage />      } />
              <Route exact path ="/admin/userReg"       element = {<UserRegPage />         } />
            </>
          }
        </Routes>
      </Layout>
    </Provider>

  );
}

export default App;