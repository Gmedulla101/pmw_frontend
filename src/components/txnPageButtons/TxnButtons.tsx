import { TxnDetails } from '../txnPage/TxnPageContent';
import { useGlobalUserContext } from '../../context/UserContext';
import useTxns from '../../hooks/useTxns';
import useReqPay from '../../hooks/useReqPay';

export const InviteTransactionPartner = ({
  txnDetails,
  setIsInvitationModal,
  isLoading,
}: {
  txnDetails: TxnDetails;
  setIsInvitationModal: Function;
  isLoading: boolean;
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
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              ' Invite transaction partner'
            )}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const JoinTransaction = ({
  txnDetails,
  isLoading,
}: {
  txnDetails: TxnDetails;
  isLoading: boolean;
}) => {
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
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              ' Join Transaction'
            )}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const MakePayment = ({
  txnDetails,
  isLoading,
}: {
  txnDetails: TxnDetails;
  isLoading: boolean;
}) => {
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
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              'Make payment'
            )}
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
  isLoading,
}: {
  txnDetails: TxnDetails;
  setIsDeliveryModal: Function;
  isLoading: boolean;
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
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              ' Deliver goods/service'
            )}
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
  isLoading,
}: {
  txnDetails: TxnDetails;
  setIsProductConfirmedModal: Function;
  isLoading: boolean;
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
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              'Confirm product delivery'
            )}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const RequestPaymentBtn = ({
  txnDetails,
}: {
  txnDetails: TxnDetails | undefined;
}) => {
  const { userData } = useGlobalUserContext();
  const { requestPayment } = useTxns();
  return (
    <div>
      {txnDetails?.seller?.username === userData?.username &&
      txnDetails?.productConfirmed ? (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              requestPayment(txnDetails.id);
            }}
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

export const PaymentProcessing = ({
  txnDetails,
  accountNumber,
  isLoading,
}: {
  txnDetails: TxnDetails | undefined;
  accountNumber: string;
  isLoading: boolean;
}) => {
  const { userData } = useGlobalUserContext();
  const { collectPayment } = useReqPay();
  return (
    <div>
      {txnDetails?.seller?.username === userData?.username &&
      txnDetails?.productConfirmed ? (
        <div className="flex justify-center mt-1">
          <button
            onClick={() => {
              collectPayment(txnDetails.id, accountNumber);
            }}
            className="px-2 py-4 transition bg-black text-white font-semibold rounded-lg hover:scale-105 cursor-pointer w-[80%]"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              'Process payment'
            )}
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
  isLoading,
}: {
  txnDetails: TxnDetails;
  isLoading: boolean;
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
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              'Cancel transaction'
            )}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
