import { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaFacebookF,
  FaGift,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";
import { IoIosStar } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import square_img from "../../../assets/square_img.png";
import {
  FaChevronDown,
  FaEnvelope,
  FaUserCircle,
  FaRedo,
  FaCog,
  FaPhone,
} from "react-icons/fa";
import RegistrationPopup from "../modal/RegistrationPopup";
import LoginPopup from "../modal/LoginPopup";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const links = [];

const TopBarMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [user_details, set_userdetails] = useState([]);

  const fetchUserData = async () => {
    try {
      console.log("hello");
      await axios
        .get(
          `https://ggwiwigamesbe.onrender.com/user/user-info/${user_info._id}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          set_userdetails(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUserData();
    console.log("Stored Token:", localStorage.getItem("token"));
  }, []);

  const [closepopup, setclosepopup] = useState(false);

  const handlepopup = () => {
    setclosepopup(true);
  };

  const handlealert = () => {
    alert("Please,Connect game api!");
  };

  return (
    <>
      {/* Desktop topbar menu - Changed from sticky to relative and added margin */}
      <div className="xl:block hidden relative  z-[100]">
        <Toaster />

        {/* WhatsApp */}
        <div className="fixed bottom-[10px] left-[1%]">
          <NavLink to="https://wa.me/+447446292875" target="_blank">
            <img
              className="w-[50px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png"
              alt=""
            />
          </NavLink>
        </div>

        <div className="flex items-center gap-5 bg-[#212121] pl-4">
          <NavLink to="/">
            <img className="w-44 xl:w-55" src={logo} alt="" />
          </NavLink>
          <div className="w-full">
            <div className="flex w-full items-center justify-end lg:justify-between gap-2 py-3 pr-4">
              <div className="flex items-center gap-10">
                <div className="hidden lg:flex items-center gap-3 text-md text-white">
                  {links.map((link, index) => (
                    <Link key={index} to={link.url}>
                      <div className="flex items-center gap-1 py-[6px] text-[13px] px-4  bg-[#3B3B3B] hover:bg-[#4d4c4c] rounded-[4px] duration-300">
                        {link.icon}
                        {link.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-1 text-white text-xs">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div>
                      <p>Balance:{user_details.balance?.toFixed(2)} BDT</p>
                    </div>
                    <div className="lg:flex hidden items-center gap-1  cursor-pointer hover:text-gray-300">
                      <span>
                        Main account (BDT){" "}
                        <strong>{user_details.balance?.toFixed(2)}</strong>
                      </span>
                      <FaChevronDown size={10} />
                    </div>
                    <div className="relative lg:block hidden cursor-pointer">
                      <FaEnvelope size={18} className="text-theme-color" />
                      <span className="absolute -top-1 -right-1 bg-red-600 text-[9px] text-white px-1 rounded-full">
                        1
                      </span>
                    </div>
                    <NavLink to="/en/office/profile">
                      <FaUserCircle
                        size={20}
                        className="cursor-pointer lg:block hidden hover:text-gray-300"
                      />
                    </NavLink>
                    <FaRedo
                      size={18}
                      className="cursor-pointer lg:block hidden hover:text-gray-300"
                    />
                    <NavLink
                      to="/en/office/recharge"
                      className="bg-theme-color  lg:block hidden text-black px-3 py-[7px] rounded-sm text-[13px] font-semibold"
                    >
                      Make a deposit
                    </NavLink>
                    <FaCog
                      size={18}
                      className="cursor-pointer  lg:block hidden hover:text-gray-300"
                    />
                    <span className="lg:block hidden text-[14px]">19:28</span>
                    <div className="lg:flex hidden items-center gap-1  text-[14px] cursor-pointer hover:text-gray-300">
                      <span>EN</span>
                      <FaChevronDown size={15} />
                    </div>
                    <FaPhone
                      size={16}
                      className="cursor-pointer lg:block hidden hover:text-gray-300"
                    />
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center gap-3">
                    <div
                      className="px-3 py-2 text-[15px] text-white bg-[#CF2728] hover:bg-[#4d4c4c] rounded-sm cursor-pointer transition-all"
                      onClick={() => setShowPopup(true)}
                    >
                      Login
                    </div>
                    {showPopup && (
                      <LoginPopup onClose={() => setShowPopup(false)} />
                    )}

                    <div
                      className="px-3 py-2 text-[15px] text-gray-800 font-[500] bg-[#CF2728] hover:bg-yellow-500 rounded-sm cursor-pointer transition-all"
                      onClick={() => setIsOpen(true)}
                    >
                      Register
                    </div>
                    <RegistrationPopup
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center bg-theme-color relative h-[50px]">
              {/* Left Cropped Section */}
              <div className="relative h-full w-[60px] bg-[#212121]">
                <div className="absolute left-0 top-0 h-full w-full bg-theme-color clip-left-shape"></div>
              </div>

              {/* Main Menu */}
              {/* <div className="flex items-center relative z-[10] pl-[0px] ml-[-10px]">
                {menuItems.map((menu, index) => (
                  <div key={index} className="relative" onMouseEnter={() => setOpenMenu(index)} onMouseLeave={() => setOpenMenu(null)}>
                    <div className="flex items-center px-1 py-2 text-sm font-bold cursor-pointer uppercase">
                      {menu.name}
                      <RxCaretDown size={16} />
                    </div>

                    {openMenu === index && (
                      <div className="absolute left-0 py-2 px-4 bg-white shadow-lg w-48">
                        <ul className="grid gap-2 text-sm text-gray-700">
                          {menu.subMenu.map((item, idx) => (
                            <li key={idx} className="px-2 py-1 text-sm font-semibold hover:text-amber-600 border-l-2 border-gray-100 hover:border-amber-600 duration-300 cursor-pointer">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
                <div className="text-red-500 font-[600] ml-[15px]">
                  <NavLink to="/unibet-sports">99wiwi 🔥</NavLink>
                </div>
              </div> */}

              {/* Right Icon */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - Also added margin top */}
      <div className="flex xl:hidden items-center justify-between py-[15px] bg-[#212121] px-1 w-full mt-1">
        <div className="text-white font-bold text-lg">
          <NavLink to="/">
            <img src={logo} className="w-[70px]" alt="" />
          </NavLink>
        </div>
        <div>
          {user ? (
            <div className="flex justify-center gap-[10px] h-[40px]">
              <NavLink to="/deposit">
                <div className="text-black font-[500] flex text-nowrap justify-center items-center rounded-[5px] bg-theme-color px-[5px] py-[12px] h-full w-auto min-w-[60px]">
                  {user_details?.balance?.toFixed(2)} BDT
                </div>
              </NavLink>
              <NavLink to="/profile">
                <div className="relative text-white flex justify-center items-center rounded-[5px] bg-[#2E2E2E] px-[2px] py-[12px] h-full w-auto min-w-[45px]">
                  <FaUserAlt />
                  <span className="absolute top-[10%] right-[9%] bg-green-500 rounded-full p-[4px]"></span>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="flex space-x-2">
              <NavLink to="/login" className="cursor-pointer">
                <button className="bg-[#2E2E2E] text-white text-[13px] px-4 py-[9px] rounded">
                  Log in
                </button>
              </NavLink>
              <NavLink to="/registration" className="cursor-pointer">
                <button className="bg-[#2E2E2E] text-[13px] text-white  px-4 py-[9px] rounded">
                  Registration
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopBarMenu;
