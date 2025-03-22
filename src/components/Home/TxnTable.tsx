import { useState, useEffect } from 'react';
import { useGlobalUserContext } from '../../context/UserContext';
import axios from 'axios';
import LoaderComponent from '../LoaderComponent';

const TxnTable = () => {
  const API = import.meta.env.VITE_BASE_API_URL;

  const { userToken } = useGlobalUserContext();

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTableData = async () => {
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

    fetchTableData();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <table className="w-full">
          <thead className="block w-full bg-black py-3 px-3 rounded-t-lg text-white font-bold">
            <tr className="text-[14px] flex flex-row justify-between w-full ">
              <td className="w-full text-center"> Seller </td>
              <td className="w-full text-center"> Buyer </td>
              <td className="w-full text-center"> Transaction Status </td>
              <td className="w-full text-center"> Item </td>
              <td className="w-full text-center"> Transation Value </td>
            </tr>
          </thead>
          <tbody className="w-full bg-gray-200 py-3 px-3 rounded-b-lg">
            {tableData?.map((data: any, i) => {
              return (
                <tr
                  key={i}
                  className="text-[14px] flex flex-row justify-between w-full py-3 px-3"
                >
                  <td className="w-full text-center">
                    {data?.seller?.firstName ? data.seller.firstName : 'TBI'}
                  </td>
                  <td className="w-full text-center">
                    {data?.buyer?.firstName ? data.buyer.firstName : 'TBI'}
                  </td>
                  <td className="w-full text-center"> {data.status} </td>
                  <td className="w-full text-center"> {data.txnItem} </td>
                  <td className="w-full text-center">
                    {' '}
                    {data.txnItemValue.toLocaleString()}{' '}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TxnTable;
