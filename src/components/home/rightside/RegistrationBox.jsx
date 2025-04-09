import { useState } from "react";
import { FaPhone, FaBolt, FaEnvelope } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import toast,{Toaster} from "react-hot-toast"
export default function RegistrationBox() {
  const [activeTab, setActiveTab] = useState("phone");
  const handlealert=()=>{
    alert("Please,Connect game api!")
  }
  return (
    <div className="w-full text-white  rounded-md shadow-lg relative">
      <Toaster/>
      <div className="w-full h-10 mb-[10px] bg-gray-800 flex items-center justify-center text-xs text-gray-400 cursor-pointer">
        Collapse block »
      </div>
      <div className="bg-gray-100 mt-1 p-[10px] w-full rounded-[3px]">
      <div className="text-[17px] text-center text-black font-bold mb-[12px]">REGISTRATION</div>
      <div className="flex space-x-2 mb-3">
        <button
          className={`flex-1 p-2 flex items-center justify-center gap-1 text-sm font-semibold border  transition ${
              activeTab === "phone" ? "bg-gray-800 border-gray-500" : "bg-gray-800 border-gray-600"
          }`}
          onClick={() => setActiveTab("phone")}
        >
          <FaPhone /> By phone
        </button>
        <button
          className={`flex-1 p-2 flex items-center text-black justify-center gap-1 text-sm font-semibold  transition ${
              activeTab === "oneclick" ? "" : ""
          }`}
          onClick={() => setActiveTab("oneclick")}
        >
          <FaBolt /> One-click
        </button>
      </div>
      {activeTab === "phone" && (
        <div>
          <div className="flex items-center border border-gray-200 rounded-md p-2 bg-white text-gray-800">
            <span className="text-xl">🇧🇩</span>
            <span className="ml-2">+880</span>
            <input
              type="text"
              placeholder="1812 345678"
              className="flex-1 bg-transparent outline-none ml-2 text-gray-400"
            />
            <FaEnvelope className="text-gray-400" />
          </div>
          <div className="relative border border-gray-200 rounded-md p-2 mt-2 bg-white text-gray-800 flex items-center">
            <select className="w-full bg-transparent outline-none text-gray-400">
              <option>Bangladeshi taka (BDT)</option>
            </select>
            <IoIosArrowDown className="absolute right-2 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Confirmation code"
            className="w-full mt-3 p-2 border border-gray-200 rounded-md  bg-white text-gray-800"
          />
          <input
            type="text"
            placeholder="Promo code (if you have one)"
            className="w-full mt-3 border border-gray-200 rounded-md p-2 bg-white text-gray-800"
          />
        </div>
      )}
      <button onClick={handlealert} className="w-full mt-3 p-2 cursor-pointer bg-theme-color text-black font-bold text-[14px]">REGISTER</button>
      <p className="text-xs text-gray-400 mt-2 text-center">
        By clicking this button you confirm that you have read and agree to the{" "}
        <span className="text-white underline">Terms and Conditions</span> and{" "}
        <span className="text-white underline">Privacy Policy</span> of the company and confirm that you are of legal age.
      </p>
      <div className="mt-3 text-center text-xs font-bold bg-black p-2">100% BONUS ON YOUR 1ST DEPOSIT</div>
   
      </div>
     </div>
  );
}