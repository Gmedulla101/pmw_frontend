import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SideBar = () => {
  const {isOpen} = useSelector((store: RootState) => {return store.sidebar})
 

  return (
    <div
      className="bg-white h-[100vw] fixed right-0"
      style={{ maxWidth: '300px', width: isOpen ? '300px' : '0px' }}
    >
      SideBar
    </div>
  );
};

export default SideBar;
