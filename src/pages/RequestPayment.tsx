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
  const [accountNumber, setAccountNumber] = useState('');

  const { fetchBankData, resolveAccount, accountName } = useReqPay();
  const { txnDetails, fetchTxnDetails } = useTxns();
  const { txnId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { bankData, form } = useSelector(
    (store: RootState) => store.requestPayment
  );

  useEffect(() => {
    fetchBankData();
    fetchTxnDetails(txnId);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (accountNumber.length === 10) {
        resolveAccount(String(accountNumber), form.bank_code);
        dispatch(
          handlePaymentForm({ name: 'account_number', value: accountNumber })
        );
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [accountNumber]);

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

        <div className="w-[80%] mx-auto">
          <input
            type="number"
            name="account_number"
            placeholder="Account number"
            onChange={(e: any) => {
              setAccountNumber(e.target.value);
            }}
            value={accountNumber}
            className="border-2 border-gray-400 text-center text-lg w-full py-2 rounded-lg"
          />
          <div className="w-[80%] mt-1">
            {accountName && accountNumber.length === 10 ? (
              accountName
            ) : (
              <span className="loading loading-dots w-6"></span>
            )}
          </div>
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
          <PaymentProcessing
            txnDetails={txnDetails}
            accountNumber={accountNumber}
          />
        </div>
      </section>
    </main>
  );
};

export default RequestPayment;
