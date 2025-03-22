//REACT ROUTER THINGS
import { Link } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setIsOpen } from '../redux/features/sidebarSlice';
import close from '../assets/close.png';
import avatar from '../assets/user.png';

//USING DATA FROM THE USER CONTEXT
import { useGlobalUserContext } from '../context/UserContext';

const SideBar = () => {
  const { isOpen } = useSelector((store: RootState) => {
    return store.sidebar;
  });

  const dispatch = useDispatch<AppDispatch>();

  const { isSignedIn } = useGlobalUserContext();

  return (
    <aside
      id="sidebar"
      className="bg-white h-[100vh] fixed right-0 py-2 px-4 transition-all duration-500 rounded-l-2xl"
      style={{
        maxWidth: '300px',
        width: isOpen ? '300px' : '0',
        opacity: isOpen ? '1' : '0',
      }}
    >
      <div className="flex justify-between items-center">
        <span className="block w-12 h-12 border-3 border-gray-400 rounded-full overflow-hidden">
          <img className="mt-1" src={avatar} />
        </span>
        <div
          onClick={() => {
            dispatch(setIsOpen());
          }}
          className="w-8 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <img src={close} className="w-full" />
        </div>
      </div>

      {/* MAIN SIDEBAR CONTENT */}
      <div className="mt-10">
        {isSignedIn ? (
          <ul className="flex flex-col gap-4 text-[14px] font-semibold">
            <Link to={'/user-profile'}>
              <li> Profile </li>
            </Link>
            <li> Transactions </li>
            <li> Messages </li>
            <li> Request history </li>
            <li> Support </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-4 text-[14px] font-semibold">
            <li> Sign up </li>
            <li> Sign in </li>
            <li> Support </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
