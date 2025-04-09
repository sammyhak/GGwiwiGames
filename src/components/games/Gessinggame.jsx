import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import TopBarMenu from "../home/topBarMenu/TopBarMenu";
import BottomNav from "../mobile/mobile-home/games/BottomNav";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../shared/Footer";
import { useSearchParams } from "react-router-dom";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion"; // For animations
import { FaGift } from "react-icons/fa"; // Gift icon
import axios from "axios";
import Confetti from "react-confetti";
import win_img from "../../assets/win_img.gif";

const Gessinggame = ({ setIsOpen }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // Track selected color
  const [betAmount, setBetAmount] = useState("");
  const [balance, setBalance] = useState(0.5);
  const [result, setResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [runningColors, setRunningColors] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const user_info = JSON.parse(localStorage.getItem("user"));
  const { width, height } = useWindowSize();
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showLosePopup, setShowLosePopup] = useState(false);
  const [gameData, setGameData] = useState(null); // Store game data from API
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("id"); // Ensure 'gameId' is defined
  console.log(gameId);
  // Fetch game data from API
  const fetchGameData = async () => {
    console.log("hhshdahdasd");
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/game/id/${gameId}`
      );
      setGameData(response.data);
      console.log("hi");
      console.log("Game Data:", response.data);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);
  const [user_details, set_userdetails] = useState([]);
  const user_data = () => {
    axios
      .get(`http://localhost:8080/user/user-info/${user_info?._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          set_userdetails(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    user_data();
  }, []);
  const numbers = [1, 2, 3, 4, 5, 6, 7];
  const colors = ["bg-green-500", "bg-purple-500", "bg-red-500"];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newColors = numbers.map(
          () => colors[Math.floor(Math.random() * colors.length)]
        );
        setRunningColors(newColors);
      }, 200);

      return () => clearInterval(interval);
    } else {
      setRunningColors([]);
    }
  }, [isPlaying]);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleColorSelection = (color) => {
    // Handle color selection
    setSelectedColor(color);
  };

  // const handlePlay = () => {
  //     if (!betAmount || betAmount < 10 || betAmount > 100) {
  //         alert("Please enter a valid bet amount between $10 and $100.");
  //         return;
  //     }

  //     setIsPlaying(true);

  //     setTimeout(() => {
  //         const finalResult = Math.floor(Math.random() * 7) + 1;
  //         setResult(finalResult);
  //         setIsPlaying(false);

  //         if (selectedOption === finalResult) {
  //             alert("You Win!");
  //             setBalance(balance + betAmount * 1.05);
  //         } else {
  //             alert("You Lose!");
  //             setBalance(balance - betAmount);
  //         }
  //     }, 5000);
  // };
  const handlePlay = () => {
    if (
      !betAmount ||
      betAmount < gameData.minInvest ||
      betAmount > gameData.maxInvest
    ) {
      toast("Please enter a valid bet amount between ৳20 and ৳10000.", {
        icon: "⚠️",
        style: {
          background: "white",
          color: "green",
        },
      });
      return;
    }

    if (user_details.balance < betAmount) {
      toast("Insufficient Balance", {
        icon: "⚠️",
        style: {
          background: "white",
          color: "green",
        },
      });
      return;
    }

    axios
      .put(`http://localhost:8080/user/after-play-minus-balance`, {
        betAmount,
        player_id: user_details.player_id,
      })
      .then((res) => {
        console.log(res);
        user_data();
      })
      .catch((err) => {
        console.log(err);
      });

    setIsPlaying(true);

    setTimeout(() => {
      const randomValue = Math.random();
      const winChance = gameData.winChance / 100;
      let finalResult;

      if (randomValue < winChance) {
        // Win condition: Set result to selected option
        finalResult = selectedOption;
      } else {
        // Lose condition: Set result to a random number excluding the selected one
        const availableNumbers = [1, 2, 3, 4, 5, 6, 7].filter(
          (num) => num !== selectedOption
        );
        finalResult =
          availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      }

      setResult(finalResult);
      setIsPlaying(false);

      if (selectedOption === finalResult) {
        toast("You Win!", { icon: "🎉" });
        const winAmount = betAmount * 1.05;
        setBalance(balance + winAmount);
        setShowWinPopup(true);

        axios
          .put(`http://localhost:8080/user/after-win-add-balance`, {
            winAmount,
            player_id: user_details.player_id,
          })
          .then((res) => {
            console.log(res);
            user_data();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast("You Lose!", { icon: "💀" });
        setShowLosePopup(true);

        setBalance(balance - betAmount);
      }
    }, 5000);
  };

  return (
    <section className="bg-gray-800">
      <TopBarMenu />
      <BottomNav />
      <section className="w-full h-[300px] flex justify-center items-center bg-[url('https://script.viserlab.com/xaxino/demo/assets/images/frontend/breadcrumb/6305e6a01b29d1661331104.jpg')]">
        <div className="w-[40%]">
          <h1 className="text-[20px] mb-[10px] text-center text-white font-[600]">
            Play unibet Game
          </h1>
          <ul className="flex justify-center items-center gap-[8px] text-[13px] text-gray-200">
            <li>Home</li>
            <li>
              <MdOutlineKeyboardDoubleArrowRight />
            </li>
            <li>unibet Games</li>
          </ul>
        </div>
      </section>
      <Toaster />
      <section>
        <div className="flex-1 bg-black flex py-[100px] justify-center items-center relative px-[20px]">
          <div className="flex-1 bg-black flex justify-center items-center relative">
            <div className="flex lg:flex-row flex-col gap-8 w-full max-w-4xl">
              <div className="m-auto flex justify-center items-center flex-col border-[2px] border-gray-800 p-[30px]">
                <div className="flex justify-center gap-2 mb-4">
                  {numbers.map((num, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                        selectedOption === num
                          ? "border-yellow-400"
                          : "border-gray-600"
                      } ${
                        isPlaying
                          ? runningColors[index]
                          : num % 3 === 0
                          ? "bg-red-500"
                          : num % 2 === 0
                          ? "bg-green-500"
                          : "bg-purple-500"
                      } text-white font-bold ${
                        result === num
                          ? "scale-150 transition-transform duration-300"
                          : ""
                      }`}
                      onClick={() => handleOptionSelection(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                {user_info ? (
                  <h2 className="text-lg font-bold mb-2">
                    Current Balance:{" "}
                    <span className="text-yellow-400">
                      {user_details.balance?.toFixed(2)} ৳
                    </span>
                  </h2>
                ) : (
                  <h2 className="text-[14px] font-[400] mb-[10px]">
                    <span className="text-yellow-400">
                      Please Login to play!
                    </span>
                  </h2>
                )}
                {/* Color selection buttons */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => handleColorSelection("green")}
                    className={`px-6 py-2 rounded text-white font-bold ${
                      selectedColor === "green"
                        ? "bg-green-700"
                        : "bg-green-500"
                    }`}
                  >
                    GREEN
                  </button>
                  <button
                    onClick={() => handleColorSelection("violet")}
                    className={`px-6 py-2 rounded text-white font-bold ${
                      selectedColor === "violet"
                        ? "bg-purple-700"
                        : "bg-purple-500"
                    }`}
                  >
                    VIOLET
                  </button>
                  <button
                    onClick={() => handleColorSelection("red")}
                    className={`px-6 py-2 rounded text-white font-bold ${
                      selectedColor === "red" ? "bg-red-700" : "bg-red-500"
                    }`}
                  >
                    RED
                  </button>
                </div>

                {/* Display selected color */}
                <div className="mb-4 text-white font-bold">
                  {selectedColor && (
                    <h3>You selected {selectedColor.toUpperCase()}</h3>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div
                      key={num}
                      className={`w-12 h-12 flex items-center justify-center rounded text-white font-bold ${
                        num % 3 === 0
                          ? "bg-red-500"
                          : num % 2 === 0
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>

                <div className="relative mb-4 w-full max-w-xs">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="w-full p-2 pr-12 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 px-3 py-1 rounded text-black font-bold">
                    BDT
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-4">
                  Minimum: ৳{gameData?.minInvest} BDT | Maximum: ৳
                  {gameData?.maxInvest} BDT
                </p>

                <button
                  onClick={handlePlay}
                  className="w-full max-w-xs bg-yellow-500 py-2 rounded text-black font-bold hover:bg-yellow-600"
                >
                  PLAY NOW
                </button>

                <p className="text-center mt-2 text-gray-400 cursor-pointer hover:text-white">
                  Game Instruction ⓘ
                </p>
              </div>
            </div>
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
                  <h2 className="text-4xl font-extrabold text-black drop-shadow-lg">
                    🎉 You Win! 🎉
                  </h2>
                  <img className="block m-auto" src={win_img} alt="" />
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
                  <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
                    😢 Unlucky! 😢
                  </h2>
                  <p className="mt-2 text-lg text-white/90 drop-shadow-sm">
                    You lost this round... but here's a small gift!
                  </p>

                  {/* Animated Gift Box */}
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5,
                      repeatType: "reverse",
                    }}
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
      </section>
      <Footer />
    </section>
  );
};

export default Gessinggame;
