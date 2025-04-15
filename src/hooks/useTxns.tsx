import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import { API } from './useAuth';
import { useGlobalUserContext } from '../context/UserContext';
import { TxnDetails } from '../components/txnPage/TxnPageContent';

const useTxns = () => {
  const [txnDetails, setTxnDetails] = useState<TxnDetails>();
  const { userToken } = useGlobalUserContext();

  const navigate = useNavigate();

  //FUNCTIONALITY TO CREATE TRANSACTIONS
  const createTxn = async () => {
    try {
      const response = await axios.post(
        `${API}/txn/create-transaction`,
        txnDetails,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success('Transaction created!');
      setTimeout(() => {
        navigate(`/transaction/${response.data.transaction.id}`);
      }, 3000);
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
      navigate(`/transaction/${txnDetails?.id}`);
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  //FUNCTIONALITY FOR MAKING PAYMENTS
  const makePayment = () => {
    console.log('paid');
  };

  return {
    fetchTxnDetails,
    txnDetails,
    joinTransaction,
    makePayment,
    createTxn,
  };
};

export default useTxns;
