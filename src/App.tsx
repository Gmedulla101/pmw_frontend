import { Outlet } from 'react-router';
import SideBar from './components/SideBar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App = () => {
  const {isOpen} = useSelector((store: RootState) => store.sidebar)
 return (
   <main id={isOpen ? "main" : ''} className="flex">
     <section className='w-full'>
       <Outlet />
     </section>
     <SideBar />
   </main>
 );
};

export default App;
