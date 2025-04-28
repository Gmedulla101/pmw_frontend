import { TxnDetails } from '../txnPage/TxnPageContent';
import { useGlobalUserContext } from '../../context/UserContext';
import useTxns from '../../hooks/useTxns';

export const InviteTransactionPartner = ({
  txnDetails,
  setIsInvitationModal,
}: {
  txnDetails: TxnDetails;
  setIsInvitationModal: Function;
}) => {
  const { userData } = useGlobalUserContext();
  return (
    <div>
      {!txnDetails.invitationSent &&
      txnDetails.initiatorId === userData.userId ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              setIsInvitationModal(true);
            }}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Invite transaction partner
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const JoinTransaction = ({ txnDetails }: { txnDetails: TxnDetails }) => {
  const { userData } = useGlobalUserContext();
  const { joinTransaction } = useTxns();

  return (
    <div>
      {txnDetails.seller?.username !== userData.username &&
      txnDetails.buyer?.username !== userData.username ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={joinTransaction}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Join Transaction
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const MakePayment = ({ txnDetails }: { txnDetails: TxnDetails }) => {
  const { userData } = useGlobalUserContext();
  const { makePayment } = useTxns();

  return (
    <div>
      {!txnDetails.cashConfirmed &&
      txnDetails.buyer?.username === userData.username &&
      txnDetails.invitationSent ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              makePayment(txnDetails.id);
            }}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Make payment
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const DeliverGoods = ({
  txnDetails,
  setIsDeliveryModal,
}: {
  txnDetails: TxnDetails;
  setIsDeliveryModal: Function;
}) => {
  const { userData } = useGlobalUserContext();
  return (
    <div>
      {txnDetails.seller?.username === userData?.username &&
      txnDetails.cashConfirmed &&
      !txnDetails.productDelivered ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              setIsDeliveryModal(true);
            }}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Deliver goods/service
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const ConfirmDelivery = ({
  txnDetails,
  setIsProductConfirmedModal,
}: {
  txnDetails: TxnDetails;
  setIsProductConfirmedModal: Function;
}) => {
  const { userData } = useGlobalUserContext();

  return (
    <div>
      {txnDetails.buyer?.username === userData?.username &&
      !txnDetails.productConfirmed &&
      txnDetails.productDelivered ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              setIsProductConfirmedModal(true);
            }}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Confirm product delivery
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const RequestPayment = ({ txnDetails }: { txnDetails: TxnDetails }) => {
  const { userData } = useGlobalUserContext();
  const { requestPayment } = useTxns();
  return (
    <div>
      {txnDetails.seller?.username === userData?.username &&
      txnDetails.productConfirmed ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={requestPayment}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Request payment
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const CancelTransaction = ({
  txnDetails,
}: {
  txnDetails: TxnDetails;
}) => {
  const { userData } = useGlobalUserContext();
  const { cancelTxn } = useTxns();

  return (
    <div>
      {txnDetails.initiatorId === userData.userId &&
      txnDetails.status !== 'cancelled' ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              cancelTxn(txnDetails.id);
            }}
            className="px-2 py-4 transition bg-red-500 text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-72"
          >
            Cancel transaction
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
