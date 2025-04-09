import { BarChart2, DollarSign, Menu, Settings, TrendingUp, Users } from "lucide-react";
import { useState,useEffect,useRef} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoGameController, IoTicketOutline, IoBugOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { TbUserStar } from "react-icons/tb";
import axios from "axios"
import { LuMenu } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { HiUserGroup } from "react-icons/hi2";
import { LiaUsersSolid } from "react-icons/lia";
import { TbAffiliateFilled } from "react-icons/tb";
import { BsCashStack } from "react-icons/bs";
import { BsFillSuitClubFill } from "react-icons/bs";
import { PiGameControllerDuotone } from "react-icons/pi";
import { LuLockKeyhole } from "react-icons/lu";
import { BiSolidOffer } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import { BiLabel } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { RiBankLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { VscSettingsGear } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import logo from "../../../assets/logo.png"
const Mobilesidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [pending_withdraw,set_pending_withdraw]=useState();
  const [approved_withdraw,set_approved_withdraw]=useState();
  const [rejected_withdraw,setrejected_withdraw]=useState();
  const [all_withdraw,set_allwithdraw]=useState();
  const base_url = "https://ggwiwigamesbe.onrender.com";
  // ----------------deposit--------------------------
  const [pending_deposit,set_pending_deposit]=useState();
  const [success_deposit,set_success_deposit]=useState();
  const [all_deposit,set_all_deposit]=useState();
  // -------------user---------------
  const [active_user,set_active_user]=useState();
  const [inactive_user,set_inactive_user]=useState();
// Fetch Pending Withdrawals
const fetch_countation = () => {
  axios
    .get(`${base_url}/admin/all-coutation`)
    .then((res) => {
      set_pending_withdraw(res.data.pending_withdraw);
      set_approved_withdraw(res.data.approved_withdraw);
      set_allwithdraw(res.data.all_withdraw);
      // ---------------------deposit---------------
      set_pending_deposit(res.data.pending_deposit);
      set_success_deposit(res.data.success_deposit);
      set_all_deposit(res.data.all_deposit)
      set_active_user(res.data.active_user);
      set_inactive_user(res.data.deactive_user);

    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  fetch_countation();
}, []);
const SIDEBAR_ITEMS = [
  {
      name: "Dashboard",
      icon: RxDashboard,
      color: "#6366f1",
      href: "/admin-dashboard",
  },
  {
      name: "All User",
      icon: HiUserGroup,
      color: "#26de81",
      submenu: [
          { name: "Active User", href: "/admin-dashboard/active-users",count:active_user},
          { name: "Deactive User", href: "/admin-dashboard/deactive-users",count:inactive_user },
          { name: "Mobile Reg User", href: "" },
          { name: "Email Reg User", href: "" },
          { name: "1 click Reg User", href: "" },
      ],
  },
  // {
  // 	name: "User Logas",
  // 	icon: TbUserStar,
  // 	color: "#20bf6b",
  // 	href: "/",
  // },
  { name: "All Downline User", icon: LiaUsersSolid, color: "#f7b731", href: "/users",submenu: [
      { name: " Active Agent", href: "/users/active-user" },
      { name: " Agent User", href: "/users/banned-user"},
  ],},
  { name: " Affiliator", icon: TbAffiliateFilled, color: "#0fb9b1", href: "/users",submenu: [
      { name: "Create Affiliate ID", href: "/users/active-user" },
      { name: " Acctive Affiliator", href: "/users/banned-user"},
      { name: " Dactive Affiliator", href: "/users/all-user" },
      { name: " VIP Affiliator", href: "/users/send-notification" },
      { name: " Premium Affiliator", href: "/users/send-notification" },

  ],},
  { name: " Mob Cash", icon: BsCashStack, color: "#00a8ff", href: "/users",submenu: [
      { name: "Create Mob cash ID", href: "/users/active-user" },
      { name: " Acctive Mob Cash ", href: "/users/banned-user"},
      { name: "Dactive Mob Cash ", href: "/users/all-user" },
      { name: "Mob Cash KYC", href: "/users/send-notification" },
  ],},
  { name: "Club", icon: BsFillSuitClubFill, color: "#e1b12c", href: "/users",submenu: [
      { name: " Acctive Club", href: "/users/active-user" },
      { name: "Dactive Club ", href: "/users/banned-user"},
      { name: " Create Club ID ", href: "/users/all-user" },
  ],},
  { name: "Game Control", icon: PiGameControllerDuotone, color: "#EC4899", href: "/users",submenu: [
      { name: "Active game", href: "/users/active-user" },
      { name: "Dactive Game", href: "/users/banned-user"},
  ],},
  {
      name: "Game Api Key",
      icon: LuLockKeyhole,
      color: "#1B9CFC",
      href: "/",submenu: [
          { name: "Create Game Api Provider", href: "/users/active-user" },
          { name: "All Api Provider", href: "/users/banned-user",submenu: [
              { name: "Create Game Api Provider", href: "/users/active-user" },
              { name: "All Api Provider", href: "/users/banned-user"},
          ],},
      ],
  },
  {
      name: "Bonus",
      icon: BiSolidOffer,
      color: "#ff9f1a",
      href: "/",
  },
  { name: "Game History", icon: FaHistory, color: "#3ae374", href: "/users",submenu: [
      { name: "Bet list", href: "/users/active-user" },
      { name: "Todays Win  ", href: "/users/banned-user"},
      { name: "Todays Los", href: "/users/all-user" },
      { name: "Best Play Game", href: "/users/all-user" },
      { name: "Low Play Game", href: "/users/all-user" },
      { name: "Bet History", href: "/users/all-user" },

  ],},
  { name: "Tournament", icon: TbTournament, color: "#EC4899", href: "/users",submenu: [
      { name: "Create Tournament", href: "/users/active-user" },
      { name: "Live Tournament", href: "/users/banned-user"},
      { name: "Live Tournament ", href: "/users/all-user" },
      { name: "Upcoming Tournament ", href: "/users/all-user" },

  ],},
  {
      name: "White Label",
      icon: BiLabel,
      color: "#17c0eb",
      href: "/",
  },
  {
      name: "Frontend",
      icon: CgWebsite,
      color: "#f7b731",
      href: "/",
  },
  { name: "Deposit", icon: RiBankLine , color: "#20bf6b", href: "/users",submenu: [
      { name: "add Deposit Getway", href: "/users/active-user" },
      { name: "All Deposit Methode", href: "/users/banned-user"},
      { name: " All Acctive Account", href: "/users/all-user"},
      { name: " All Deposit History ", href: "/admin-dashboard/all-deposits",count:all_deposit },
      { name: "Deposit Request ", href: "/admin-dashboard/pending-deposits",count:pending_deposit },

  ],},
  { name: "Banking Withdraw", icon: BiMoneyWithdraw , color: "#45aaf2", href: "/users",submenu: [
      { name: "add Withdraw Getway", href: "/users/active-user" },
      { name: "All Withdraw Methode", href: "/users/banned-user"},
      { name: " All Acctive Account", href: "/users/all-user" },
      { name: " All Withdraw History ", href: "/admin-dashboard/all-withdarwal",count:all_withdraw },
      { name: "Withdraw Request ", href: "/admin-dashboard/pending-withdarwal",count:pending_withdraw },

  ],},
  { name: "Settings", icon: VscSettingsGear, color: "#EC4899", href: "/users",submenu: [
      { name: " General Setting", href: "/users/active-user" },
      { name: " System Configuration", href: "/users/banned-user"},
      { name: "Notification Setting", href: "/users/all-user" },
      { name: "SEO Configuration", href: "/users/send-notification" },
      { name: "Manage Templates", href: "/users/send-notification" },
      { name: " Manage Pages", href: "/users/send-notification" },
      { name: " KYC Setting", href: "/users/send-notification" },
      { name: " Language", href: "/users/send-notification" },
      { name: " Extensions", href: "/users/send-notification" },
      { name: " Cron Job Setting", href: "/users/send-notification" },
      { name: " Policy Pages", href: "/users/send-notification" },
      { name: " Maintenance Mode", href: "/users/send-notification" },
      { name: " Custom CSS", href: "/users/send-notification" },
      { name: " Sitemap XML", href: "/users/send-notification" },

  ],},

  { name: "Support Oracle", icon: BiSupport, color: "#fd9644", href: "/users",submenu: [
      { name: "Instent Support", href: "/users/active-user" },
      { name: " Normal Support", href: "/users/banned-user"},
      { name: "Notice", href: "/users/all-user" },
      { name: "Ticket", href: "/users/all-user" },
      { name: " Live Chat ", href: "/users/all-user" },

  ],},
  {
      name: "Logout",
      icon: TbLogout,
      color: "#eb3b5a",
      href: "/",
  },
];
  const toggleSubmenu = (index) => {
      setOpenSubmenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const handlealert=()=>{
      alert("Woking on it!")
    }
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile
  
    // Handle window resize to update isMobile state
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    // Close sidebar when clicking outside (only on mobile)
    useEffect(() => {
      if (!isMobile || !isSidebarOpen) return;
      const handleClickOutside = (event) => {
        if (!event.target.closest(".sidebar-container")) {
          setIsSidebarOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [isSidebarOpen, isMobile]);
  
  return (
    <div className="relative flex">
      {/* Menu Button */}
      <div className="cursor-pointer xl:hidden p-4 text-[25px] text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <LuMenu />
      </div>

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-full  text-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
           <motion.div
                className={`no-scrollbar relative z-10 transition-all font-bai duration-300 h-screen ease-in-out flex-shrink-0 no-scrollbar ${
                    isSidebarOpen ? "w-64" : "w-20"
                }`}
                animate={{ width: isSidebarOpen ? "75%":"75%" }}
            >
                <div className='no-scrollbar h-full overflow-y-auto bg-[#071251] custom-scrollbar backdrop-blur-md px-[10px] py-4 flex flex-col '>
                    <div className={isSidebarOpen ? "flex justify-between items-center":"flex justify-center items-center"}>
                
                        <div className='py-4 '>
                            <img className="w-[150px] mb-[6px]" src={logo} alt="" />
                               {
                                    isSidebarOpen ? <h1 className="text-white text-[20px] font-[600] text-nowrap">Mothers Admin</h1>:""
                               }
                </div>
                   <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className='p-[10px] rounded-full hover:bg-[#4634FF]  text-white cursor-pointer transition-colors max-w-fit'
                        >
                            <MdClose size={24} />
                        </motion.button>
                    </div>
       
                    <nav className='mt-4 flex-grow text-white '>
                        {SIDEBAR_ITEMS.map((item, index) => (
                            <div key={index}>
                                {item.submenu ? (
                                    <div>
                                        <div
                                            onClick={() => toggleSubmenu(index)}
                                            className='flex items-center px-[10px] py-[10px] text-sm font-medium  rounded-lg hover:bg-yellow-500 hover:text-black  text-white transition-colors mb-2 cursor-pointer'
                                        >
                                            <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                            <AnimatePresence>
                                                {isSidebarOpen && (
                                                    <motion.span className='ml-4 whitespace-nowrap '>{item.name}</motion.span>
                                                )}
                                            </AnimatePresence>
                                            <motion.div
                                                className='ml-auto'
                                                animate={{ rotate: openSubmenus[index] ? 180 : 0 }}
                                            >
                                                <IoChevronDown size={16} />
                                            </motion.div>
                                        </div>
                                        <AnimatePresence>
         {openSubmenus[index] && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="ml-8"
           >
             {item.submenu.map((sub, subIndex) => (
               <Link
                 key={subIndex}
                 to={sub.href}
                 className="flex justify-between items-center  relative p-2 text-sm text-gray-400 hover:text-white"
               >
                 <span>{sub.name}</span>
                 {sub.count !== undefined && (
                   <span className="bg-blue-500 absolute right-[4%] top-[2%] text-white text-xs font-bold px-2 py-1 rounded">
                     {sub.count}
                   </span>
                 )}
               </Link>
             ))}
           </motion.div>
         )}
       </AnimatePresence>
       
                                    </div>
                                ) : (
                                    <Link to={item.href} className='flex items-center hover:bg-yellow-500  hover:text-black px-[10px] py-[10px]  text-sm font-medium rounded-lg  transition-colors mb-2'>
                                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                        {isSidebarOpen && <span className='ml-4'>{item.name}</span>}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </motion.div>
      </div>
    </div>
  );
};

export default Mobilesidebar;
