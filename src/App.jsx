import { Layout } from 'components/templates/Layout/Layout';
import EnterpriseManagePage from 'pages/enterpriseManage';
import EnterpriseDtlPage from 'pages/enterpriseManage/enterpriseDtlPage/EnterpriseDtlPage';
import EnterpriseRegPage from 'pages/enterpriseManage/enterpriseRegPage/EnterpriseRegPage';
import TaskManagePage from 'pages/taskManage';
import { TaskRegPage } from 'pages/taskManage/taskRegPage/TaskRegPage';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { GlobalModal } from 'reduxStore/GlobalModal';
import { store } from 'reduxStore/store';
import HomePage from './pages/home';
import { TaskDtlPage } from 'pages/taskManage/taskDtlPage/TaskDtlPage';

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
            <Route path ="/task/detail"         element = {<TaskDtlPage />         } />
        </Routes>

      </Layout>
    </Provider>

  );
}

export default App;