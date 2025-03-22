import { useEffect, useState } from 'react';
import { useGlobalUserContext } from '../context/UserContext';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

//IMPORTING HELPER COMPONENTS
import LoaderComponent from '../components/LoaderComponent';

const API = import.meta.env.VITE_BASE_API_URL;

interface UserDetails {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePic: string;
  createdAt: string;
}

const Profile = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userToken } = useGlobalUserContext();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API}/user/profile-info`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUserDetails(response.data.user);

        setIsLoading(false);
      } catch (error: any) {
        if (error?.response?.data?.msg) {
          toast.error(error?.response?.data?.msg);
        } else {
          toast.error(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const { logOut } = useAuth();

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <section className="bg-gray-800 h-[30vh] relative">
            <div className="w-36 h-36 bg-white rounded-full relative top-34 mx-auto p-1">
              <div className="w-full h-full border-3 border-gray-800 rounded-full flex justify-center items-center">
                <img src={userDetails?.profilePic} alt="User profile picture" />
              </div>
            </div>
          </section>

          <div>
            <ToastContainer autoClose={2000} />
          </div>

          <section className="mt-28 px-5 md:px-10">
            <div className="flex flex-col gap-5 justify-center">
              <div className="flex justify-between">
                <p className="font-semibold text-lg">Name: </p>
                <p className="font-semibold text-lg">
                  {`${userDetails?.firstName} ${userDetails?.lastName}`}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold text-lg">Username: </p>
                <p className="font-semibold text-lg">
                  {`${userDetails?.username}`}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold text-lg">Email: </p>
                <p className="font-semibold text-lg">
                  {`${userDetails?.email}`}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
      <section className="mt-16 flex justify-center">
        <button
          onClick={logOut}
          className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg w-48 cursor-pointer transition-all hover:bg-gray-600 active:bg-gray-800"
        >
          Log out
        </button>
      </section>
    </>
  );
};

export default Profile;
