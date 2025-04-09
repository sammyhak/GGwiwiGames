import { useState,useEffect } from "react";
import { FaArrowLeft, FaEnvelope, FaBolt, FaLock, FaEye, FaPhone, FaUsers,FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import TopBarMenu from "../../../home/topBarMenu/TopBarMenu";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdInfo } from "react-icons/md";
import Footer from "../../../shared/Footer";
import { NavLink } from "react-router-dom";
import BottomNav from "../games/BottomNav";
import toast,{Toaster} from "react-hot-toast"
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
export default function Deposit() {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const user_info = JSON.parse(localStorage.getItem("user"));
    const [activeTab, setActiveTab] = useState("deposit");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [merchant_name,set_merchantname]=useState("BAYZID BOSTRALOY");
    const [agent_number,set_agentnumber]=useState("01901091730")
  const [amount, setAmount] = useState(500);
  const [walletNumber, setWalletNumber] = useState("");

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const closePopup = () => {
    setSelectedMethod(null);
    setAmount(500);
    setWalletNumber("");
  };

  const [user_details,set_userdetails]=useState([])
  const fetchUserData = async () => {
    try {
      console.log("hello")
       await axios.get(`http://localhost:8080/user/user-info/${user_info._id}`, {
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
  const handleConfirm = async () => {
    if (user_details.balance < amount) {
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Balance',
        text: 'You do not have enough balance to withdraw this amount.',
      });
      return;
    }
  
    const orderId = uuidv4().replace(/-/g, '').substring(0, 8); // Generate 8-letter orderId
  
    const postData = {
      orderId,
      paymentMethod: selectedMethod,
      amount,
      walletNumber,
      customer_name: user_info.surname,
      customer_email: user_info.email,
    };
  
    try {
      axios
        .post(`http://localhost:8080/user/withdraw`, postData)
        .then((res) => {
          console.log(res);
          fetchUserData();
          Swal.fire({
            icon: 'success',
            title: 'Withdrawal Requested',
            text: 'Your withdrawal request has been submitted successfully.',
          });
          closePopup();
          fetchUserData();

        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: 'Something went wrong. Please try again.',
          });
        });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit payment request.',
      });
      console.error(error);
    }
  };
// --------------deposit-method----------------
const [paymentMethod, setPaymentMethod] = useState(null);
const [depositAmount, setDepositAmount] = useState("");
const [userWalletNumber, setUserWalletNumber] = useState("");
const [transactionId, setTransactionId] = useState("");

const handlePaymentSelection = (method) => {
  setPaymentMethod(method);
  setShowPopup(true);
};


const handleDeposit = async () => {
  if (!depositAmount || !userWalletNumber || !transactionId) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all fields.',
    });
    return;
  }

  try {
    const response = await axios.post(`http://localhost:8080/user/create-deposit`, {
      paymentMethod,
      depositAmount,
      userWalletNumber,
      transactionId,
      merchant_name,
      agent_number,
      customer_name:user_info.surname,
      customer_email:user_info.email,
    });

    if (response.data.success) {
      setDepositAmount("");
      setTransactionId("");
      setUserWalletNumber("")
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Deposit request submitted successfully!',
      }).then(() => {
        setShowPopup(false);  // Close the popup if needed
      });
    } else {
      console.log(response.data);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:`${response.data.message}`,
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to submit deposit request.',
    });
  }
};

  return (
    <section className="bg-gray-100">
        <TopBarMenu/>
        <div className=" flex items-center justify-center  bg-[#E8E8E8]">
        <div className="w-full bg-white  overflow-hidden">
        <div className="bg-[#2E2E2E] text-white px-4 py-2 flex items-center ">
            <NavLink to="/">
            <div className="px-[10px] py-[8px] bg-[#4F4F4F] flex justify-center mr-[10px] items-center rounded-[5px] text-[20px]">
            <HiArrowNarrowLeft className="cursor-pointer "/>
          </div>
            </NavLink>
          <h2 className="text-[16px] font-[600]">Deposit</h2>
        </div>
        <div className="max-w-md mx-auto  px-[10px] rounded-lg py-[30px]">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 p-2 cursor-pointer ${activeTab === "deposit" ? "border-b-2 border-yellow-500 font-bold" : "text-gray-500"}`}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit
        </button>
        <button
          className={`flex-1 p-2 cursor-pointer ${activeTab === "withdrawal" ? "border-b-2 border-yellow-500 font-bold" : "text-gray-500"}`}
          onClick={() => setActiveTab("withdrawal")}
        >
          Withdrawal
        </button>
      </div>
      
      {activeTab === "deposit" && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">ACCOUNT 1176240369</h2>
          <div className="bg-green-600 text-white px-2 py-1 mt-2 inline-block rounded">Types of payment systems</div>
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p>
              If you do not receive the deposit amount in your account within 3 hours please write to email info-bn@melbet.com with next details: Player id, Transaction ID, Client no, Agent number, Time, Date, Amount, Transaction Screenshot from app
            </p>
          </div>
          
          <h3 className="mt-4 font-semibold">LOWEST LIMITS</h3>
          <div>
          <div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <button
          className="bg-gray-200 p-2 py-5 cursor-pointer rounded flex items-center flex-col gap-2 justify-center"
          onClick={() => handlePaymentSelection("Nagad Free")}
        >
          <img
            src="https://bd-melbet.org/paysystems/xpay/images/money/nagad_wallet.png"
            alt="Nagad Free"
            className="w-16"
          />
          <h2>Nagad Free</h2>
        </button>
        <button
          className="bg-gray-200 cursor-pointer p-2 py-5 rounded flex flex-col gap-2 items-center justify-center"
          onClick={() => handlePaymentSelection("Bkash Free")}
        >
          <img
            src="https://bd-melbet.org/paysystems/xpay/images/money/bkash_151.png"
            alt="bKash Free"
            className="w-24"
          />
          <h2>Bkash Free</h2>
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex z-50 items-center  justify-center bg-[rgba(0,0,0,0.4)] h-[100vh] overflow-y-auto bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute cursor-pointer top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            <img
              src={
                paymentMethod === "Nagad Free"
                  ? "https://bd-melbet.org/paysystems/xpay/images/money/nagad_wallet.png"
                  : "https://bd-melbet.org/paysystems/xpay/images/money/bkash_151.png"
              }
              alt={paymentMethod}
              className="mx-auto w-16"
            />
            {/* <div className="bg-green-600 text-white p-2 mt-2 rounded">
              Before making a request, please transfer funds within 10 minutes
              using the payment details specified below.
            </div> */}
            <p className="mt-2 font-semibold">
              {paymentMethod} Merchant:{agent_number}
            </p>
            <p className="text-gray-700">Merchant Name: {merchant_name}</p>
            <input
              type="text"
              placeholder="Amount (Min 200 BDT / Max 25,000 BDT)"
              className="w-full border p-2 mt-2"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[200, 500, 1000, 2500, 5000].map((amount) => (
                <button
                  key={amount}
                  className="border px-2 py-1 text-[14px] text-center"
                  onClick={() => setDepositAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Your Wallet Number"
              className="w-full border p-2 mt-2"
              value={userWalletNumber}
              onChange={(e) => setUserWalletNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Transaction ID (UTR, Reference No)"
              className="w-full border p-2 mt-2"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <p className="mt-2">How to make a deposit</p>
            <iframe
              className="w-full mt-2"
              height="180"
              src="https://www.youtube.com/embed/aCDAdyLKcyE?si=Lo6BICP002DGCxix"
              title="How to deposit"
            ></iframe>
            <button
              className="w-full bg-green-600 text-white p-2 mt-4 rounded"
              onClick={handleDeposit}
            >
              CONFIRM
            </button>
          </div>
        </div>
      )}
    </div>

      {selectedMethod && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-[300px] text-center">
            <h2 className="text-xl font-bold mb-3">{selectedMethod}</h2>
            <label className="block mb-2">Amount (Min 500 BDT / Max 25,000 BDT):</label>
            <input
              type="number"
              className="border p-2 w-full mb-3 border-gray-200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label className="block mb-2">Enter Wallet Number:</label>
            <input
              type="text"
              className="border-[1px] p-2 w-full mb-3 border-gray-200"
              value={walletNumber}
              onChange={(e) => setWalletNumber(e.target.value)}
            />
            <button
              className="bg-green-500 text-white p-2 rounded w-full"
              onClick={handleConfirm}
            >
              CONFIRM
            </button>
            <button
              className="text-red-500 mt-2 block w-full"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
        </div>
      )}
      
      {activeTab === "withdrawal" && (
         <div className="mt-4">
         <h2 className="text-lg font-semibold">ACCOUNT 1176240369</h2>
         <div className="bg-green-600 text-white px-2 py-1 mt-2 inline-block rounded">Types of payment systems</div>
         <div className="mt-4 p-3 bg-gray-100 rounded">
           <p>
             If you do not receive the deposit amount in your account within 3 hours please write to email info-bn@melbet.com with next details: Player id, Transaction ID, Client no, Agent number, Time, Date, Amount, Transaction Screenshot from app
           </p>
         </div>
         
         <h3 className="mt-4 font-semibold">LOWEST LIMITS</h3>
         <div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <button
          className="bg-gray-200 p-2 py-[20px] cursor-pointer rounded flex items-center flex-col gap-[10px] justify-center"
          onClick={() => handleSelect("Nagad Free")}
        >
          <img
            src="https://bd-melbet.org/paysystems/xpay/images/money/nagad_wallet.png"
            alt="Nagad Free"
            className="w-16"
          />
          <h2>Nagad Free</h2>
        </button>
        <button
          className="bg-gray-200 cursor-pointer p-2 py-[20px] rounded flex flex-col gap-[10px] items-center justify-center"
          onClick={() => handleSelect("Bkash Free")}
        >
          <img
            src="https://bd-melbet.org/paysystems/xpay/images/money/bkash_151.png"
            alt="bKash Free"
            className="w-[100px]"
          />
          <h2>Bkash Free</h2>
        </button>
      </div>

      {selectedMethod && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-[300px] text-center">
            <h2 className="text-xl font-bold mb-3">{selectedMethod}</h2>
            <label className="block mb-2">Amount (Min 500 BDT / Max 25,000 BDT):</label>
            <input
              type="number"
              className="border p-2 w-full mb-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label className="block mb-2">Enter Wallet Number:</label>
            <input
              type="text"
              className="border p-2 w-full mb-3"
              value={walletNumber}
              onChange={(e) => setWalletNumber(e.target.value)}
            />
            <button
              className="bg-green-500 text-white p-2 rounded w-full"
              onClick={handleConfirm}
            >
              CONFIRM
            </button>
            <button
              className="text-red-500 mt-2 block w-full"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
       </div>
      )}

    </div>

      </div>
    </div>
    <Footer/>
    </section>
  );
}
