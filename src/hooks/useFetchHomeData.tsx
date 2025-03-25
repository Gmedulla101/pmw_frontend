import { useState } from 'react';
import axios from 'axios';
import { useGlobalUserContext } from '../context/UserContext';

type TableData = {
  seller: any;
  buyer: any;
  txnItem: string;
  txnItemValue: number;
  status: boolean;
};

const API = import.meta.env.VITE_BASE_API_URL;

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
