import { Link } from 'react-router';

const DefaultHome = () => {
  return (
    <main className="px-10">
      <h1 className="text-center text-3xl font-bold mt-20">
        {' '}
        Welcome to PayWay{' '}
      </h1>
      <p className="mt-5">
        Worried about scams when buying from online vendors? PayWay has you
        covered. It holds your payment safely until you confirm the item is
        delivered as promised — protecting buyers from fraud and proving sellers
        are <strong>trustworthy</strong>.
      </p>
      <p className="text-center font-bold text-[14px] mt-5">
        PayWay: Buy with confidence, sell with credibility
      </p>

      <section className="mt-7 flex justify-center items-center gap-5">
        <Link to={'/sign-up'}>
          <button className="button bg-black text-white font-semibold py-2 px-6 rounded-lg cursor-pointer">
            <p>Sign up</p>
          </button>
        </Link>
        <Link to={'/sign-in'}>
          <button className="button bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer">
            <p>Sign In</p>
          </button>
        </Link>
      </section>
    </main>
  );
};

export default DefaultHome;
