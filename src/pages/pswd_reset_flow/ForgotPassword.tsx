//ALL THINGS REDUX
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { handleChange } from '../../redux/features/resetSlice';

//OTHER DEPS AND HOOKS
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { API } from '../../hooks/useAuth';

const ForgotPassword = () => {
  const { email } = useSelector((store: RootState) => store.reset);

  console.log(email);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const proceedToCodeConfirmation = async () => {
    try {
      await axios.post(`${API}/auth/confirm-email`, { email });
      toast.success('Email confirmed!');
      setTimeout(() => {
        navigate('/code-confirmation');
      }, 2000);
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

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
                onClick={proceedToCodeConfirmation}
                className="button bg-black text-white font-semibold py-2 px-6 rounded-lg cursor-pointer mt-3 w-56"
              >
                <p> Proceed </p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgotPassword;
