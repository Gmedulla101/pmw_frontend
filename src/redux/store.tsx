import { configureStore } from '@reduxjs/toolkit';

//IMPORTING REDUCERS
import sideBarReducer from './features/sidebarSlice';
import { authReducer } from './features/authSlice';
import resetReducer from './features/resetSlice';
import requestPaymentReducer from './features/requestPaymentSlice';

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    auth: authReducer,
    reset: resetReducer,
    requestPayment: requestPaymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
