import { useGlobalUserContext } from '../context/UserContext';

import SignedInHome from '../components/Home/SignedInHome';
import DefaultHome from '../components/Home/DefaultHome';

const Home = () => {
  const { isSignedIn } = useGlobalUserContext();
  return <>{isSignedIn ? <SignedInHome /> : <DefaultHome />}</>;
};

export default Home;
