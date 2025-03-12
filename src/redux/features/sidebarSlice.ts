import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    test: "Testing!"
};

const sideBarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setIsOpen: (state) => {
            state.isOpen = !state.isOpen
        }
    }
});


const sideBarReducer = sideBarSlice.reducer;
 export const {setIsOpen} = sideBarSlice.actions;

 export default sideBarReducer;
 
