import { useState,useEffect} from "react";
import { IoClose } from "react-icons/io5";
import TopBarMenu from "../home/topBarMenu/TopBarMenu";
import BottomNav from "../mobile/mobile-home/games/BottomNav";
import Footer from "../shared/Footer";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import toast,{Toaster} from "react-hot-toast"
import { useSearchParams } from "react-router-dom";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion"; // For animations
import { FaGift } from "react-icons/fa"; // Gift icon
import axios from "axios";
import Confetti from "react-confetti";
import win_img from "../../assets/win_img.gif"

const Spingame = ({ setIsOpen }) => {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [betAmount, setBetAmount] = useState("");
  const [balance, setBalance] = useState(0.5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningColor, setWinningColor] = useState(null);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
    const user_info=JSON.parse(localStorage.getItem("user"))
    const { width, height } =useWindowSize(); 
    const [showWinPopup, setShowWinPopup] = useState(false);
    const [showLosePopup, setShowLosePopup] = useState(false);
    const [gameData, setGameData] = useState(null); // Store game data from API
     const [searchParams] = useSearchParams();
  const gameId = searchParams.get("id"); // Ensure 'gameId' is defined
  console.log(gameId)
    // Fetch game data from API
    const fetchGameData = async () => {
        console.log("hhshdahdasd")
        try {
            const response = await axios.get(`http://localhost:8080/admin/game/id/${gameId}`);
            setGameData(response.data);
            console.log("hi")
            console.log("Game Data:", response.data);
        } catch (error) {
            console.error("Error fetching game data:", error);
        }
    };

    useEffect(() => {
        fetchGameData();
    }, []);
    const [user_details,set_userdetails]=useState([])
    const user_data=()=>{
      axios.get(`http://localhost:8080/user/user-info/${user_info?._id}`)
      .then((res)=>{
        console.log(res.data)
        if(res.data){
          set_userdetails(res.data)
          console.log(res.data)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
    
    useEffect(()=>{
        user_data();
    },[])

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  // const handlePlay = () => {
  //   if (!betAmount || betAmount < 1 || betAmount > 100) {
  //     alert("Please enter a valid bet amount between $1 and $100.");
  //     return;
  //   }

  //   setIsSpinning(true);
  //   setTimeout(() => {
  //     const resultColor = Math.random() > 0.5 ? "blue" : "red";
  //     setWinningColor(resultColor);
  //     setIsSpinning(false);

  //     if (resultColor === selectedColor) {
  //       alert("You Win!");
  //       setBalance(balance + betAmount * 1.5);
  //     } else {
  //       alert("You Lose!");
  //       setBalance(balance - betAmount);
  //     }
  //   }, 3000);
  // };
  const handlePlay = () => {
    if (!betAmount || betAmount < gameData.minInvest || betAmount > gameData.maxInvest) {
        toast("Please enter a valid bet amount between ৳20 and ৳10000.", {
            icon: '⚠️',
            style: {
                background: 'white',
                color: 'green',
            },
        });
        return;
    }

    if (user_details.balance < betAmount) {
        toast("Insufficient Balance", {
            icon: '⚠️',
            style: {
                background: 'white',
                color: 'green',
            },
        });
        return;
    }

    axios.put(`http://localhost:8080/user/after-play-minus-balance`, { betAmount, player_id: user_details.player_id })
        .then((res) => {
            console.log(res);
            user_data();
        }).catch((err) => {
            console.log(err);
        });

    setIsSpinning(true);

    setTimeout(() => {
        const randomValue = Math.random();
        const winChance = gameData.winChance / 100;
        const loseChance = 1 - winChance;
        let resultColor;

        if (randomValue < winChance) {
            // Win condition
            resultColor = selectedColor;
        } else {
            // Lose condition
            resultColor = selectedColor === "blue" ? "red" : "blue";
        }

        setWinningColor(resultColor);
        setIsSpinning(false);

        if (resultColor === selectedColor) {
            toast("You Win!", { icon: "🎉" });
            const winAmount = betAmount * 1.5;
            setBalance(balance + winAmount);
            setShowWinPopup(true)

            axios.put(`http://localhost:8080/user/after-win-add-balance`, { winAmount, player_id: user_details.player_id })
                .then((res) => {
                    console.log(res);
                    user_data();
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            toast("You Lose!", { icon: "💀" });
            setShowLosePopup(true)
            setBalance(balance - betAmount);
        }
    }, 3000);
};

  return (
    <section className="bg-gray-800">
        <TopBarMenu/>
        <BottomNav/>
        <section className="w-full h-[300px] flex justify-center items-center bg-[url('https://script.viserlab.com/xaxino/demo/assets/images/frontend/breadcrumb/6305e6a01b29d1661331104.jpg')]">
              <div className="w-[40%]">
                <h1 className="text-[20px] mb-[10px] text-center text-white font-[600]">Play unibet Game</h1>
                <ul className="flex justify-center items-center gap-[8px] text-[13px] text-gray-200">
                    <li>Home</li>
                    <li><MdOutlineKeyboardDoubleArrowRight/></li>
                    <li>unibet Games</li>
                </ul>
              </div>
        </section>
        <Toaster/>
      <section>
       {/* Right Section (Game Display) */}
       <div className="flex-1 bg-black flex justify-center items-center relative px-[20px] py-[100px]">
      <div className="bg-[#0F0F0F]  rounded-lg flex lg:flex-row flex-col overflow-hidden relative border-[1px] border-gray-800 shadow-md">
        {/* Left Side: Spinning Wheel */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className={`relative w-60 h-60 border-4 border-gray-700 rounded-full flex items-center justify-center ${isSpinning ? "animate-spin" : ""}`}>
            <div className="w-full h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
            <div className="absolute top-0 w-4 h-4 bg-red-500 transform -translate-y-2"></div>
          </div>
        </div>

        {/* Right Side: Betting Panel */}
        <div className="flex-1 bg-[#071020] p-6 rounded-lg border border-gray-700 text-white">
        {
                            user_info ?                             <h2 className="text-lg font-bold mb-2">Current Balance: <span className="text-yellow-400">{user_details.balance?.toFixed(2)} ৳</span></h2>:                            <h2 className="text-[14px] font-[400] mb-[10px]"><span className="text-yellow-400">Please Login to play!</span></h2>
                        }  <input type="number" placeholder="Enter amount" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} className="w-full p-2 bg-transparent border border-gray-600 rounded-md text-white mb-4" />
          <p className="text-xs text-gray-400 mb-4">Minimum: ৳{gameData?.minInvest} BDT | Maximum: ৳{gameData?.maxInvest} BDT | Win Amount: <span className="text-yellow-400">150%</span></p>
          
          {/* Color Selection */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`relative p-2 rounded border ${selectedColor === "blue" ? "border-yellow-400" : "border-gray-600"}`} onClick={() => handleColorSelection("blue")}> 
              <img src="https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/moneyblack.png" alt="Blue" className="w-20 h-20" />
            </div>
            <div className={`relative p-2 rounded border ${selectedColor === "red" ? "border-yellow-400" : "border-gray-600"}`} onClick={() => handleColorSelection("red")}> 
              <img src="https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/money.png" alt="Red" className="w-20 h-20" />
            </div>
          </div>
          
          <button onClick={handlePlay} className="w-full bg-yellow-500 py-2 rounded text-black font-bold hover:bg-yellow-600">PLAY NOW</button>
        </div>
        
            {/* Win Popup */}
            {showWinPopup && (
                <>
                    <Confetti width={width} height={height} />
                    <div className="fixed inset-0 flex items-center px-[20px]  justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 backdrop-blur-md">
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-white bg-opacity-30 backdrop-blur-xl p-8  w-[80%] rounded-2xl shadow-xl text-center border border-white/20"
                        >
                            <h2 className="text-4xl font-extrabold text-black drop-shadow-lg">🎉 You Win! 🎉</h2>
                          <img className="block m-auto"  src={win_img} alt="" />
                            <button
                                onClick={() => setShowWinPopup(false)}
                                className="mt-6 px-6 py-3 rounded-full text-black font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-80 transition-all duration-300 shadow-lg"
                            >
                                Claim Reward
                            </button>
                        </motion.div>
                    </div>
                </>
            )}

            {/* Lose Popup with Unlucky Gift */}
            {showLosePopup && (
                <>
                    <div className="fixed inset-0 flex items-center z-[100] justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 backdrop-blur-md">
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-red-500 bg-opacity-40 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center border border-white/20"
                        >
                            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">😢 Unlucky! 😢</h2>
                            <p className="mt-2 text-lg text-white/90 drop-shadow-sm">
                                You lost this round... but here's a small gift!
                            </p>

                            {/* Animated Gift Box */}
                            <motion.div 
                                initial={{ y: -10 }}
                                animate={{ y: 10 }}
                                transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
                                className="mt-4 flex justify-center"
                            >
                                <FaGift className="text-6xl text-yellow-400 drop-shadow-lg" />
                            </motion.div>

                            <button
                                onClick={() => {
                                    setShowLosePopup(false);
                                    setBalance(balance + 5); // Optional small reward
                                }}
                                className="mt-6 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 hover:opacity-80 transition-all duration-300 shadow-lg"
                            >
                                Claim Unlucky Gift 🎁
                            </button>
                        </motion.div>
                    </div>
                </>
            )}
      </div>
      </div>
      </section>
        <Footer/>
    </section>
 
  );
};

export default Spingame;
