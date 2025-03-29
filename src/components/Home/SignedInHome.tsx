import { useEffect } from 'react';
import { Link } from 'react-router';

//IMPORTING HELPER COMPONENTS AND ASSETS
import TxnInfoBox from './TxnInfoBox';
import MoneyFlowBox from './MoneyFlowBox';
import create from '../../assets/plus.png';
import join from '../../assets/partnership.png';

import TxnTable from './TxnTable';
import useFetchHomeData from '../../hooks/useFetchHomeData';

const SignedInHome = () => {
  const { tableData, fetchData } = useFetchHomeData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className="mx-3 lg:mx-10">
        <section className="flex flex-row mt-5 gap-2 sm:gap-5 justify-center lg:justify-around">
          <TxnInfoBox tableData={tableData} />
          <MoneyFlowBox tableData={tableData} />
        </section>

        {/* ACTION BUTTON */}
        <section className="mt-5 flex flex-row sm:gap-5 justify-around">
          <Link
            to={'/create-transaction'}
            className="flex justify-center w-[45%] rounded-lg py-1 px-2  text-white bg-gray-800 font-bold cursor-pointer transition hover:scale-105 lg:w-[35%] text-xs md:text-base"
          >
            <button className="flex justify-center items-center gap-2 cursor-pointer">
              <img src={create} alt="" className="w-5 md:w-8" />
              <span>Create a transaction</span>
            </button>
          </Link>

          <Link
            to={'/join-transaction'}
            className="flex  justify-center  w-[45%] rounded-lg py-1 px-2  text-white bg-gray-500 font-bold cursor-pointer transition hover:scale-105 lg:w-[35%] text-xs md:text-base"
          >
            <button className="flex flex-row justify-center items-center gap-2 cursor-pointer">
              <img src={join} alt="" className="w-8 md:w-12" />
              <span>Join a transaction</span>
            </button>
          </Link>
        </section>

        {/* TRANSACTIONS TABLE */}
        <section className="mt-10 mx-3 lg:mx-8">
          {tableData.length < 1 ? (
            ''
          ) : (
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Scroll to see more details about your transactions
              </p>
              <p className="text-xs text-gray-500 mb-1">
                Click to see transaction details
              </p>
            </div>
          )}
          <TxnTable tableData={tableData} />
        </section>
      </main>
    </>
  );
};

export default SignedInHome;
