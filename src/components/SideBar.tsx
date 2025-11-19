//REACT ROUTER THINGS
import { useNavigate } from 'react-router';
import { RootState, AppDispatch } from '../redux/store';
import { setIsOpen } from '../redux/features/sidebarSlice';

//IMPORTING COMPONENT IMAGE ASSETS
import closeBlack from '../assets/close-black.png';
import closeWhite from '../assets/close-white.png';
import avatar from '../assets/user.png';

//HOOKS
import { useGlobalUserContext } from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import useUIUtil from '../hooks/useUIUtil';

const SideBar = () => {
  const { isDarkMode } = useUIUtil();
  const { isOpen } = useSelector((store: RootState) => {
    return store.sidebar;
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isSignedIn } = useGlobalUserContext();

  return (
    <aside
      id="sidebar"
      className={`${
        isDarkMode ? 'bg-slate-700' : 'bg-white'
      } h-[100vh] fixed right-0 py-2 px-4 transition-all duration-500 rounded-l-2xl`}
      style={{
        maxWidth: '300px',
        width: isOpen ? '300px' : '0',
        opacity: isOpen ? '1' : '0',
      }}
    >
      <div className="flex justify-between items-center">
        {isSignedIn ? (
          <span className="block w-12 h-12 border-3 border-gray-400 rounded-full overflow-hidden">
            <img className="mt-1" src={avatar} />
          </span>
        ) : (
          <div></div>
        )}
        <div
          onClick={() => {
            dispatch(setIsOpen());
          }}
          className={`w-7 p-1 hover:${
            isDarkMode ? 'bg-gray-500' : 'bg-gray-200'
          } rounded-lg cursor-pointer`}
        >
          <img src={isDarkMode ? closeWhite : closeBlack} className="w-full" />
        </div>
      </div>

      {/* MAIN SIDEBAR CONTENT */}
      <div className="mt-10">
        {isSignedIn ? (
          <ul className="flex flex-col gap-4 text-[14px] font-semibold">
            <li
              className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition"
              onClick={() => {
                navigate('/');
                dispatch(setIsOpen());
              }}
            >
              Dashboard
            </li>

            <li
              className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition"
              onClick={() => {
                navigate('/user-profile');
                dispatch(setIsOpen());
              }}
            >
              Profile
            </li>

            <li className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition">
              Transactions
            </li>
            <li className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition">
              Messages
            </li>
            <li className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition">
              Request history
            </li>
            <li className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition">
              Support
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-4 text-[14px] font-semibold">
            <li
              className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition"
              onClick={() => {
                navigate('/sign-up');
                dispatch(setIsOpen());
              }}
            >
              {' '}
              Sign up{' '}
            </li>

            <li
              className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition"
              onClick={() => {
                navigate('/sign-in');
                dispatch(setIsOpen());
              }}
            >
              {' '}
              Sign in{' '}
            </li>

            <li className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition">
              {' '}
              Support{' '}
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
