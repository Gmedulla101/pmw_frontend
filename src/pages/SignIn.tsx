//IMPORTING HOOKS
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { handleForm } from '../redux/features/authSlice';
import useAuth from '../hooks/useAuth';
import { ToastContainer } from 'react-toastify';

//IMPORTING HELPER COMPONENTS
import { Link } from 'react-router';
import Input from '../components/input';

const SignIn = () => {
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

  const { handleLogin, isLoading } = useAuth();

  return (
    <main>
      <h1 className="mt-12 text-center">
        {' '}
        Sign in to your <strong>PayWay</strong> account{' '}
      </h1>

      <div>
        <ToastContainer autoClose={2000} />
      </div>

      <section className="flex flex-col gap-3.5 py-6 rounded-t-3xl mx-auto px-5 md:px-10 md:w-[80%] lg:w-[50%]">
        <Input
          type="email"
          name="email"
          placeHolder="Enter your email"
          value={form.email}
          onChange={handleFormChange}
        />

        <Input
          type="password"
          name="password"
          placeHolder="Enter your password"
          value={form.password}
          onChange={handleFormChange}
        />

        <button
          onClick={handleLogin}
          id="signup"
          className="button bg-black text-white font-semibold py-2 px-6 rounded-lg cursor-pointer mt-8"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <p>Log in</p>
          )}
        </button>
        <div>
          <p className="text-xs font-semibold">
            {' '}
            Forgot password?{' '}
            <Link to={'/forgot-password'}>
              {' '}
              <span className="bg-black text-white rounded-lg px-2 inline-block transition hover:scale-105 cursor-pointer">
                Click here
              </span>
            </Link>{' '}
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
