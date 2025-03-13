import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './CSS/main.css';

//REACT ROUTER THINGS
import { RouterProvider } from 'react-router';
import router from './routes/router.tsx';

//REDUX TOOLKIT THNIGS
import store from './redux/store.tsx';
import { Provider } from 'react-redux';

//APP CONTEXT
import UserContext from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <UserContext>
    <Provider store={store}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </Provider>
  </UserContext>
);
