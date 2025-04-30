//HOOKS
import { useEffect, useState } from 'react';
import useTxns from '../hooks/useTxns';
import useReqPay from '../hooks/useReqPay';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';

import { handlePaymentForm } from '../redux/features/requestPaymentSlice';

//COMPONENTS
import BankOptions from '../components/Request_pay/BankOptions';
import { ToastContainer } from 'react-toastify';
import { PaymentProcessing } from '../components/txnPageButtons/TxnButtons';

const RequestPayment = () => {
  const { fetchBankData } = useReqPay();
  const { txnDetails, fetchTxnDetails } = useTxns();
  const { txnId } = useParams();
  console.log(txnId);

  const dispatch = useDispatch<AppDispatch>();
  const { bankData, form } = useSelector(
    (store: RootState) => store.requestPayment
  );

  useEffect(() => {
    fetchBankData();
    fetchTxnDetails(txnId);
  }, []);

  console.log(form);

  return (
    <main>
      <ToastContainer />
      <h1 className="text-center mt-10 font-bold text-2xl md:text-3xl">
        {' '}
        Enter your details for payment processing{' '}
      </h1>

      <section className="py-5 mx-auto flex flex-col gap-5 mt-5 px-3 md:px- w-[90%]">
        <div className="flex flex-col gap-5 items-center w-[80%] mx-auto">
          <BankOptions bankData={bankData} />
        </div>

        <div className="flex items-center w-[80%] mx-auto">
          <input
            type="number"
            name="account_number"
            placeholder="Account number"
            onChange={(e: any) => {
              dispatch(
                handlePaymentForm({
                  name: e.target.name,
                  value: e.target.value,
                })
              );
            }}
            className="border-2 border-gray-400 text-center text-lg w-full py-2 rounded-lg"
          />
        </div>

        <div>
          <p>
            {' '}
            Amount to be paid:{' '}
            <span className="font-semibold">
              {' '}
              #{txnDetails?.txnItemValue.toLocaleString()}
            </span>
          </p>
        </div>

        <div>
          <PaymentProcessing txnDetails={txnDetails} />
        </div>
      </section>
    </main>
  );
};

export default RequestPayment;
