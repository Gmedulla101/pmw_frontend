import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  code: undefined,
  password: '',
  confirmPassword: '',
};

const resetSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    handleChange: (state: any, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { handleChange } = resetSlice.actions;

const resetReducer = resetSlice.reducer;

export default resetReducer;
