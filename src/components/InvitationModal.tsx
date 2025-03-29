import { useParams } from 'react-router';
import axios from 'axios';
import { useGlobalUserContext } from '../context/UserContext';
import { API } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const InvitationModal = () => {
  const { userToken } = useGlobalUserContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const sendInvite = async () => {
    try {
      await axios.put(
        `${API}/txn/update-transaction/${id}`,
        { invitationSent: true },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="h-[100vh] w-[100vw] fixed top-0 shadow">
      <article className="relative z-[100] flex justify-center top-50">
        {' '}
        <section className="bg-white shadow p-4 rounded-lg z-[101]">
          <h1 className="font-semibold text-2xl lg:text-3xl text-center">
            {' '}
            Invite a transaction partner
          </h1>

          <div className="mt-5 flex flex-col items-center justify-center">
            <p>Copy the transaction ID</p>
            <input
              className="w-full border text-center border-gray-400 rounded-lg text-xs py-2 "
              type="text"
              value={id}
              readOnly
            />
          </div>

          {/*   <h1 className="text-center mt-5"> OR </h1>

          <div className="mt-5 flex flex-col items-center justify-center">
            <p>Search for user</p>
            <input
              className="w-full border text-center border-gray-400 rounded-lg text-xs py-2 "
              type="text"
              value={id}
            />
          </div> */}

          <div className="flex justify-center mt-5">
            <button
              onClick={sendInvite}
              className="p-2 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
            >
              Finish
            </button>
          </div>
        </section>
      </article>

      {/* DIV FOR OPACITY */}
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-white opacity-70 z-[90]"></div>
    </aside>
  );
};

export default InvitationModal;
