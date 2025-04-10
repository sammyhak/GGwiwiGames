import React,{useState,useRef,useEffect} from 'react'
import RegistrationBox from './RegistrationBox'
import BetSlip from './BetSlip'
import AppBanner from './AppBanner'
import { IoChevronBackOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import RegistrationPopup from '../modal/RegistrationPopup';
const Rightside = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user"));

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
      }
    }

    if (!isCollapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCollapsed]);

  return (
    <></>
  //  <section className='p-2 w-[20%] h-[90vh] overflow-y-scroll custom-scrollbar xl:flex hidden'>
  //   {
  //     user_info ?  <>
  //           <BetSlip/>

  //     <AppBanner/>
  //     </>:<>
  //           <RegistrationBox/>
  //           <BetSlip/>
  //           <AppBanner/>
  //     </>
  //   }

  //  </section>
//   <div
//   className={` h-screen bg-black flex flex-col  items-center transition-all ${
//     isCollapsed ? "" : "px-[5px]"
//   }`}
// >
//    <button
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className=" px-2 py-2  bg-gray-900 text-white hover:bg-gray-700 transition"
//       >
//         <IoChevronBackOutline size={20} />
//       </button>

//       {!isCollapsed && (
//         <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-50 z-[99999]" />
//       )}


//       <section
//         ref={sidebarRef}
//         className={`fixed top-0 right-0 z-[100000] h-full w-72 bg-white shadow-lg p-4 transition-transform duration-300 ${
//           isCollapsed ? "translate-x-full" : "translate-x-0"
//         }`}
//       >

//         <button
//           onClick={() => setIsCollapsed(true)}
//           className="absolute top-4 right-4 text-gray-600 hover:text-black"
//         >
//           <IoClose size={24} />
//         </button>

//         <RegistrationBox />
//         <BetSlip />
//         <AppBanner />
//       </section>

//   <button
//        onClick={() => setIsOpen(true)}
//   className="bg-sky-500 text-black font-bold text-xs py-2 px-3 mt-4 rotate-180 origin-center"
//     style={{ writingMode: "vertical-lr" }}
//   >
//     REGISTRATION
//   </button>

//   <button
//     className="bg-gray-200 text-black font-bold text-xs py-2 px-3 mt-4 rotate-180 origin-center"
//     style={{ writingMode: "vertical-lr" }}
//   >
//     BET SLIP
//   </button>
//   <RegistrationPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />

//   <button className="bg-gray-800 text-white p-3 mt-4">
//     <FaMobileAlt size={18} />
//   </button>

// </div>
  )
}

export default Rightside
