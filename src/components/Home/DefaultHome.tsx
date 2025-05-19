import { Link } from 'react-router';
import useUIUtil from '../../hooks/useUIUtil';

import hero from '../../assets/hero.png';

const DefaultHome = () => {
  const { isDarkMode } = useUIUtil();

  return (
    <>
      <main className="px-5 md:px-10 lg:px-20">
        <section className="flex flex-col items-center gap-5 md:flex-row-reverse md:justify-between">
          <div className="w-[75%] md:w-full">
            <img
              src={hero}
              alt="Payway hero image"
              className="grayscale w-full"
            />
          </div>

          <div className="w-full">
            <h1 className="font-bold text-3xl text-center md:text-left md:text-6xl">
              {' '}
              Welcome to PayWay{' '}
            </h1>
            <p className="font-bold text-xl my-5 text-center md:text-left">
              Buy with confidence, sell with credibility
            </p>
            <div className="flex justify-center">
              <button className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72">
                {' '}
                Get started{' '}
              </button>
            </div>
          </div>
        </section>

        <section className="my-20 px-5 md:px-10">
          <h1 className="text-center text-2xl font-bold"> How it works </h1>

          <article className="flex flex-col gap-10 items-center mt-5 md:flex-row md:justify-between text-center">
            <div
              style={{
                boxShadow: `0 0 5px ${isDarkMode ? 'black' : 'lightgray'}`,
              }}
              className={`w-full px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <h2 className="text-center font-bold text-lg mb-2"> Register </h2>
              <p>
                Create an account on PayWay to start enjoying seamless and
                secure transactions
              </p>
            </div>

            <div
              style={{
                boxShadow: `0 0 5px ${isDarkMode ? 'black' : 'lightgray'}`,
              }}
              className={`w-full px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <h2 className="text-center font-bold text-lg mb-2">
                {' '}
                Create a transaction{' '}
              </h2>
              <p>
                Creating a secure transaction on Payway is as simple as clicking
                a button
              </p>
            </div>

            <div
              style={{
                boxShadow: `0 0 5px ${isDarkMode ? 'black' : 'lightgray'}`,
              }}
              className={`w-full px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <h2 className="text-center font-bold text-lg mb-2">
                {' '}
                Make/Collect your payment{' '}
              </h2>
              <p>
                Whether you are a buyer or a seller, you can be confident that
                your money will flow appopriately
              </p>
            </div>
          </article>
        </section>
      </main>
      <footer
        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} py-2 px-5`}
      >
        <Link to={'/'}>
          <h1 className="font-nunito font-bold text-2xl">PayWay</h1>
        </Link>
      </footer>
    </>
  );
};

export default DefaultHome;
