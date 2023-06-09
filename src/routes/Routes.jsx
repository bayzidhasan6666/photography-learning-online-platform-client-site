import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/AuthCompo/SignIn/Login';
import SignUp from '../pages/AuthCompo/SignUp/SignUp';
import Home from '../pages/HomeCompo/Home/Home';
import Dashboard from '../pages/DashboardCompo/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import UserInfo from '../pages/UserCompo/UserInfo/UserInfo';
import ManageUsers from '../pages/DashboardCompo/Dashboard/ManageUsers/ManageUsers';
import AddClasses from '../pages/DashboardCompo/InstractorDb/AddClasses/AddClasses';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import SelectedClasses from '../pages/DashboardCompo/StudentDb/SelectedClasses/SelectedClasses';
import Payment from '../pages/DashboardCompo/Payment/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'signUp',
        element: <SignUp></SignUp>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'profile',
        element: <UserInfo></UserInfo>,
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [],
      },
      {
        path: 'dashboard/manageUsers',
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: 'dashboard/addClasses',
        element: <AddClasses></AddClasses>,
      },
      {
        path: 'dashboard/enrolledClass',
        element: <SelectedClasses></SelectedClasses>,
      },
      {
        path: 'dashboard/payment',
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
