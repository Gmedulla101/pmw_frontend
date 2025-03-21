import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGlobalUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_BASE_API_URL;

const useAuth = () => {
  const { form } = useSelector((store: RootState) => store.auth);
  const { firstName, lastName, username, email, password, confirmPassword } =
    form;

  //AUTH LOGIC
  const navigate = useNavigate();
  const { setIsSignedIn, setUserData } = useGlobalUserContext();

  const handleRegister = async () => {
    try {
      //EDGE CASES AND VALIDATION
      if (
        !firstName ||
        !lastName ||
        !email ||
        !username ||
        !password ||
        !confirmPassword
      ) {
        throw new Error('Cannot proceed with incomplete details');
      }
      if (password !== confirmPassword) {
        throw new Error('Password mismatch, re-enter the passwords');
      }
      if (password.length < 8) {
        throw new Error('Entered password is too short');
      }

      //REGISTRATION LOGIC
      const response = await axios.post(`${API}/auth/register-user`, {
        firstName,
        lastName,
        username: username.toLowerCase(),
        email,
        password,
        confirmPassword,
      });

      const data = response.data.data;
      localStorage.setItem('pw_token', JSON.stringify(data.token));
      localStorage.setItem('pw_user', JSON.stringify(data.user));
      setUserData(data.user);
      setIsSignedIn(true);
      navigate('/');
    } catch (error: any) {
      if (error.response.data.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });
      console.log(response);
    } catch (error: any) {
      if (error.response.data.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  return {
    handleLogin,
    handleRegister,
  };
};

export default useAuth;
