import { useState } from 'react';
import axios from 'axios';
import { useGlobalUserContext } from '../context/UserContext';
import { API } from './useAuth';

export type TableData = {
  seller: any;
  buyer: any;
  txnItem: string;
  txnItemValue: number;
  status: string;
};

const useFetchHomeData = () => {
  const { userToken } = useGlobalUserContext();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/txn/get-all-transactions`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setTableData(response.data.transactions);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    tableData,
    isLoading,
    fetchData,
  };
};

export default useFetchHomeData;
