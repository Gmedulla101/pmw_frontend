import axios from 'axios';
import { useGlobalUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setBankdata } from '../redux/features/requestPaymentSlice';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-toastify';

import { API } from './useAuth';

const useReqPay = () => {
  const { userToken } = useGlobalUserContext();
  const dispatch = useDispatch<AppDispatch>();

  const fetchBankData = async () => {
    try {
      const response = await axios.get(`${API}/txn/get-banks`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch(setBankdata(response.data));
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const resolveAccount = async () => {
    try {
        const response = await axios.get(`${API}/txn/resolve-payment`)
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);  
      } else {
        toast.error(error.message);
      }
    }
  };

  return {
    fetchBankData,
  };
};

export default useReqPay;
