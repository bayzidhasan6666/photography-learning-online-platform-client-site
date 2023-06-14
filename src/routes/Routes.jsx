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
import MyClasses from '../pages/DashboardCompo/InstractorDb/MyClasses/MyClasses';
import ManageClasses from '../pages/DashboardCompo/ManageClasses/ManageClasses';
import Instructors from '../pages/Instructors/Instructors';
import AllClasses from '../pages/AllClasses/AllClasses';
import AdminRoute from './AdminRoute';
import InstructorRoute from './InstructorRoute';
import StudentRoute from './StudentRoute';
import EnrolledClass from '../pages/DashboardCompo/StudentDb/EnrolledClass/EnrolledClass';
import PaymentHistory from '../pages/DashboardCompo/Payment/PaymentHistory';
import About from '../pages/About/About';
import Blog from '../pages/Blog/Blog';
import Contact from '../pages/Contact/Contact';

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
        path: 'instructors',
        element: <Instructors></Instructors>,
      },
      {
        path: 'allClasses',
        element: <AllClasses></AllClasses>,
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
        path: 'about',
        element: <About></About>,
      },
      {
        path: 'blog',
        element: <Blog></Blog>,
      },
      {
        path: 'contact',
        element: <Contact></Contact>,
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
      // admin routes-----------
      {
        path: 'dashboard/manageUsers',
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: 'dashboard/manageClasses',
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      // instructor routes-------
      {
        path: 'dashboard/addClasses',
        element: (
          <InstructorRoute>
            {' '}
            <AddClasses></AddClasses>
          </InstructorRoute>
        ),
      },
      {
        path: 'dashboard/myClasses',
        element: (
          <InstructorRoute>
            {' '}
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      // student routes---------
      {
        path: 'dashboard/selectedClass',
        element: <SelectedClasses></SelectedClasses>,
      },
      {
        path: 'dashboard/payment/:_id',
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://photography-school-server-site.vercel.app/selectedClass/${params._id}`
          ),
      },
      {
        path: 'dashboard/enrolledClass',
        element: <EnrolledClass></EnrolledClass>,
      },
      {
        path: 'dashboard/paymentHistory',
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);

export default router;
