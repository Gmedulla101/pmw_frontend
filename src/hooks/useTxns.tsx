import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API } from './useAuth';
import { useGlobalUserContext } from '../context/UserContext';
import { TxnDetails } from '../components/txnPage/TxnPageContent';

const useTxns = () => {
  const [txnDetails, setTxnDetails] = useState<TxnDetails>();
  const { userToken } = useGlobalUserContext();


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

  

  return { fetchTxnDetails, txnDetails };
};

export default useTxns;
