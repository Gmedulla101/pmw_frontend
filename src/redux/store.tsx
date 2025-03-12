import {configureStore} from '@reduxjs/toolkit';

//IMPORTING REDUCERS
import sideBarReducer from './features/sidebarSlice';


const store = configureStore({
    reducer: {
        sidebar : sideBarReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;