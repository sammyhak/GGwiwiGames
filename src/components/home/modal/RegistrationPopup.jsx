import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPhone, FaBolt, FaEnvelope, FaUsers } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import toast,{Toaster} from "react-hot-toast"
import {FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const RegistrationPopup=({ isOpen, onClose })=>{
  const base_url = "http://localhost:8080";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [selectedBonus, setSelectedBonus] = useState("sports");
  const [currency, setCurrency] = useState("BDT");
  const [activeTab, setActiveTab] = useState("email");
  const [selected, setSelected] = useState('sports');
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [country, setCountry] = useState("Bangladesh");
  const navigate=useNavigate();


  const handleSendSMS = () => {
    alert(`SMS sent to: +880${phoneNumber}`);
  };

  const handleConfirm = () => {
    alert(`Confirmation code entered: ${confirmationCode}`);
  }
  const bonuses = [
    { id: 'sports', title: 'Bonus for sports betting', description: 'Welcome bonus on your 1st deposit up to 12000 BDT' },
    { id: 'casino', title: 'Casino + Fast Games', description: 'Welcome package up to 446000 BDT + 220 FS' },
    { id: 'reject', title: 'Reject bonuses', description: 'Make your selection later' }
  ];
// -------------------------------emial-registration----------------------
const validateEmail = (email) => {
  return /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/.test(email);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    toast.error("Invalid email format");
    return;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return;
  }
  if (password !== reenterPassword) {
    toast.error("Passwords do not match");
    return;
  }
  axios.post(`${base_url}/auth/signup`,{phoneNumber:phone,email,country:country, currency:currency, promoCode:promoCode, bonusSelection:selected, password:password })
  .then((res)=>{
    if(res.data.success){
      console.log(res.data.message);
     toast.success(res.data.message);
     localStorage.setItem("token",JSON.stringify(res.data.token));
     localStorage.setItem("user",JSON.stringify(res.data.user));
      setTimeout(() => {
      navigate("/en/office/recharge")
      }, 1000);
    }else{
     toast.error(res.data.message)
    }
  }).catch((err)=>{
    console.log(err)
  })
};

if (!isOpen) return null;
// -----------------registarion-by-email-----------------------

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] font-sans text-gray-800 z-[100000] min-h-screen overflow-y-auto flex justify-center items-center">
      <div className="bg-white p-6 w-[95%] xl:w-[35%] shadow-lg relative">
        <Toaster/>
        <button className="absolute top-3 right-3 text-gray-500" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-[19px] font-[600] text-center mb-4">REGISTRATION</h2>

        <div className="grid grid-cols-4 mb-4  bg-gray-200 ">
          <button className={`py-[8px] text-center text-[13px] lg:text-[15px] font-[400] cursor-pointer border-r-[1px] border-white hover:bg-gray-700 hover:text-white  ${activeTab === "phone" ? "bg-[#2E2E2E] text-white shadow font-[500]" : ""}`} onClick={() => setActiveTab("phone")}>
            <MdPhoneAndroid className="inline mr-1" /> By phone
          </button>
          <button className={`py-[5px] text-center text-[13px] lg:text-[15px] font-[500] cursor-pointer border-r-[1px] border-white hover:bg-gray-700 hover:text-white  ${activeTab === "one-click" ? "bg-[#2E2E2E] text-white shadow font-[500]" : ""}`} onClick={() => setActiveTab("one-click")}>
            <FaBolt className="inline mr-1" /> One-click
          </button>
          <button className={`py-[5px] text-center text-[13px] lg:text-[15px] font-[500] cursor-pointer  border-r-[1px] border-white hover:bg-gray-700 hover:text-white  ${activeTab === "email" ? "bg-[#2E2E2E] text-white shadow font-[500]" : ""}`} onClick={() => setActiveTab("email")}>
            <FaEnvelope className="inline mr-1" /> By e-mail
          </button>
          <button className={`py-[5px] text-center text-[13px] lg:text-[15px] font-[500] cursor-pointer hover:bg-gray-700 hover:text-white ${activeTab === "socials" ? "bg-[#2E2E2E] text-white shadow font-[500]" : ""}`} onClick={() => setActiveTab("socials")}>
            <FaUsers className="inline mr-1" /> Socials
          </button>
        </div>
         {
          activeTab=="phone" ? <form>
          
        <div className="w-full mb-[20px] text-gray-700 bg-[#E8E8E8] p-[10px]">
      <div
        className="flex justify-between items-center cursor-pointer "
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h3 className="text-lg font-semibold mb-[10px]">Choose a welcome bonus</h3>
        {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${dropdownOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="flex gap-4 ">
          {bonuses.map((bonus) => (
            <div
              key={bonus.id}
              className={`flex flex-col items-start p-3 border border-[#FFB805]  cursor-pointer w-1/3 ${
                selected === bonus.id ? 'border-black bg-white' : 'border-gray-400 bg-gray-100'
              } hover:border-black`}
              onClick={() => setSelected(bonus.id)}
            >
              <input
                type="radio"
                name="bonus"
                value={bonus.id}
                checked={selected === bonus.id}
                onChange={() => setSelected(bonus.id)}
                className="mr-2 accent-black pointer-events-none"
              />
              <div className="font-semibold text-sm mb-1">{bonus.title}</div>
              <div className="text-xs text-gray-600 lg:block hidden">{bonus.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className=" ">
      {/* Phone Number Input */}
      <div className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden mb-4">
        <div className="flex items-center px-2 bg-white border-r">
          <img
            src="https://flagcdn.com/w40/bd.png"
            alt="Bangladesh Flag"
            className="w-6 h-4 mr-1"
          />
          <span className="text-sm">+880</span>
        </div>
        <input
          type="text"
          placeholder="1812345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="flex-1 px-2 py-2 text-sm focus:outline-none"
        />
        <button
          className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800"
          onClick={handleSendSMS}
        >
          Send SMS
        </button>
      </div>

      {/* Currency Selection */}
      <div className="mb-4">
        <div className="relative border border-gray-300 rounded-[3px]">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-2 py-2 text-sm appearance-none bg-white focus:outline-none"
          >
            <option>Bangladeshi taka (BDT)</option>
            <option>US Dollar (USD)</option>
            <option>Euro (EUR)</option>
          </select>
          <div className="absolute top-2 right-2 pointer-events-none">
            <FaChevronDown className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Confirmation Code and Promo Code */}
      <div className="grid grid-cols-2 gap-4 mb-[10px]">
        <div className="flex border items-center border-gray-300 rounded-[3px] overflow-hidden">
          <input
            type="text"
            placeholder="Confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="flex-1 px-2 py-2 text-sm focus:outline-none"
          />
          <button
            className="bg-gray-500 text-white px-4 py-2 text-sm hover:bg-gray-600"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
        <div className="border border-gray-300 rounded-[3px]">
          <input
            type="text"
            placeholder="Promo code (if you have one)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full px-2 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
    <button className="w-full bg-sky-500 cursor-pointer text-white py-2  font-semibold">REGISTER</button>
        <p className="text-center text-sm mt-3">By clicking this button you confirm that you have read and agree to the <span className="text-blue-500">Terms and Conditions</span> and <span className="text-blue-500">Privacy Policy</span>.</p>
        <p className="text-center text-sm mt-2">Already have an account? <span className="text-blue-500 cursor-pointer">Log in</span></p>
          </form>:""
         }

        {activeTab === "email" && (
                   
                   <form onSubmit={handleSubmit} className="w-full bg-white text-gray-800 z-[1000000000]">
                   {/* Bonus Selection */}
                   <div className="w-full mb-[20px] bg-[#F9F9F9] p-2">
                     <div
                       className="flex justify-between items-center cursor-pointer"
                       onClick={() => setDropdownOpen(!dropdownOpen)}
                     >
                       <h3 className="text-[16px] font-semibold mb-3 text-gray-800">Choose a welcome bonus</h3>
                       {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                     </div>
                     <div
                       className={`transition-all duration-500 overflow-hidden ${dropdownOpen ? 'max-h-screen' : 'max-h-0'}`}
                     >
                       <div className="grid grid-cols-3 gap-[20px]">
                         {bonuses.map((bonus) => (
                           <div
                             key={bonus.id}
                             className={`flex flex-col items-start p-4 border rounded-lg cursor-pointer w-full  ${
                               selected === bonus.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
                             } hover:border-blue-500`}
                             onClick={() => setSelected(bonus.id)}
                           >
                             <input
                               type="radio"
                               name="bonus"
                               value={bonus.id}
                               checked={selected === bonus.id}
                               onChange={() => setSelected(bonus.id)}
                               className="mr-2 accent-blue-600 pointer-events-none"
                             />
                             <div className="font-semibold text-sm mb-1 text-gray-800">{bonus.title}</div>
                             <div className="text-xs text-gray-600 lg:block hidden">{bonus.description}</div>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 
                   {/* Country & Currency Selection */}
                   <div className="flex gap-[10px] mb-2">
                     <div className="w-1/2">
                       <label className="text-sm text-gray-700">Select country</label>
                       <select
                         value={country}
                         onChange={(e) => setCountry(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                       >
                         <option>Bangladesh</option>
                         <option>India</option>
                         <option>Pakistan</option>
                       </select>
                     </div>
                     <div className="w-1/2">
                       <label className="text-sm text-gray-700">Select currency</label>
                       <select
                         value={currency}
                         onChange={(e) => setCurrency(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                       >
                         <option>Bangladeshi taka (BDT)</option>
                         <option>Indian Rupee (INR)</option>
                         <option>US Dollar (USD)</option>
                       </select>
                     </div>
                   </div>
                 
                   {/* Input Fields */}
                   <div className="mt-4 space-y-4">
                    <div className="w-full grid grid-cols-2 gap-[10px]">
                    <input
                       type="email"
                       placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full px-4 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                     />
                     <input
                       type="text"
                       placeholder="Phone number"
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                       className="w-full px-4 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                     />
                 
                    </div>
                     {/* Password Fields */}
                     <div className="grid grid-cols-2 gap-[10px]">
                     <div className="relative ">
                       <input
                         type={showPassword ? "text" : "password"}
                         placeholder="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                       <span
                         className="absolute right-4 top-3 text-gray-600 cursor-pointer"
                         onClick={() => setShowPassword(!showPassword)}
                       >
                         {showPassword ? <FaEyeSlash /> : <FaEye />}
                       </span>
                     </div>
                 
                     <div className="relative">
                       <input
                         type={showReenterPassword ? "text" : "password"}
                         placeholder="Re-enter your password"
                         value={reenterPassword}
                         onChange={(e) => setReenterPassword(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                       <span
                         className="absolute right-4 top-3 text-gray-600 cursor-pointer"
                         onClick={() => setShowReenterPassword(!showReenterPassword)}
                       >
                         {showReenterPassword ? <FaEyeSlash /> : <FaEye />}
                       </span>
                     </div>
                     </div>
                 
                     <input
                       type="text"
                       placeholder="Promo code (if you have one)"
                       value={promoCode}
                       onChange={(e) => setPromoCode(e.target.value)}
                       className="w-full px-4 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                     />
                   </div>
                 
                   {/* Register Button */}
                   <button
                    
                     className="w-full bg-[#FFB805] text-white py-3 text-[14px]  font-semibold mt-6 focus:outline-none"
                   >
                     REGISTER
                   </button>
                 
                   {/* Terms & Conditions */}
                   <p className="text-center text-sm mt-6">
                     By clicking this button you confirm that you have read and agree to the{" "}
                     <span className="text-[#FFB805] cursor-pointer">Terms and Conditions</span> and{" "}
                     <span className="text-[#FFB805] cursor-pointer">Privacy Policy</span>.
                   </p>
                 
                   <p className="text-center text-sm mt-2">
                     Already have an account?{" "}
                     <span className="text-[#FFB805] cursor-pointer">Log in</span>
                   </p>
                 </form>
                 
        )}

       
      </div>
    </div>
  );
}
export default RegistrationPopup;