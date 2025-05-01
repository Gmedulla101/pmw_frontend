import { useGlobalUserContext } from '../context/UserContext';
import TxnPageContent from '../components/txnPage/TxnPageContent';
import SignInModal from '../components/SignInModal';

const TxnPage = () => {
  const { isSignedIn } = useGlobalUserContext();

  return <>{isSignedIn ? <TxnPageContent /> : <SignInModal />}</>;
};

export default TxnPage;
