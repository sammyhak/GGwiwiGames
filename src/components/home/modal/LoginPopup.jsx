import { useState } from "react";
import { AiOutlineClose, AiFillGoogleCircle } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPhone, FaBolt, FaEnvelope, FaUsers } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
import { BiSolidMessageRounded } from "react-icons/bi";
import axios from "axios"; // Assuming axios is used for API calls
import toast,{ Toaster } from "react-hot-toast"; // Assuming you are using react-toastify for notifications
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("phone");
  const navigate=useNavigate();
  // Form data and states
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validate form data
  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "E-mail or ID is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post(`https://ggwiwigamesbe.onrender.com/auth/login`, formData);
      if (!response.data.success) {
        toast.error(response.data.message);
        alert(response.data.message)
        return;
      }

      const { message, jwtToken, user } = response.data;
      toast.success(message, "success");
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

      onClose();
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] text-gray-700 bg-[rgba(0,0,0,0.6)]">
        <Toaster/>
     
      <div className="bg-white p-6 w-[35%] rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-[20px] font-semibold text-center text-gray-700">Log in</h2>
          <button onClick={onClose} className="text-xl">
            <IoMdClose />
          </button>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-3 mb-4 bg-gray-200">
            <button
              className={`py-[8px] text-center text-[16px] font-[500] cursor-pointer border-r-[1px] border-white hover:bg-gray-700 hover:text-white ${activeTab === "phone" ? "bg-[#2E2E2E] text-white shadow font-[500]" : ""}`}
              onClick={() => setActiveTab("phone")}
            >
              <MdPhoneAndroid className="inline mr-1" /> By phone
            </button>

            <button
              className={`py-[5px] text-center text-[16px] font-[500] cursor-pointer border-r-[1px] border-white hover:bg-gray-700 hover:text-white ${activeTab === "email" ? "bg-[#2E2E2E] text-white shadow font-[500]" : ""}`}
              onClick={() => setActiveTab("email")}
            >
              <FaEnvelope className="inline mr-1" /> By e-mail / ID
            </button>
            <button
              className={`py-[5px] text-center text-[16px] font-[500] cursor-pointer hover:bg-gray-700 hover:text-white ${activeTab === "socials" ? "bg-[#2E2E2E] text-white shadow font-[500]" : ""}`}
              onClick={() => setActiveTab("socials")}
            >
              <BiSolidMessageRounded className="inline mr-1" /> By SMS
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              {activeTab === "email" && (
                <>
                  <label className="block text-sm">Your e-mail / ID*</label>
                  <input
                    type="text"
                    name="email"
                    className="w-full p-2 border border-gray-300 h-[50px] text-[15px] rounded mt-1"
                    placeholder="E-mail or ID"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                  <label className="block text-sm mt-3">Password*</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full p-2 border border-gray-300  rounded mt-1 h-[50px] text-[15px]"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute text-[14px] right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </>
              )}
            </div>
            <div className="flex items-center justify-between mt-5">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-[14px]">Remember</label>
              </div>
              <a href="#" className="text-blue-500">Forgot your password?</a>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-yellow-500  text-white py-3 text-[16px]  rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </form>
          <div className="text-center mt-4">You can log in to your account via:</div>
          <div className="flex justify-center gap-4 mt-2">
            <AiFillGoogleCircle size={32} className="text-gray-700" />
            <FaTelegramPlane size={32} className="text-gray-700" />
            <AiOutlineClose size={32} className="text-gray-700" />
          </div>
          <div className="text-center mt-4">
            Don't have an account? <a href="#" className="text-blue-500">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
