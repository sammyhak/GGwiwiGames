import axios from "axios";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import logo from "../../../assets/logo.png"
export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    axios.post(`https://ggwiwigamesbe.onrender.com/auth/login`, formData).then((res) => { 
    if(res.data.success){
      toast.success("Success", res.data.message, "success");
      localStorage.setItem("admin-token", res.data.jwtToken);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      window.location.href = "/admin-dashboard";
    } else {  
      toast.error(res.data.message);          
    }
    }).catch((err) => {
      console.error(err);
    });
  };

  
  return (
    <div className="flex items-center p-[20px] justify-center min-h-screen bg-gradient-to-br font-sans from-gray-900 via-gray-800 to-gray-900 w-full relative">
      <Toaster />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600 opacity-30 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full md:w-[60%]  lg:w-[40%] xl:w-[30%] 2xl:w-[25%] p-8 bg-gray-800 bg-opacity-90 shadow-xl backdrop-blur-lg rounded-[5px] border border-gray-700">
                <img className="w-[120px] lg:w-[160px] m-auto" src={logo} alt="" />

        {/* Form */}
        <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer duration-300 shadow-md transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Register */}
        <div className="text-center mt-4 text-sm text-gray-400">
          <a href="#" className="hover:text-indigo-400 transition">Forgot Password?</a>
        </div>

      </div>
    </div>
  );
}
