import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useGlobalUserContext } from '../../context/UserContext';
import { API } from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import close from '../../assets/close.png';

const ProductConfirmedModal = ({ closeModal }: { closeModal: any }) => {
  const { userToken } = useGlobalUserContext();
  const { id: txnId } = useParams();

  const [checked, setChecked] = useState<boolean>(false);

  const confirmDelivery = async () => {
    try {
      if (!checked) {
        toast.error('Confirm that you have read the instructions and warnings');
        return;
      }
      await axios.put(
        `${API}/txn/update-transaction/${txnId}`,
        { productConfirmed: true, status: 'completed' },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success('Delivery confirmed!');

      setTimeout(() => {
        closeModal();
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
              src={close}
              alt=""
              onClick={closeModal}
              className="w-10 cursor-pointer rounded-full p-2 hover:bg-gray-200 active:bg-gray-400"
            />
          </div>
          <h1 className="font-semibold text-2xl lg:text-3xl text-center">
            {' '}
            Confirm good/service delivery
          </h1>

          <div className="mt-5 flex flex-col items-center justify-center text-red-500 font-semibold">
            <p>
              Ensure that you have received the goods/services before clicking
              "finish" to avoid inconsistencies.
            </p>
          </div>

          <div className="mt-1 flex flex-col items-center justify-center text-justify">
            <p>
              {' '}
              Once you click finish, the funds will be released to the seller{' '}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            <p className="text-xs">I have read the instructions and warnings</p>
          </div>

          <div className="flex justify-center mt-5">
            <button
              onClick={confirmDelivery}
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

export default ProductConfirmedModal;
