import { configureStore } from '@reduxjs/toolkit';

//IMPORTING REDUCERS
import sideBarReducer from './features/sidebarSlice';
import { authReducer } from './features/authSlice';
import resetReducer from './features/resetSlice';

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    auth: authReducer,
    reset: resetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
