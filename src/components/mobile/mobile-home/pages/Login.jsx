import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaBolt, FaLock, FaEye, FaPhone, FaUsers,FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import TopBarMenu from "../../../home/topBarMenu/TopBarMenu";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdInfo } from "react-icons/md";
import Footer from "../../../shared/Footer";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast,{Toaster} from "react-hot-toast"

export default function Login() {
  const [selectedMethod, setSelectedMethod] = useState("email");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      axios.post(`http://localhost:8080/auth/login`, formData)
      .then((response) => {
        console.log(response);
        if (!response.data.success) {
            toast.error(response.data.message, "error");
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
    })
    .catch((error) => {
        console.log(error);
    })
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-[16px] font-[600]">Log In</h2>
        </div>

        <div className=" border-b border-gray-200 grid grid-cols-4 px-[10px] gap-1 py-[10px]">
          {[{ id: "phone", icon: <FaPhone /> }, { id: "one-click", icon: <FaBolt /> }, { id: "email", icon: <FaEnvelope /> }, { id: "socials", icon: <FaUsers /> }].map((method) => (
           <>
              {
                method.id=="email" ?  <button
                key={method.id}
                className={`flex-1 py-3 text-center text-sm relative  font-medium cursor-pointer bg-gray-100 rounded-[5px] ${selectedMethod === method.id ? "bg-[#FFB805] text-black" : " text-[#FFB805]"}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex flex-col items-center text-gray-600">
                  {method.icon}
                  <span className="mt-1 capitalize">{method.id.replace("-", " ")}</span>
                  <span className="w-[10px] h-[10px] bg-green-500 rounded-full absolute top-[5%] right-[5%]"></span>
                </div>
              </button>: <button
                key={method.id}
                className={`flex-1 py-3 text-center text-sm  font-medium cursor-pointer bg-gray-100 rounded-[5px] ${selectedMethod === method.id ? "bg-yellow-500 text-black" : " text-yellow-500"}`}
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
{/* ---------------login-form------------------ */}
{
  selectedMethod=="email" ? <div className="">
  <div className="px-4 py-[20px]">
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          name="email"
          placeholder="E-mail or ID*"
          className="w-full px-3 py-[9px] bg-white border-[1px] text-gray-700 border-gray-400 rounded-[5px]  outline-[#FFB805] text-[14px]"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4 relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password*"
          className="w-full px-3 py-[9px] bg-white border-[1px] text-gray-700 border-gray-400 rounded-[5px]  outline-[#FFB805] text-[14px]"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 top-0 right-2 flex text-gray-500 items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <div className="mb-4 flex items-center">
        <input type="checkbox" id="remember" className="mr-2" />
        <label htmlFor="remember" className="text-[15px]">Remember me</label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#FFB805] text-black py-2  rounded font-bold hover:bg-yellow-600"
        disabled={loading}
      >
        {loading ? "Logging in..." : "LOG IN"}
      </button>
    </form>

    <div className="text-center text-[13px] mt-4">
      <a href="#" className="text-yellow-500">Forgot your password?</a>
    </div>
    <div className="text-center text-[14px] mt-2">
      <span>Don't have an account? </span>
      <a href="#" className="text-yellow-500">Register</a>
    </div>
  </div>
</div>:""
}

{/* ------------login-form------------------ */}
      </div>
    </div>
    <Footer/>
    </section>
  );
}
