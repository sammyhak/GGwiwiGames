import { useState,useEffect } from "react";
import { FaUser, FaEnvelope, FaTimes, FaHistory, FaDownload, FaUpload, FaExchangeAlt, FaLock, FaUsers, FaSignOutAlt, FaGift, FaCog } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import TopBarMenu from "../../../home/topBarMenu/TopBarMenu";
import BottomNav from "../games/BottomNav";
import {  FaTag, FaMoneyBillWave, FaDice } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import toast,{Toaster} from "react-hot-toast"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const user_info = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();
  const [user_details,set_userdetails]=useState([])
  const fetchUserData = async () => {
    try {
      console.log("hello")
       await axios.get(`https://ggwiwigamesbe.onrender.com/user/user-info/${user_info._id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res)=>{
        set_userdetails(res.data);
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data || error.message);
    }
  };
  useEffect(()=>{
    fetchUserData();
  },[])
    // logout funtion 
    const logoutfunction  = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          toast.success("Logout Successfully!");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/");
        }
      });
    };
  return (
   <section>
    <TopBarMenu/>
    <BottomNav/>
    <Toaster/>
    <div className="w-full px-[10px] py-[10px] pb-[50px] min-h-[80vh] bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white  p-3 mb-[15px] rounded-[5px] ">
      <div className="flex items-center justify-between h-full w-full">
      <div className="flex items-center space-x-3 mb-[15px]">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <FaUser className="text-gray-900" />
        </div>
        <div>
          <p className="text-xs text-gray-500">№1176240369</p>
          <p className="text-lg font-bold">{user_details?.balance} BDT</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <FaEnvelope className="text-gray-600 text-[22px] cursor-pointer" />
        <IoCloseSharp className="text-gray-600 text-[22px] cursor-pointer" />
      </div>
      </div>

       {/* Buttons */}
       <div className="flex gap-[10px]">
        <button className="w-1/2 py-2 text-[14px] text-white bg-[#2E2E2E] rounded-[5px] font-medium">My bets</button>
       <NavLink to="/deposit"className="w-1/2 py-2 text-[14px] text-center text-white bg-[#FFB805]  rounded-[5px] font-medium">
       Deposit
       </NavLink>
      </div>

    </div>

     
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {['Profile', 'Promo', 'Settings'].map((tab) => (
          <button key={tab} className={`flex-1 py-3 text-sm cursor-pointer font-medium ${activeTab === tab ? 'border-b-3 border-yellow-500 text-gray-800' : 'text-gray-500'}`} onClick={() => setActiveTab(tab)}>
            {tab === "Profile" && <FaUser className="inline mr-1 text-lg" />} 
            {tab === "Promo" && <FaGift className="inline mr-1 text-lg" />} 
            {tab === "Settings" && <FaCog className="inline mr-1 text-lg" />} 
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        {activeTab === "Profile" && (
          <>
            {/* Account Section */}
            <p className="text-gray-500 text-[14px]  font-semibold mb-3">ACCOUNT</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700"><FaHistory className="text-lg" /> Bet history</div>
              <NavLink to="/deposit" className="mt-[10px]">
              <div className="flex items-center gap-3 text-gray-700"><FaDownload className="text-lg" /> Make a deposit</div>
              </NavLink>
              <NavLink to="/deposit">
              <div className="flex items-center gap-3 mt-[12px] text-gray-700"><FaUpload className="text-lg" /> Withdraw funds</div>
              </NavLink>
             
              <NavLink to="/profile/transaction-history">
              <div className="flex items-center gap-3 mt-[12px] text-gray-700"><FaExchangeAlt className="text-lg" /> Transaction history</div>
              </NavLink>
            </div>

            {/* Profile Section */}
            <p className="text-gray-500 text-xs font-semibold mt-5 mb-2">PROFILE</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3  text-gray-700"><FaUser className="text-lg" /> Personal profile <span className="text-red-500 text-xs">●</span></div>
              <div className="flex items-center gap-3  text-gray-700"><MdSecurity className="text-lg" /> Security <span className="text-red-500 text-xs">●</span></div>
            </div>

            {/* Other Section */}
            <p className="text-gray-500 text-xs font-semibold mt-5 mb-2">OTHER</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3  text-gray-700"><FaUsers className="text-lg" /> Invite friends</div>
              <div onClick={logoutfunction} className="flex items-center gap-3  text-gray-700"><FaSignOutAlt className="text-lg" /> Log out</div>
            </div>
          </>
        )}
     {activeTab === "Promo" && (
          <>
            {/* Account Section */}
            <p className="text-gray-500 text-[14px]  font-semibold mb-3">Promo</p>

            <div className="space-y-4">
  <div className="flex items-center gap-3 text-gray-700">
    <FaEnvelope className="text-lg" /> Mailing List
  </div>
  <div className="flex items-center gap-3 text-gray-700">
    <FaTag className="text-lg" /> Promo Code Check
  </div>
  <div className="flex items-center gap-3 text-gray-700">
    <FaMoneyBillWave className="text-lg" /> Cashback
  </div>
  <div className="flex items-center gap-3 text-gray-700">
    <FaDice className="text-lg" /> Casino
  </div>
  <div className="flex items-center gap-3 text-gray-700">
    <FaGift className="text-lg" /> Bonuses
  </div>
</div>

          </>
        )}
        {activeTab === "Settings" &&      <>
            {/* Account Section */}
            <p className="text-gray-500 text-[14px]  font-semibold mb-3">Settings</p>

            <div className="space-y-4">
  <div className="flex items-center gap-3 text-gray-700">
    <FaGift className="text-lg" /> Your Accounts
  </div>
  <div className="flex items-center gap-3 text-gray-700">
    <FaUser className="text-lg" /> Account
  </div>
  <div className="flex items-center gap-3 text-gray-700">
    <FaMoneyBillWave className="text-lg" /> Prematch
  </div>
</div>

          </>}
      </div>
    </div>
   </section>
  );
};

export default Profile;