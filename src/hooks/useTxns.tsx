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
  const { userToken } = useGlobalUserContext();

  const navigate = useNavigate();

  //FUNCTIONALITY TO CREATE TRANSACTIONS
  const createTxn = async (createTxnDetails: CreateTxnDetails) => {
    try {
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
        navigate(`/transaction/${response.data.transaction.id}`);
      }, 1500);
    } catch (error: any) {
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
      const response = await axios.get(`${API}/txn/get-transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setTxnDetails(response.data.txn);
    } catch (error: any) {
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
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  //FUNCTIONALITY TO JOIN A TRANSACTION
  const joinTransaction = async () => {
    try {
      await axios.patch(
        `${API}/txn/join-transaction/${txnDetails?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success("You've joined the transaction!");
      setTimeout(() => {
        navigate(`/transaction/${txnDetails?.id}`);
      }, 1500);
    } catch (error: any) {
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
      window.location.href = authorization_url;
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const verifyPayment = async (txnRef: string) => {
    try {
      await axios.get(`${API}/txn/verify-payment/${txnRef}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const txnId = txnRef.split('_')[1];

      toast.success('Payment verified!.');
      setTimeout(() => {
        navigate(`/transaction/${txnId}`);
      }, 1500);
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
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
  };
};

export default useTxns;
