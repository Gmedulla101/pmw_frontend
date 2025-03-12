import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './CSS/main.css';

//REACT ROUTER THINGS
import { RouterProvider } from 'react-router';
import router from './routes/router.tsx';

//REDUX TOOLKIT THNIGS
import store from './redux/store.tsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
