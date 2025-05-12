import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import { API } from './useAuth';
import { useGlobalUserContext } from '../context/UserContext';
import { TxnDetails } from '../components/txnPage/TxnPageContent';
export type CreateTxnDetails = {
  userRole: string;
  txnItem: string;
  txnItemCategory: string;
  txnItemValue: string;
  txnItemDescription: string;
};

const useTxns = () => {
  const [txnDetails, setTxnDetails] = useState<TxnDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userToken } = useGlobalUserContext();

  const navigate = useNavigate();

  //FUNCTIONALITY TO CREATE TRANSACTIONS
  const createTxn = async (createTxnDetails: CreateTxnDetails) => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const response = await axios.post(
        `${API}/txn/create-transaction`,
        createTxnDetails,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success('Transaction created!');

      setTimeout(() => {
        setIsLoading(false);
        navigate(`/transaction/${response.data.transaction.id}`);
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

  //FUNCTIONALITY TO FETCH THE TRANSACTION DETAILS ON THE TRANSACTION PAGE.
  const fetchTxnDetails = async (id: string | undefined) => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const response = await axios.get(`${API}/txn/get-transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setTxnDetails(response.data.txn);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  //FUNCTIONALITY FOR CANCELLING TRANSACTIONS
  const cancelTxn = async (txnId: string | undefined) => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      await axios.put(
        `${API}/txn/update-transaction/${txnId}`,
        { status: 'cancelled' },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success('Transaction cancelled');
      setIsLoading(false);
      setTimeout(() => {
        navigate(`/transaction/${txnId}`);
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

  //FUNCTIONALITY TO JOIN A TRANSACTION
  const joinTransaction = async (txnId: string) => {
    try {
      console.log(isLoading);
      if (isLoading) {
        return;
      }
      setIsLoading(true);

      await axios.patch(
        `${API}/txn/join-transaction/${txnId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success("You've joined the transaction!");
      setTimeout(() => {
        setIsLoading(false);

        navigate(`/transaction/${txnId}`);
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

  //FUNCTIONALITY FOR MAKING PAYMENTS
  const makePayment = async (txnId: string | undefined) => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const response = await axios.post(
        `${API}/txn/make-payment/${txnId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const { authorization_url } = response.data.data;
      setIsLoading(false);
      window.location.href = authorization_url;
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const verifyPayment = async (txnRef: string) => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      await axios.get(`${API}/txn/verify-payment/${txnRef}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const txnId = txnRef.split('_')[1];

      toast.success('Payment verified!.');
      setIsLoading(false);
      setTimeout(() => {
        navigate(`/transaction/${txnId}`);
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

  const requestPayment = (txnId: string) => {
    navigate(`/payment-request/${txnId}`);
  };

  const deliverGoods = async () => {
    console.log('delivered');
  };
  return {
    fetchTxnDetails,
    txnDetails,
    joinTransaction,
    makePayment,
    createTxn,
    cancelTxn,
    verifyPayment,
    deliverGoods,
    requestPayment,
    isLoading,
  };
};

export default useTxns;
