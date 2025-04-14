//ALL THINGS REDUX
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import resetReducer, { handleChange } from '../../redux/features/resetSlice';

//OTHER DEPS AND HOOKS
import { ToastContainer } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const ForgotPassword = () => {
  const { email, code, password, confirmPassword, isLoading } = useSelector(
    (store: RootState) => store.reset
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: any) => {
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const { getPasswordResetCode, resetPassword } = useAuth();

  return (
    <>
      <ToastContainer />
      <main className="mt-12 px-5 md:px-10">
        <h1 className="text-center font-bold text-2xl md:text-3xl">
          {' '}
          Reset your password{' '}
        </h1>

        <section>
          <div>
            <p> Confirm your email </p>
            <p className="text-xs mb-3">
              If your email exists, we'll send you a confirmation code to reset
              your email
            </p>

            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="your_email@example.com"
                  className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 w-full focus:border-gray-700"
                />
                <button
                  onClick={
                    isLoading
                      ? () => {
                          return;
                        }
                      : () => {
                          getPasswordResetCode();
                        }
                  }
                  className="button bg-black text-white font-semibold py-2 px-2 rounded-lg cursor-pointer w-36"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-lg"></span>
                  ) : (
                    <p> Get code </p>
                  )}
                </button>
              </div>

              <div>
                <input
                  type="number"
                  name="code"
                  value={code}
                  onChange={handleInputChange}
                  placeholder="Enter confirmation code"
                  className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 w-full focus:border-gray-700 text-center"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Enter your new password"
                  className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 w-full focus:border-gray-700"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your new password"
                  className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 w-full focus:border-gray-700"
                />
              </div>
            </section>

            <div className="flex justify-center">
              <button
                onClick={
                  isLoading
                    ? () => {
                        return;
                      }
                    : () => {
                        resetPassword();
                      }
                }
                className="button bg-black text-white font-semibold py-2 px-6 rounded-lg cursor-pointer mt-3 w-56"
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  <p> Proceed </p>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgotPassword;
