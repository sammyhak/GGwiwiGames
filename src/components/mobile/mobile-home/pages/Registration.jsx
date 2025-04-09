import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaBolt, FaLock, FaEye, FaPhone, FaUsers,FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import TopBarMenu from "../../../home/topBarMenu/TopBarMenu";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdInfo } from "react-icons/md";
import Footer from "../../../shared/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"
import Swal from "sweetalert2";
export default function Registration() {
  const [selectedMethod, setSelectedMethod] = useState("email");
  const [step, setStep] = useState(1);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    country: "Bangladesh",
    currency: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    promoCode: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep3 = () => {
    let newErrors = {};
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3) {
      axios
        .post(`http://localhost:8080/auth/signup`, formData)
        .then((response) => {
          Swal.fire({
            icon: response.data.success ? "success" : "error",
            title: response.data.success ? "Success!" : "Oops...",
            text: response.data.message,
          });
          localStorage.setItem("token",JSON.stringify(response.data.token));
          localStorage.setItem("user",JSON.stringify(response.data.user));
           setTimeout(() => {
           navigate("/deposit")
           }, 1000);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
          });
        });
    }
  };
  

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="bg-gray-100">
        <TopBarMenu/>
        <Toaster/>
        <div className=" flex items-center justify-center  bg-[#E8E8E8]">
        <div className="w-full bg-white  overflow-hidden">
        <div className="bg-[#2E2E2E] text-white px-4 py-2 flex items-center ">
            <NavLink to="/">
            <div className="px-[10px] py-[8px] bg-[#4F4F4F] flex justify-center mr-[10px] items-center rounded-[5px] text-[20px]">
            <HiArrowNarrowLeft className="cursor-pointer "/>
          </div>
            </NavLink>
          <h2 className="text-[16px] font-[600]">REGISTRATION</h2>
        </div>

        <div className=" border-b border-gray-200 grid grid-cols-4 px-[10px] gap-1 py-[10px]">
          {[{ id: "phone", icon: <FaPhone /> }, { id: "one-click", icon: <FaBolt /> }, { id: "email", icon: <FaEnvelope /> }, { id: "socials", icon: <FaUsers /> }].map((method) => (
           <>
              {
                method.id=="email" ?  <button
                key={method.id}
                className={`flex-1 py-3 text-center text-sm relative  font-medium cursor-pointer bg-gray-100 rounded-[5px] ${selectedMethod === method.id ? "bg-yellow-500 text-black" : " text-yellow-500"}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex flex-col items-center text-gray-600">
                  {method.icon}
                  <span className="mt-1 capitalize">{method.id.replace("-", " ")}</span>
                  <span className="w-[10px] h-[10px] bg-green-500 rounded-full absolute top-[5%] right-[5%]"></span>
                </div>
              </button>: <button
                key={method.id}
                className={`flex-1 py-3 text-center text-sm  font-medium cursor-pointer bg-gray-100 rounded-[5px] ${selectedMethod === method.id ? "bg-[#FFB805] text-black" : " text-[#FFB805]"}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex flex-col items-center text-gray-600">
                  {method.icon}
                  <span className="mt-1 capitalize">{method.id.replace("-", " ")}</span>
                </div>
              </button>
              }
           </>
          ))}
        </div>

    {
      selectedMethod=="email" ? <>
          <div className="px-4 py-6">
          <div className="text-center mb-4">
            <span className={step >= 1 ? "text-yellow-500" : "text-gray-400"}>●</span>
            <span className="text-gray-400">───</span>
            <span className={step >= 2 ? "text-yellow-500" : "text-gray-400"}>●</span>
            <span className="text-gray-400">───</span>
            <span className={step >= 3 ? "text-yellow-500" : "text-gray-400"}>●</span>
            <p className="text-gray-700 mt-2">Step {step} of 3</p>
          </div>
          {step === 1 && (
            <>
              <input type="text" name="firstName" placeholder="First name*" className="w-full px-3 mb-[16px] py-[9px] bg-white border-[1px] text-gray-700 border-gray-400 rounded-[5px] outline-[#FFB805] text-[14px]" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <p className="text-red-500 text-sm mb-2">{errors.firstName}</p>}
              <input type="text" name="surname" placeholder="Surname*" className="w-full px-3 mb-[16px] py-[9px] bg-white border-[1px] text-gray-700 border-gray-400 rounded-[5px]  outline-[#FFB805] text-[14px]" value={formData.surname} onChange={handleChange} />
              {errors.surname && <p className="text-red-500 text-sm mb-2">{errors.surname}</p>}
              <input type="email" name="email" placeholder="Email*" className="w-full px-3 mb-[16px] py-[9px] bg-white border-[1px] text-gray-700 border-gray-400 rounded-[5px]  outline-[#FFB805] text-[14px]" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

              <p className="flex justify-start gap-2 mt-[20px] text-[13px] text-gray-400 font-[400]"><MdInfo className="text-[22px]"/> We recommend using Gmail to avoid any issues with receiving notifications</p>
            </>
          )}

          {step === 2 && (
            <>
              <select name="city" className="w-full px-3 mb-[16px] py-[9px] bg-white border-[1px] text-gray-700 border-gray-300  outline-[#FFB805] text-[14px]" value={formData.city} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
              </select>
              {errors.city && <p className="text-red-500 text-sm mb-2">{errors.city}</p>}
              <input type="text" name="phoneNumber" placeholder="Phone number*" className="w-full px-3 mb-[16px] py-[9px] bg-white border-[1px] text-gray-700 border-gray-300  outline-[#FFB805] text-[14px]" value={formData.phoneNumber} onChange={handleChange} />
              {errors.phoneNumber && <p className="text-red-500 text-sm mb-2">{errors.phoneNumber}</p>}
            </>
          )}
             {step === 3 && (
            <>
              <select name="currency" className="w-full px-3 mb-[16px] py-[9px] bg-white border-[1px] text-gray-700 border-gray-300  outline-[#FFB805] text-[14px]" value={formData.currency} onChange={handleChange}>
                <option value="">Select Currency</option>
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
              </select>
              <div className="relative ">
                <FaLock className="absolute left-3 top-3 text-gray-500" />
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-3 outline-yellow-500 py-2 pl-10 border-[1px] border-gray-200 text-[14px]" />
                <div className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <div className="relative mt-3">
                <FaLock className="absolute left-3 top-3 text-gray-500" />
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 outline-yellow-500 py-2 pl-10 border-[1px] border-gray-200 text-[14px]" />
                <div className="absolute right-3 top-3 cursor-pointer  text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}  </>
          )}
        </div>

        <div className="flex flex-col gap-2 px-4 pb-[20px]">
  <button 
    className="flex-1 py-3 bg-[#FFB805] text-black cursor-pointer font-semibold" 
    onClick={handleNext}
  >
    {step === 3 ? "REGISTER" : "NEXT"}
  </button>
  <button 
    className="flex-1 py-3 bg-gray-300 text-gray-700 cursor-pointer font-semibold" 
    onClick={handleBack}
  >
    BACK
  </button>
</div>
     </>:""
    }
    {
      selectedMethod=="phone" ? <>
      <p className="p-[20px]">please connect api!</p>
      </>:""
    }    {
      selectedMethod=="one-click" ? <>
      <p className="p-[20px]">please connect api!</p>
      </>:""
    }

      </div>
    </div>
    <Footer/>
    </section>
  );
}
