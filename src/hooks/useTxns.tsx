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

  return { fetchTxnDetails, txnDetails, joinTransaction };
};

export default useTxns;
