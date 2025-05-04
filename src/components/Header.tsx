import { Link } from 'react-router';

import menuBlack from '../assets/menu-black.png';
import menuWhite from '../assets/menu-white.png';
import { setIsOpen } from '../redux/features/sidebarSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import useUIUtil from '../hooks/useUIUtil';

const Header = () => {
  const { isDarkMode } = useUIUtil();

  const dispatch = useDispatch<AppDispatch>();
  return (
    <header className="py-3 px-6 rounded-sm shadow-sm flex justify-between items-center">
      <Link to={'/'}>
        <h1 className="font-nunito font-bold text-2xl">PayWay</h1>
      </Link>

      <div
        onClick={() => {
          dispatch(setIsOpen());
        }}
        className={`w-9 cursor-pointer hover:${
          isDarkMode ? 'bg-gray-500' : 'bg-gray-200'
        } p-1 rounded-lg`}
      >
        <img
          className="w-full"
          src={isDarkMode ? menuWhite : menuBlack}
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
