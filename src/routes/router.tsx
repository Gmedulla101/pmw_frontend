import { createBrowserRouter } from 'react-router';
import App from '../App';

//ROUTE PAGES
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import CreateTxn from '../pages/CreateTxn';
import TxnPage from '../pages/TxnPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/user-profile',
        element: <Profile />,
      },
      {
        path: '/create-transaction',
        element: <CreateTxn />,
      },
      {
        path: '/transactions/:id',
        element: <TxnPage />,
      },
    ],
  },
]);

export default router;
