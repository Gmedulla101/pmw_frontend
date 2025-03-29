//IMPORTING HELPER COMPONENTS
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING DEPS AND HOOKS
import { API } from '../hooks/useAuth';
import axios from 'axios';
import { useState } from 'react';
import { useGlobalUserContext } from '../context/UserContext';
import { TxnDetails } from './TxnPage';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const JoinTxn = () => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>();
  const { userToken } = useGlobalUserContext();
  const [txnDetails, setTxnDetails] = useState<TxnDetails>();

  const fetchTxnDetails = async () => {
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
      navigate(`/transactions/${txnDetails?.id}`);
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <main className="px-5 md:px-10 mt-8">
      <section>
        <ToastContainer />
        <h1 className="text-center text-2xl lg:text-3xl font-semibold">
          {' '}
          Join a transaction{' '}
        </h1>

        <div className="mt-7 flex flex-col items-center gap-3">
          <p className="text-center">
            Enter the Transaction ID that was sent in your invitation
          </p>
          <input
            className="text-center border border-gray-400 rounded-lg py-2 px-4"
            type="text"
            placeholder="Transaction ID"
            onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
          />
          <div className="flex justify-center">
            <button
              onClick={fetchTxnDetails}
              className="p-2 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <aside className="mt-8 pb-8">
        {!txnDetails ? (
          <LoaderComponent />
        ) : (
          <section className="border border-gray-200 p-4 rounded-lg mt-5">
            <h1 className="font-bold text-2xl mb-2"> Item/Service details </h1>
            <div className="flex justify-between">
              <p>{txnDetails.txnItem}</p>
              <p> #{txnDetails.txnItemValue.toLocaleString()} </p>
            </div>
            <div className="mt-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: txnDetails.txnItemDescription.replace(/\n/g, '<br>'),
                }}
              ></p>
            </div>
            <div className="mt-5 flex justify-between">
              <p> Cash:</p>
              <p>
                {' '}
                {txnDetails.cashConfirmed ? 'Deposited' : 'Not deposited'}{' '}
              </p>
            </div>
            <div className="mt-5 flex justify-between">
              <p> Product:</p>
              <p>
                {' '}
                {txnDetails.productConfirmed
                  ? 'Delivered'
                  : 'Not delivered'}{' '}
              </p>
            </div>
            <div className="mt-5 flex justify-between">
              <p> Escrow fee:</p>
              <p>#{(txnDetails.txnItemValue * 0.02).toLocaleString()}</p>
            </div>{' '}
            <div onClick={joinTransaction} className="flex justify-center mt-5">
              <button className="p-2 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72">
                Join transaction
              </button>
            </div>
          </section>
        )}
      </aside>
    </main>
  );
};

export default JoinTxn;
