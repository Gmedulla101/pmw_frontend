import Header from '../components/Header';
import TxnInfoBox from '../components/Home/TxnInfoBox';
import MoneyFlowBox from '../components/Home/MoneyFlowBox';
import create from '../assets/plus.png';
import join from '../assets/partnership.png';

import TxnTable from '../components/Home/TxnTable';

const Home = () => {
  return (
    <>
      <Header />
      <main className="mx-3 lg:mx-10">
        <section className="flex flex-row mt-5 gap-2 sm:gap-5 justify-center lg:justify-around">
          <TxnInfoBox />
          <MoneyFlowBox />
        </section>

        {/* ACTION BUTTON */}
        <section className="mt-5 flex flex-row sm:gap-5 justify-around">
          <button className="flex flex-row justify-center items-center w-[45%] rounded-lg py-1 px-2 gap-2 text-white bg-gray-800 font-bold cursor-pointer transition hover:scale-105 lg:w-[35%]">
            <img src={create} alt="" className="w-8" />
            <span>Create a transaction</span>
          </button>

          <button className="flex flex-row justify-center items-center w-[45%] rounded-lg py-1 px-2 gap-2 text-white bg-gray-500 font-bold cursor-pointer transition hover:scale-105 lg:w-[35%]">
            <img src={join} alt="" className="w-12" />
            <span>Join a transaction</span>
          </button>
        </section>

        {/* TRANSACTIONS TABLE */}
        <section className="mt-16 mx-3 lg:mx-8">
          <TxnTable />
        </section>
      </main>
    </>
  );
};

export default Home;
