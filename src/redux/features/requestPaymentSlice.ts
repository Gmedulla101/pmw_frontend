import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: {
    account_number: '',
    bank_code: '',
    bank: '',
  },
  bankData: [''],
};

const requestPaymentSlice = createSlice({
  name: 'requestPayment',
  initialState,
  reducers: {
    setBankdata: (state, action) => {
      const { data } = action.payload;
      state.bankData = [...data];
    },

    handlePaymentForm: (state: any, action) => {
      const { name, value } = action.payload;
      state.form[name] = value;
    },
  },
});

export const { setBankdata, handlePaymentForm } = requestPaymentSlice.actions;
const requestPaymentReducer = requestPaymentSlice.reducer;

export default requestPaymentReducer;
