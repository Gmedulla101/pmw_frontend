import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGlobalUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export const API = import.meta.env.VITE_BASE_API_URL;

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { form } = useSelector((store: RootState) => store.auth);
  const reset = useSelector((store: RootState) => store.reset);

  //AUTH LOGIC

  const { setIsSignedIn, setUserData } = useGlobalUserContext();

  // Centralized function to clear auth state
  const clearAuth = () => {
    localStorage.removeItem('pw_token');
    localStorage.removeItem('pw_user');
    setUserData(null);
    setIsSignedIn(false);
  };

  const initialiseAuth = () => {
    const token = localStorage.getItem('pw_token');
    const user = localStorage.getItem('pw_user');

    if (token && user) {
      try {
        setUserData(JSON.parse(user));
        setIsSignedIn(true);
      } catch (error: any) {
        clearAuth();
      }
    }
  };

  const handleRegister = async () => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      form;
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
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

      const data = response.data;
      localStorage.setItem('pw_token', JSON.stringify(data.token));
      localStorage.setItem('pw_user', JSON.stringify(data.user));
      setUserData(data.user);
      setIsSignedIn(true);

      toast.success('User has been registered!');
      setIsLoading(false);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.response);
      if (error.response.data.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = form;
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const response = await axios.post(`${API}/auth/user-login`, {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem('pw_token', JSON.stringify(data.token));
      localStorage.setItem('pw_user', JSON.stringify(data.user));
      setUserData(data.user);
      setIsSignedIn(true);

      toast.success('User logged in!');
      setIsLoading(false);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const logOut = () => {
    setIsLoading(true);
    localStorage.removeItem('pw_token');
    localStorage.removeItem('pw_user');
    setUserData({});
    setIsSignedIn(false);

    toast.success('Successfully signed out ');
    setIsLoading(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const getPasswordResetCode = async () => {
    const { email } = reset;
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      await axios.post(`${API}/auth/confirm-email`, { email });
      toast.success('Email confirmed!');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error.message);
      }
    }
  };

  const resetPassword = async () => {
    const { email, code, password, confirmPassword } = reset;
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      if (!email || !code || !password || !confirmPassword) {
        toast.error('Please fill all fields');
      }

      await axios.post(`${API}/auth/reset-password`, {
        email,
        code,
        password,
      });

      toast.success('Password reset successfully!');
      setIsLoading(false);

      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
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
    logOut,
    initialiseAuth,
    getPasswordResetCode,
    resetPassword,
    isLoading,
  };
};

export default useAuth;
