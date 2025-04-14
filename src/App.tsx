import { Outlet } from 'react-router';
import SideBar from './components/SideBar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Header from './components/Header';

///
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';

const App = () => {
  const { isOpen } = useSelector((store: RootState) => store.sidebar);
  const { initialiseAuth } = useAuth();
  useEffect(() => {
    initialiseAuth();
  }, []);

  return (
    <>
      <main id={isOpen ? 'main' : ''} className="flex">
        <section className="w-full">
          <Header />
          <Outlet />
        </section>
        <SideBar />
      </main>
    </>
  );
};

export default App;
