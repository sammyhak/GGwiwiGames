import { useState } from "react";
import {
  FaFootballBall,
  FaTrophy,
  FaStar,
  FaGift,
  FaCrown,
  FaDice,
} from "react-icons/fa";
import { MdSportsEsports } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import IMAGES from "../../../assets/images";
import Glowcard from "../../shared/glowcard";

const featuredGames = [
  {
    name: "Case",
    img: IMAGES.case_battle,
    color: "bg-yellow-600 border-yellow-600",
  },
  { name: "Crash", img: IMAGES.crash, color: "bg-primary border-primary" },
  { name: "Roll", img: IMAGES.roll, color: "bg-yellow-500 border-yellow-500" },
  { name: "Dice", img: IMAGES.dice, color: "bg-primary border-primary" },
];

const Leftside = () => {
  const [activeTab, setActiveTab] = useState("games");

  return (
    <div className="w-full flex flex-col sticky top-0 z-10 bg-[#1a1a1a] text-white rounded-md shadow-md">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {featuredGames.map((game) => (
          <Glowcard color={game.color}>
            <div className="flex items-center justify-center w-full h-12">
              <div
                className={`${game.color} text-white bg-clip-text text-center uppercase `}
              >
                {game.name}
              </div>
            </div>
          </Glowcard>
        ))}
      </div>
      <div className="flex items-center w-full rounded-lg bg-white/10 mb-4 px-2">
        <FiSearch className="text-lg" />
        <input
          type="text"
          placeholder="Search for games"
          className="flex-1 p-3 bg-transparent outline-none"
        />
      </div>
      <div className="relative flex bg-white/10  rounded-lg items-center  gap-4 mb-4">
        <div
          className={`absolute inset-0  bg-primary rounded-lg transition-all duration-300`}
          style={{
            width: `calc(50%)`,
            transform: `translateX(${activeTab === "Games" ? "0" : "100%"})`,
          }}
        ></div>

        {["Games", "Favourites"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative z-10 py-2 px-4 flex-1 text-center transition-colors duration-300 text-white ${
              activeTab === tab ? "font-bold" : ""
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <Glowcard
        color="bg-primary border-primary"
        position="100% 0%"
        size="15rem"
      >
        <nav className="p-2 space-y-4">
          <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
            <MdSportsEsports /> Casino
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
            <FaFootballBall /> Soccer
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
            <FaDice /> New Games
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
            <FaTrophy /> Top Games
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
            <FaGift /> Promotions
          </div>
        </nav>
      </Glowcard>

      <nav className="p-2 space-y-4 mt-4">
        <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FaStar /> VIP Club
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FaCrown /> Lottery
        </div>
      </nav>
    </div>
  );
};

export default Leftside;
