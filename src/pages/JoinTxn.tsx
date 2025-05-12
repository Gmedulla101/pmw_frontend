//IMPORTING HELPER COMPONENTS
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING DEPS AND HOOKS
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useTxns from '../hooks/useTxns';

const JoinTxn = () => {
  const [id, setId] = useState<string>('');

  const { fetchTxnDetails, txnDetails, joinTransaction } = useTxns();

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
              onClick={() => {
                fetchTxnDetails(id);
              }}
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
            <div
              onClick={() => {
                joinTransaction(txnDetails.id);
              }}
              className="flex justify-center mt-5"
            >
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
