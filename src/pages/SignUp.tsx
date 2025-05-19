import { Link } from 'react-router';

//REDUX TOLLKIT THINGS
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { handleForm } from '../redux/features/authSlice';

//IMPORKING AUTH HOOK
import useAuth from '../hooks/useAuth';

//GETTING TOASTY
import { ToastContainer } from 'react-toastify';

const SignUp = () => {
  const { form } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleFormChange = (e: any) => {
    dispatch(
      handleForm({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const { handleRegister, isLoading } = useAuth();

  return (
    <main className="px-5 md:px-10">
      <h1 className="mt-12 text-center">
        Create a new <strong>PayWay</strong> account to enjoy worry free
        purchases and sales.
      </h1>

      <div>
        <ToastContainer autoClose={2000} />
      </div>

      <section className="flex flex-col gap-3.5 py-6 rounded-t-3xl px-5 md:px-10">
        <input
          type="text"
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="firstName"
          placeholder="Enter your first name"
          value={form.firstName}
          onChange={handleFormChange}
        />

        <input
          type="text"
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="lastName"
          placeholder="Enter your last name"
          value={form.lastName}
          onChange={handleFormChange}
        />

        <input
          type="text"
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleFormChange}
        />

        <input
          type="email"
          required={true}
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleFormChange}
        />

        <input
          type="password"
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleFormChange}
        />

        <input
          type="password"
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={handleFormChange}
        />

        <p className="text-xs text-red-600">
          Please note that passwords are case sentitive
        </p>

        <div>
          <p className="text-xs font-semibold">
            {' '}
            Already have an account?{' '}
            <Link to={'/sign-in'}>
              {' '}
              <span className="bg-black text-white rounded-lg px-2 inline-block transition hover:scale-105 cursor-pointer">
                Click here
              </span>
            </Link>{' '}
          </p>
        </div>

        <button
          onClick={handleRegister}
          id="signup"
          className="button bg-black text-white font-semibold py-2 px-6 rounded-lg cursor-pointer mt-10"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <p>Sign up</p>
          )}
        </button>
      </section>
    </main>
  );
};

export default SignUp;
