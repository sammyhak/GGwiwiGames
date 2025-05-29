import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaWallet, FaBitcoin, FaUniversity, FaGamepad } from "react-icons/fa";
import { RiExchangeDollarFill } from "react-icons/ri";
import { FaTimes, FaCopy } from "react-icons/fa";
import toast,{Toaster} from "react-hot-toast"
import { IoMenu } from "react-icons/io5";
import axios from "axios";
import { Sidebar } from "lucide-react";
import Mobilesidebar from "./Mobilesidebar";
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
const tabs = [
  { name: "Lowest Limits", count: 4 },
  { name: "Recommended Methods", count: 16 },
  { name: "All Methods", count: 105 },
  { name: "E-Wallets", count: 16 },
  { name: "Payment Systems", count: 1 },
  { name: "E-Currency Exchangers", count: 12 },
  { name: "Internet Banking", count: 1 },
  { name: "Bank Transfer", count: 6 },
  { name: "Cryptocurrency", count: 48 },
  { name: "Game Items", count: 1 },
];

const paymentMethods = {
  "Lowest Limits": [
    { name: "Nagad Free", img: "https://melbet.org/paysystems/xpay/images/money/nagad_wallet.png" },
    { name: "Bkash Free", img: "https://melbet.org/paysystems/xpay/images/money/bkash_151.png" },
  ],
  "Recommended Methods": [
    { name: "Cellfin", img: "https://melbet.org/paysystems/xpay/images/money/cellfin_bt_melbet.png" },
    { name: "Upay Free", img: "https://melbet.org/paysystems/xpay/images/money/upay_free_8.png" },
    { name: "Nagad", img: "https://melbet.org/paysystems/xpay/images/money/nagad_wallet.png" },
    { name: "Bkash", img: "https://melbet.org/paysystems/xpay/images/money/bkash_151.png" },
    { name: "Nagad Free", img: "https://melbet.org/paysystems/xpay/images/money/nagad_wallet.png" },
    { name: "Bkash Free", img: "https://melbet.org/paysystems/xpay/images/money/bkash_151.png" },
    { name: "Bkash by Paykassma", img: "https://melbet.org/paysystems/xpay/images/money/bkash_151.png" },
    { name: "Nagad by Paykassma", img: "https://melbet.org/paysystems/xpay/images/money/nagad_wallet.png" },
    { name: "Nagad API", img: "https://melbet.org/paysystems/xpay/images/money/nagad_wallet.png" },
    { name: "Upay", img: "https://melbet.org/paysystems/xpay/images/money/upay_free_8.png" },
    { name: "mCash", img: "https://melbet.org/paysystems/xpay/images/money/upay_free_8.png" },
    { name: "Nexus Pay", img: "https://melbet.org/paysystems/xpay/images/money/upay_free_8.png" },
    { name: "OK Wallet", img: "https://melbet.org/paysystems/xpay/images/money/ok_wallet_melbet.png" },
    { name: "BinancePay", img: "https://melbet.org/paysystems/xpay/images/money/upay_free_8.png" },
  ],
};


export default function PaymentMethods() {
  const [selectedTab, setSelectedTab] = useState("Lowest Limits");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showbkashpopup, setshowbkashpopup] = useState(false);
  const [amount, setAmount] = useState(1000);
  const predefinedAmounts = [200, 500, 1000, 2500, 5000];
  const orderId = uuidv4().replace(/-/g, '').substring(0, 8); // Generate 8-letter orderId
  const [merchant_name,set_merchantname]=useState("BAYZID BOSTRALOY");
  const [agent_number,set_agentnumber]=useState("01901091730")
  const user_info = JSON.parse(localStorage.getItem("user"));

  const handleClick = (method) => {
    if (method.name === "Nagad Free") {
      setSelectedMethod(method);
      setShowPopup(true);
    }
    if (method.name === "Bkash Free") {
      setSelectedMethod(method);
      setshowbkashpopup(true);
    }
  };

// ---------------------nagad-deposit--------------------
const [walletNumber, setWalletNumber] = useState("");
const [transactionId, setTransactionId] = useState("");

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};

const handleDeposit = async (e) => {
  e.preventDefault();
  console.log(walletNumber)
  if (!walletNumber || !transactionId || !amount) {
    return toast.error("All fields are required!");
  }

  if (amount < 200 || amount > 25000) {
    return toast.error("Amount must be between 200 and 25,000 BDT!");
  }

  try {
    const response = await axios.post(`https://ggwiwigamesbe.onrender.com/user/create-deposit`, {

      paymentMethod:selectedMethod.name,
      depositAmount:amount,
      userWalletNumber:walletNumber,
      transactionId:transactionId,
      merchant_name,
      agent_number,
      customer_name:user_info?.surname || "",
      customer_email:user_info.email,
    });

    toast.success("Deposit request submitted successfully!");
    setWalletNumber("");
    setAmount("")
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message || "Something went wrong!");
  }
};
// ----------------sidebar---------------
const [sidebar,setsidebar]=useState(false)
  return (
   <section className="w-full h-auto pb-[50px] bg-white">
 <div className="bg-gray-100    mx-auto">
      <div className="bg-black text-yellow-400  flex justify-between gap-[20px] items-center p-2 py-[10px] text-[14px] lg:text-[16px] font-[400] ">
     <div onClick={()=>{setsidebar(true)}} className="text-[25px] lg:hidden text-white cursor-pointer">
      <IoMenu/>
     </div>
     {/* -----------------sidebar------------------ */}

<section className={sidebar ? "fixed top-0 z-[10000] left-0 w-full h-screen bg-black/50" : "fixed top-0 right-[-100%]"}>
  <div className=" p-4 shadow-lg">
    {/* Close Button */}
    <button 
      className="absolute top-4 right-[30%] text-2xl text-red-700"
      onClick={() => setsidebar(false)} // Ensure you have the setSidebar function in your component
    >
      <IoClose />
    </button>

    <Mobilesidebar />
  </div>
</section>

     {/* -----------------sidebar------------------ */}
     <span className="lg:flex hidden text-white"> $ To discover the world of gaming and winning, top up your account using any payment method!
       </span>
      </div>
      <div className="bg-white px-[10px]  lg:px-[50px] py-[20px]">
        <h2 className="text-lg font-semibold text-gray-800">ACCOUNT 1158267285</h2>
        <p className="text-gray-600 text-sm mb-3">Select payment method to top up your account:</p>

        {/* <div className="bg-gray-200 p-3 rounded-md flex items-start gap-3 mb-3">
          <FaExclamationCircle className="text-gray-600 text-xl mt-1" />
          <p className="text-gray-700 text-sm">
            আপনি জদি 3 ঘন্টার যতে আপনার অ্যাকাউন্টের ডিপোজিটের পরিমান না পেয়েই থাকে তাহলে অনুগরণ করে পরবর্তী তথ্য সহ ইমেইল 
            info-bn@melbet.com এ লিখুন: Player ID, Transaction ID, Client No, Agent Number, Time, Date, Amount, Transaction Screenshot from app
          </p>
        </div>

        <div className="bg-gray-200 p-3 rounded-md flex items-start gap-3">
          <FaExclamationCircle className="text-gray-600 text-xl mt-1" />
          <p className="text-gray-700 text-sm">
            TeamCash সিস্টেমের মাধ্যমে এক্জেন্স অপরেটর হিসাবে GGwiwiএ যোগ দিন! 
            খেলাড়িদের অনলাইন এবং উদ্দীশীয়ার পরিমাণ করে আপনার ব্যবসা শুরু করুন।
            <br />
            <strong>Telegram:</strong> <a href="https://t.me/TeamCashBANGLADESHB" className="text-blue-500">https://t.me/TeamCashBANGLADESHB</a>
            <br />
            <strong>Email:</strong> <a href="mailto:teamcash@melbet.com" className="text-blue-500">teamcash@melbet.com</a>
          </p>
        </div> */}
      </div>
    </div>
    <section>
    <div className="flex flex-col md:flex-row bg-gray-100 px-4 md:px-10 lg:px-[50px]">
  {/* Sidebar */}
  <div className="w-full md:w-1/4 bg-gray-200 p-4">
    <ul>
      {tabs.map((tab) => (
        <li
          key={tab.name}
          className={`p-3 cursor-pointer flex justify-between items-center ${
            selectedTab === tab.name ? "bg-green-700 text-white" : "hover:bg-gray-300"
          }`}
          onClick={() => setSelectedTab(tab.name)}
        >
          {tab.name}
          <span className="bg-gray-700 text-white px-2 rounded-full text-sm">
            {tab.count}
          </span>
        </li>
      ))}
    </ul>
  </div>

  {/* Payment Methods */}
  <div className="w-full md:w-3/4 p-4">
    <h2 className="text-lg font-bold mb-4">{selectedTab}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {(paymentMethods[selectedTab] || []).map((method) => (
        <div
          key={method.name}
          onClick={() => handleClick(method)}
          className="bg-white shadow flex flex-col items-center justify-center gap-2 text-center p-3 cursor-pointer hover:shadow-md"
        >
          <div className="w-full flex justify-center h-20 p-2">
            <img src={method.img} alt={method.name} className="w-[80px] h-[30px] sm:w-[100px] sm:h-[40px]" />
          </div>
          <div className="w-full p-2 bg-[#555555] py-2 flex justify-center items-center">
            <p className="text-sm font-semibold text-white">{method.name}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Nagad Payment Popup */}
    {showPopup && selectedMethod?.name === "Nagad Free" && (
      <form onSubmit={handleDeposit} className="fixed inset-0 flex z-[10000] items-center h-[100vh] overflow-y-auto justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 px-4">
        <Toaster />
        <div className="bg-white p-6 rounded-lg w-full max-w-[400px] shadow-lg relative">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={() => setShowPopup(false)}>
            <FaTimes />
          </button>
          <img src="https://melbet.org/paysystems/xpay/images/money/nagad_wallet.png" alt="Nagad" className="w-[60px] mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-center">Nagad Merchant <span className="text-gray-600">(নগদ পেমেন্ট ওয়ালেট নাম্বার)</span></h2>
          <p className="text-center text-sm text-gray-700 font-semibold flex items-center justify-center gap-2">
            01325424638 <FaCopy className="cursor-pointer text-gray-500" onClick={() => copyToClipboard("01325424638")} />
          </p>
          <p className="text-center text-sm text-gray-700 font-semibold flex items-center justify-center gap-2 mt-1">
            Mob Cash Agent: Sarkar Fashion <FaCopy className="cursor-pointer text-gray-500" onClick={() => copyToClipboard("Sarkar Fashion")} />
          </p>
          <p className="text-center text-sm text-gray-700 font-semibold flex items-center justify-center gap-2 mt-1">
            Mob Cash Agent ID:#45345dfsf <FaCopy className="cursor-pointer text-gray-500" onClick={() => copyToClipboard("Sarkar Fashion")} />
          </p>
          <p className="text-sm text-gray-600 mt-2">Amount (Min 200.00 BDT / Max 25,000.00 BDT):</p>
          <div className="grid grid-cols-3 gap-2 mb-3 mt-1">
            {predefinedAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`px-2 py-1 mt-1 border rounded-md ${amount === amt ? "bg-sky-600 text-white" : "bg-gray-200"}`}
                onClick={() => setAmount(amt)}
              >
                {amt}
              </button>
            ))}
          </div>
          <input type="text" placeholder="Your Nagad Wallet Number" className="w-full border p-2 mb-3" value={walletNumber} onChange={(e) => setWalletNumber(e.target.value)} />
          <input type="text" placeholder="Transaction ID" className="w-full border p-2 mb-3" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">Confirm</button>
          <div className="mt-4">
            {/* <iframe className="w-full h-40" src="https://www.youtube.com/embed/aCDAdyLKcyE?si=Lo6BICP002DGCxix" title="Nagad Deposit Tutorial" allowFullScreen></iframe> */}
          </div>
        </div>
      </form>
    )}

    {/* Bkash Payment Popup */}
    {showbkashpopup && selectedMethod?.name === "Bkash Free" && (
      <form onSubmit={handleDeposit} className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 px-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-[400px] shadow-lg relative">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={() => setshowbkashpopup(false)}>
            <FaTimes />
          </button>
          <img src="https://xxxbetgames.com/icons-xxx/payments/69.svg" alt="Bkash" className="w-[60px] mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-center">Bkash Merchant <span className="text-gray-600">(বিকাশ পেমেন্ট ওয়ালেট নাম্বার)</span></h2>
          <p className="text-center text-sm text-gray-700 font-semibold flex items-center justify-center gap-2">
            01325424638 <FaCopy className="cursor-pointer text-gray-500" onClick={() => copyToClipboard("01325424638")} />
          </p>
          <p className="text-center text-sm text-gray-700 font-semibold flex items-center justify-center gap-2 mt-1">
            Merchant name: Fahim Fashion <FaCopy className="cursor-pointer text-gray-500" onClick={() => copyToClipboard("Fahim Fashion")} />
          </p>
          <p className="text-sm text-gray-600 mt-2">Amount (Min 200.00 BDT / Max 25,000.00 BDT):</p>
          <div className="grid grid-cols-3 gap-2 mb-3 mt-1">
            {predefinedAmounts.map((amt) => (
              <div key={amt}  className={`px-2 py-1 border rounded-md ${amount === amt ? "bg-sky-600 text-white" : "bg-gray-200"}`} onClick={() => setAmount(amt)}>
                {amt}
              </div>
            ))}
          </div>
          <input type="text" placeholder="Your Bkash Wallet Number"onChange={(e)=>{setWalletNumber(e.target.value)}} className="w-full border p-2 mb-3" />
          <input type="text" placeholder="Transaction ID"onChange={(e)=>{setTransactionId(e.target.value)}} className="w-full border p-2 mb-3" />
          <button className="w-full bg-indigo-600 text-white py-2 rounded-md">Confirm</button>
          <div className="mt-4">
            {/* <iframe className="w-full h-40" src="https://www.youtube.com/embed/aCDAdyLKcyE?si=Lo6BICP002DGCxix" title="Bkash Deposit Tutorial" allowFullScreen></iframe> */}
          </div>
        </div>
      </form>
    )}
  </div>
</div>
    </section>
   </section>
  );
}
