import useAuth from '../hooks/useAuth';
import { ToastContainer } from 'react-toastify';

const Profile = () => {
  const { logOut } = useAuth();

  return (
    <>
      <section className="bg-gray-800 h-[40vh] relative">
        <div className="w-36 h-36 bg-white rounded-full relative top-54 mx-auto p-1">
          <div className="w-full h-full border-3 border-gray-800 rounded-full flex justify-center items-center">
            User image
          </div>
        </div>
      </section>

      <div>
        <ToastContainer autoClose={2000} />
      </div>

      <section className="mt-28 px-5 md:px-10">
        <div className="flex flex-col gap-5 justify-center">
          <p className="font-semibold text-lg"> Name: </p>
          <p className="font-semibold text-lg"> Username: </p>
          <p className="font-semibold text-lg"> Email: </p>
        </div>
      </section>

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
