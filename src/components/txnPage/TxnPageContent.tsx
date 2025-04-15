//IMPOORTING REQUIRED DEPS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';

//IMPORTING HOOKS
import { useGlobalUserContext } from '../../context/UserContext';
import { createPortal } from 'react-dom';

//TYPES, ASSETS, COMPONENTS AND MODALS
import InvitationModal from '../InvitationModal';
import LoaderComponent from '../LoaderComponent';
import greenBtn from '../../assets/greenButton.png';
import yellowBtn from '../../assets/yellowButton.png';
import redBtn from '../../assets/redButton.png';

export type TxnDetails = {
  buyerId: string | null;
  cashConfirmed: boolean;
  id: string;
  productConfirmed: boolean;
  sellerId: string | null;
  status: 'pending' | 'confirmed' | 'canceled';
  txnItem: string;
  txnItemCategoryId: string;
  txnItemDescription: string;
  txnItemValue: number;
  seller: any;
  buyer: any;
  category: any;
  invitationSent: boolean;
  initiatorId: string;
};

import useTxns from '../../hooks/useTxns';

const TxnPageContent = () => {
  const { id: txnId } = useParams();
  const { userData } = useGlobalUserContext();
  const { txnDetails, fetchTxnDetails } = useTxns();
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    fetchTxnDetails(txnId);
  }, []);

  return (
    <div>
      <ToastContainer />
      {!txnDetails ? (
        <LoaderComponent />
      ) : (
        <article className="px-5 md:px-10 lg:px-36 mt-5">
          <section className="border border-gray-200 p-4 rounded-lg">
            <p>
              <strong>
                {txnDetails?.buyer?.firstName
                  ? txnDetails?.buyer?.firstName
                  : 'A yet to be determined buyer'}
              </strong>{' '}
              is buying a <strong>{txnDetails.category.categoryName}</strong>,
              <strong> {txnDetails.txnItem}</strong>, from{' '}
              <strong>
                {txnDetails?.seller?.firstName
                  ? txnDetails?.seller?.firstName
                  : 'a yet to be determined seller'}
              </strong>
            </p>

            <p className="mt-5 flex items-center gap-1">
              {txnDetails.status === 'pending' ? (
                <img className="w-4" src={yellowBtn} />
              ) : (
                ''
              )}
              {txnDetails.status === 'confirmed' ? (
                <img className="w-4" src={greenBtn} />
              ) : (
                ''
              )}
              {txnDetails.status === 'canceled' ? (
                <img className="w-4" src={redBtn} />
              ) : (
                ''
              )}
              {txnDetails.status}
            </p>

            <p className="font-semibold text-gray-400 text-xs mt-5">
              Transaction ID: {txnDetails.id}
            </p>
          </section>

          <section className="border border-gray-200 p-4 rounded-lg mt-5">
            <h1 className="font-bold text-2xl mb-2"> Item/Service details </h1>
            <div className="flex justify-between">
              <p>{txnDetails.txnItem}</p>
              <p> #{txnDetails.txnItemValue.toLocaleString()} </p>
            </div>

            <div className="mt-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: txnDetails.txnItemDescription.replace(/\n/g, '<br>'),
                }}
              ></p>
            </div>

            <div className="mt-5 flex justify-between">
              <p> Cash:</p>
              <p>
                {' '}
                {txnDetails.cashConfirmed ? 'Deposited' : 'Not deposited'}{' '}
              </p>
            </div>

            <div className="mt-5 flex justify-between">
              <p> Product:</p>
              <p>
                {' '}
                {txnDetails.productConfirmed
                  ? 'Delivered'
                  : 'Not delivered'}{' '}
              </p>
            </div>

            <div className="mt-5 flex justify-between">
              <p> Escrow fee:</p>
              <p>#{(txnDetails.txnItemValue * 0.02).toLocaleString()}</p>
            </div>
          </section>

          <section className="mb-12">
            {!txnDetails.invitationSent ? (
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => {
                    setIsModal(true);
                  }}
                  className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
                >
                  Invite transaction partner
                </button>
              </div>
            ) : (
              ''
            )}

            {txnDetails.initiatorId === userData.userId ? (
              <div className="flex justify-center mt-5">
                <button className="px-2 py-4 transition bg-red-500 text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72">
                  Cancel transaction
                </button>
              </div>
            ) : (
              ''
            )}

            {txnDetails.seller?.username !== userData.username &&
            txnDetails.buyer?.username !== userData.username ? (
              <div className="flex justify-center mt-5">
                <button className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72">
                  Join Transaction
                </button>
              </div>
            ) : (
              ''
            )}
          </section>

          {isModal ? createPortal(<InvitationModal />, document.body) : null}
        </article>
      )}
    </div>
  );
};

export default TxnPageContent;
