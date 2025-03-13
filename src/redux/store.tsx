import { configureStore } from '@reduxjs/toolkit';

//IMPORTING REDUCERS
import sideBarReducer from './features/sidebarSlice';
import { authReducer } from './features/authSlice';

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
