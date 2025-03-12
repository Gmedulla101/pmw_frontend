import { Outlet } from 'react-router';
import SideBar from './components/SideBar';

const App = () => {
 return (
   <main className="flex">
     <section className='w-full'>
       <Outlet />
     </section>
     <SideBar />
   </main>
 );
};

export default App;
