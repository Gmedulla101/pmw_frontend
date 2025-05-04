import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useGlobalUserContext } from '../../context/UserContext';
import { API } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import closeBlack from '../../assets/close-black.png';
import closeWhite from '../../assets/close-white.png';
import useUIUtil from '../../hooks/useUIUtil';

const InvitationModal = ({ closeModal }: { closeModal: any }) => {
  const { isDarkMode } = useUIUtil();
  const { userToken } = useGlobalUserContext();
  const { id: txnId } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const sendInvite = async () => {
    try {
      await axios.post(
        `${API}/txn/transaction-invite/${txnId}`,
        { invitationSent: true, email },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success('Invitation sent!');

      setTimeout(() => {
        navigate(`/`);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="h-[100vh] w-[100vw] fixed top-0 shadow">
      <ToastContainer />
      <article className="relative mx-auto w-[90vw] z-[100] flex justify-center top-35">
        {' '}
        <section className="bg-white shadow pt-2 pb-5 px-4 rounded-lg z-[101]">
          <div className="flex justify-end">
            <img
              src={isDarkMode ? closeWhite : closeBlack}
              alt=""
              onClick={closeModal}
              className="w-10 cursor-pointer rounded-full p-2 hover:bg-gray-200 active:bg-gray-400"
            />
          </div>
          <h1 className="font-semibold text-2xl lg:text-3xl text-center">
            {' '}
            Invite a transaction partner
          </h1>

          <div className="mt-5 flex flex-col items-center justify-center">
            <p>Copy the transaction ID</p>
            <input
              className="w-full border text-center border-gray-400 rounded-lg text-xs py-2 "
              type="text"
              value={txnId}
              readOnly
            />
          </div>

          <h1 className="text-center mt-1 font-bold"> OR </h1>

          <div className="mt-1 flex flex-col items-center justify-center">
            <p>Send an email</p>
            <input
              className="w-full border text-center border-gray-400 rounded-lg text-xs py-2 "
              type="email"
              placeholder="Enter the buyer/seller email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <p className="text-xs mt-2">
            Click the finish button once you've copied the transaction ID or
            entered the email
          </p>

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
