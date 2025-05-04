import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errorMsg: '',
};

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    handleForm: (state, action) => {
      const { name, value } = action.payload;
      state.form = { ...state.form, [name]: value };
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { handleForm, setErrorMsg } = authSlice.actions;
