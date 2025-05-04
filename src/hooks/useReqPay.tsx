import axios from 'axios';
import { useGlobalUserContext } from '../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setBankdata } from '../redux/features/requestPaymentSlice';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-toastify';

import { API } from './useAuth';

const useReqPay = () => {
  const { userToken } = useGlobalUserContext();
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { form } = useSelector((store: RootState) => store.requestPayment);

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

  const resolveAccount = async (account_number: string, bank_code: string) => {
    try {
      if (account_number.length === 10) {
        const response = await axios.get(
          `${API}/txn/resolve-account?account_number=${account_number}&bank_code=${bank_code}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setAccountName(response.data.data.account_name);
      } else {
        setAccountName('');
      }
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const collectPayment = async (txnId: string, accountNumber: string) => {
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      const { account_number, bank_code } = form;

      if (
        !account_number ||
        !bank_code ||
        !accountNumber ||
        accountNumber.length < 10
      ) {
        toast.error('Ensure complete bank details before proceeding!');
        return;
      }

      await axios.post(
        `${API}/txn/collect-payment`,
        {
          txnId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success(
        'Payment successful, your account will be credited shortly!'
      );
      setIsLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  return {
    fetchBankData,
    resolveAccount,
    accountName,
    collectPayment,
    isLoading,
  };
};

export default useReqPay;
