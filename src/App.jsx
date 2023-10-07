import { Provider } from 'react-redux';
import { store } from 'reduxStore/store';
import { Layout } from 'components/templates/Layout/Layout';
import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/home';
import TaskManagePage from 'pages/taskManage';
import EnterpriseManagePage from 'pages/enterpriseManage';
import EnterpriseRegPage from 'pages/enterpriseManage/enterpriseRegPage/EnterpriseRegPage';
import EnterpriseDtlPage from 'pages/enterpriseManage/enterpriseDtlPage/EnterpriseDtlPage';

function App() {

  return (
    <Provider store={store}>
      <Layout>

        <Routes>
            <Route exact path="/"               element = {<HomePage />            } />
            <Route path ="/enterprise"          element = {<EnterpriseManagePage />} />
            <Route path ="/enterprise/register" element = {<EnterpriseRegPage />   } />
            <Route path ="/enterprise/detail"   element = {<EnterpriseDtlPage />   } />
            <Route path ="/task"                element = {<TaskManagePage />      } />
        </Routes>

      </Layout>
    </Provider>

  );
}

export default App;