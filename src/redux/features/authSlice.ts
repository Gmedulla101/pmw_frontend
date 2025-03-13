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
  isLoading: false,
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { handleForm, setIsLoading, setErrorMsg } = authSlice.actions;
