import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/AuthCompo/SignIn/Login';
import SignUp from '../pages/AuthCompo/SignUp/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/signUp',
        element: <SignUp></SignUp>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
