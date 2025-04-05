import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { handleChange } from '../../redux/features/resetSlice';

const ForgotPassword = () => {
  const { email } = useSelector((store: RootState) => store.reset);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: any) => {
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <>
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
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="your_email@example.com"
              className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 w-full focus:border-gray-700"
            />

            <div className="flex justify-center">
              <button
                id="signup"
                className="bg-black text-white font-semibold py-2 px-6 rounded-lg cursor-pointer mt-3 w-56"
              >
                <p>Log in</p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgotPassword;
