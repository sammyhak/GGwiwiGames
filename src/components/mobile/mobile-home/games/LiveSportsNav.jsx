import { FaStar, FaSearch } from "react-icons/fa";
import toast,{Toaster} from "react-hot-toast"
const LiveSportsNav = () => {
  const handlealert=()=>{
    toast.error("Please,Connect game api!")
  }
  return (
    <div className="grid grid-cols-5 bg-gray-200 p-2  space-x-2">
      <Toaster/>
      <div className="flex justify-center items-center px-4 py-2 bg-white rounded-[4px]  relative">
        <span className="text-black text-[14px] font-[600]"onClick={handlealert}>LIVE</span>
        <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
      </div>
      <div onClick={handlealert} className="px-4 py-2 bg-white flex justify-center items-center rounded-[4px] shadow-sm text-black text-[14px]  font-[600]">
        SPORTS
      </div>
      <div onClick={handlealert} className="px-4 py-2 bg-white flex justify-center items-center rounded-[4px] shadow-sm text-black text-[14px]  font-[600]">
        IPL
      </div>
      <div className="px-4 py-2 bg-white flex justify-center  rounded-[4px] shadow-sm text-black text-[14px]  font-[600] items-center">
        <FaStar className="text-yellow-500" />
      </div>
      <div  className="px-4 py-2 bg-white flex justify-center  rounded-[4px] shadow-sm text-black text-[14px]  font-[600]  items-center">
        <FaSearch className="text-gray-500" />
      </div>
    </div>
  );
};

export default LiveSportsNav;
