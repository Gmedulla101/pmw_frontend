import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  code: undefined,
  password: '',
  confirmPassword: '',
  isLoading: false,
};

const resetSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    handleChange: (state: any, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setIsLoading: (state: any, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { handleChange, setIsLoading } = resetSlice.actions;

const resetReducer = resetSlice.reducer;

export default resetReducer;
