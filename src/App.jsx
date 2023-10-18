import { Provider } from 'react-redux';
import { store } from 'reduxStore/store';
import { Layout } from 'components/templates/Layout/Layout';
import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/home';
import TaskManagePage from 'pages/taskManage';
import EnterpriseManagePage from 'pages/enterpriseManage';
import EnterpriseRegPage from 'pages/enterpriseManage/enterpriseRegPage/EnterpriseRegPage';
import EnterpriseDtlPage from 'pages/enterpriseManage/enterpriseDtlPage/EnterpriseDtlPage';
import { GlobalModal } from 'reduxStore/GlobalModal';
import { TaskRegPage } from 'pages/taskManage/taskRegPage/TaskRegPage';

function App() {

  return (
    <Provider store={store}>
      <Layout>
      <GlobalModal />
        <Routes>
            <Route exact path="/"               element = {<HomePage />            } />
            <Route path ="/enterprise"          element = {<EnterpriseManagePage />} />
            <Route path ="/enterprise/register" element = {<EnterpriseRegPage />   } />
            <Route path ="/enterprise/detail"   element = {<EnterpriseDtlPage />   } />
            <Route path ="/task"                element = {<TaskManagePage />      } />
            <Route path ="/task/register"       element = {<TaskRegPage />         } />
        </Routes>

      </Layout>
    </Provider>

  );
}

export default App;