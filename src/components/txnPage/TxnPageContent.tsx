//IMPOORTING REQUIRED DEPS
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';

//IMPORTING HOOKS
import useTxns from '../../hooks/useTxns';
import { createPortal } from 'react-dom';

//TYPES, ASSETS, COMPONENTS AND MODALS
import InvitationModal from '../modals/InvitationModal';
import DeliveryModal from '../modals/DeliveryModal';
import ProductConfirmedModal from '../modals/ProductConfirmedModal';
import LoaderComponent from '../LoaderComponent';
import greenBtn from '../../assets/greenButton.png';
import yellowBtn from '../../assets/yellowButton.png';
import redBtn from '../../assets/redButton.png';
//BUTTONS
import {
  InviteTransactionPartner,
  JoinTransaction,
  MakePayment,
  DeliverGoods,
  CancelTransaction,
  ConfirmDelivery,
  RequestPayment,
} from '../txnPageButtons/TxnButtons';

export type TxnDetails = {
  buyerId: string | null;
  cashConfirmed: boolean;
  id: string;
  productConfirmed: boolean;
  productDelivered: boolean;
  sellerId: string | null;
  status: 'pending' | 'completed' | 'cancelled';
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

const TxnPageContent = () => {
  const { txnDetails, fetchTxnDetails, verifyPayment } = useTxns();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentRef = queryParams.get('trxref');

  const { id: txnId } = useParams();
  const [isInvitationModal, setIsInvitationModal] = useState<boolean>(false);
  const [isDeliveryModal, setIsDeliveryModal] = useState<boolean>(false);
  const [isProductConfirmedModal, setIsProductConfirmedModal] =
    useState<boolean>(false);

  useEffect(() => {
    fetchTxnDetails(txnId);
    if (paymentRef) {
      verifyPayment(paymentRef);
    }
  }, [location.key]);

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
              {txnDetails.status === 'completed' ? (
                <img className="w-4" src={greenBtn} />
              ) : (
                ''
              )}
              {txnDetails.status === 'cancelled' ? (
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
              <p> Product delivery:</p>
              <p> {txnDetails.productDelivered ? 'Delivered' : 'Pending'}</p>
            </div>

            <div className="mt-5 flex justify-between">
              <p> Product confirmation:</p>
              <p>
                {' '}
                {txnDetails.productConfirmed ? 'Confirmed by buyer' : 'Pending'}
              </p>
            </div>

            <div className="mt-5 flex justify-between">
              <p> Escrow fee:</p>
              <p>#{(txnDetails.txnItemValue * 0.02).toLocaleString()}</p>
            </div>

            <div className="mt-5 flex justify-between">
              <p> Total:</p>
              <p>
                #
                {(
                  txnDetails.txnItemValue * 0.02 +
                  txnDetails.txnItemValue
                ).toLocaleString()}
              </p>
            </div>
          </section>

          {/* SECTION FOR USER ACTIONS, MULTIPLE BUTTONS WHICH SHOW BASED ON VARYING CONDITION */}
          <section className="mb-12">
            {/* PARAGRAPHS */}
            {txnDetails.productDelivered ? (
              <p className="mt-5">
                {' '}
                The product has been delivered!{' '}
              </p>
            ) : (
              <p className="mt-5 italic"> Waiting on product delivery </p>
            )}

            {txnDetails.productConfirmed ? (
              <p className="mt-5">
                {' '}
                The product has been confirmed, seller can now request payment
              </p>
            ) : (
              ''
            )}

            {/* BUTTONS */}
            {/* Invite a partner conditional */}
            <InviteTransactionPartner
              txnDetails={txnDetails}
              setIsInvitationModal={setIsInvitationModal}
            />

            {/* Join transaction conditional */}
            <JoinTransaction txnDetails={txnDetails} />

            {/* Payment conditional */}
            <MakePayment txnDetails={txnDetails} />

            {/* Deliver product conditional */}
            <DeliverGoods
              txnDetails={txnDetails}
              setIsDeliveryModal={setIsDeliveryModal}
            />

            {/* Confirm product delivery */}
            <ConfirmDelivery
              txnDetails={txnDetails}
              setIsProductConfirmedModal={setIsProductConfirmedModal}
            />

            {/* Cancel transaction conditional */}
            <CancelTransaction txnDetails={txnDetails} />

            {/* Request payment */}
            <RequestPayment txnDetails={txnDetails} />

            {/* Condtional to show cancelled transactions */}
            {txnDetails.status === 'cancelled' ? (
              <h2 className="font-bold text-center text-xl mt-5">
                {' '}
                This transaction has been cancelled{' '}
              </h2>
            ) : (
              ''
            )}
          </section>

          {/* INVITATION MODAL  */}
          {isInvitationModal
            ? createPortal(
                <InvitationModal
                  closeModal={() => {
                    setIsInvitationModal(false);
                  }}
                />,
                document.body
              )
            : null}

          {/* DELIVERY MODAL */}
          {isDeliveryModal
            ? createPortal(
                <DeliveryModal
                  closeModal={() => {
                    setIsDeliveryModal(false);
                  }}
                />,
                document.body
              )
            : null}

          {/* PRODUCT CONFIRMATION MODAL */}
          {isProductConfirmedModal
            ? createPortal(
                <ProductConfirmedModal
                  closeModal={() => {
                    setIsProductConfirmedModal(false);
                  }}
                />,
                document.body
              )
            : null}
        </article>
      )}
    </div>
  );
};

export default TxnPageContent;
