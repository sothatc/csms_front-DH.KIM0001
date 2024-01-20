import LoginForm from 'components/organisms/LoginForm/LoginForm';
import { Layout } from 'components/templates/Layout/Layout';
import { UserManagePage } from 'pages/adminPage/UserManage/UserManagePage';
import { UserRegPage } from 'pages/adminPage/UserRegPage/UserRegPage';
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

function App() {
  const loginCheck = true;

  return (
    <Provider store={store}>
      <Layout loginCheck={loginCheck}>
        <GlobalModal />
        <Routes>
          {!loginCheck
            ?
            <Route path ="/" element = {<LoginForm />} />
            :
            <>
              <Route exact path="/"               element = {<HomePage />            } />
              <Route path ="/enterprise"          element = {<EnterpriseManagePage />} />
              <Route path ="/enterprise/register" element = {<EnterpriseRegPage />   } />
              <Route path ="/enterprise/detail"   element = {<EnterpriseDtlPage />   } />
              <Route path ="/task"                element = {<TaskManagePage />      } />
              <Route path ="/task/register"       element = {<TaskRegPage />         } />
              <Route path ="/task/detail"         element = {<TaskDtlPage />         } />
              {/* <Route path ="/system"              element = {<UserManagePage />      } /> */}
              <Route path ="/admin/userMg"        element = {<UserManagePage />      } />
              <Route path ="/admin/userReg"       element = {<UserRegPage />         } />
            </>
          }
        </Routes>
      </Layout>
    </Provider>

  );
}

export default App;