import menu from '../assets/menu.png';
import { setIsOpen } from '../redux/features/sidebarSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header className="py-3 px-2 rounded-sm shadow-sm flex justify-between items-center">
      <h1 className="font-merienda font-bold text-2xl">PayWay</h1>

      <div
        onClick={() => {
          dispatch(setIsOpen());
        }}
        className="w-8 cursor-pointer"
      >
        <img className="w-full" src={menu} alt="" />
      </div>
    </header>
  );
};

export default Header;
