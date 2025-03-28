//IMPOORTING REQUIRED DEPS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { API } from '../hooks/useAuth';
import { useGlobalUserContext } from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';

//IMPORTING HELPER COMPONENTS
import LoaderComponent from '../components/LoaderComponent';

type TxnDetails = {
  buyerId: string | null;
  cashConfirmed: boolean;
  id: string;
  productConfirmed: boolean;
  sellerId: string | null;
  status: 'pending' | 'confirmed';
  txnItem: string;
  txnItemCategoryId: string;
  txnItemDescription: string;
  txnItemValue: number;
};

const TxnPage = () => {
  const { id } = useParams();
  const { userToken } = useGlobalUserContext();

  const [txnDetails, setTxnDetails] = useState<TxnDetails>();

  useEffect(() => {
    const fetchTxnDetails = async () => {
      try {
        const response = await axios.get(`${API}/txn/get-transaction/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setTxnDetails(response.data.txn);

        console.log(response);
      } catch (error: any) {
        if (error?.response?.data?.msg) {
          toast.error(error?.response?.data?.msg);
        } else {
          toast.error(error.message);
        }
      }
    };

    fetchTxnDetails();
  }, []);

  console.log(txnDetails);

  return (
    <>
      <ToastContainer />
      {!txnDetails ? (
        <LoaderComponent />
      ) : (
        <section>
          <h1> Money man </h1>
        </section>
      )}
    </>
  );
};

export default TxnPage;
