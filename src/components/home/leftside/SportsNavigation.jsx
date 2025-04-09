import { useState } from "react";
import { FaFutbol, FaTableTennis, FaHockeyPuck, FaVolleyballBall, FaGamepad } from "react-icons/fa";
import { MdSportsCricket, MdSportsTennis, MdSportsBasketball } from "react-icons/md";
import { SiFifa } from "react-icons/si";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoIosPlay, IoIosFootball } from "react-icons/io";
import toast,{Toaster} from "react-hot-toast"
const sportsData = [
  {
    name: "Cricket",
    count: 21,
    icon: <MdSportsCricket />, 
    leagues: [
      { name: "West Indies Championship", count: 2, flag: "https://v3.traincdn.com/resized/size14/sfiles/logo_teams/3e89ac5cd0aaedcfbbb0af457bdf81dd.webp" },
      { name: "Boland League T20", count: 1, flag: "https://v3.traincdn.com/resized/size14/sfiles/logo_teams/5720f37a8939c078e93e0b01011fbb32.webp" },
      { name: "Chhattisgarh League", count: 1, flag: "https://v3.traincdn.com/resized/size14/sfiles/logo_teams/3e89ac5cd0aaedcfbbb0af457bdf81dd.webp" },
      { name: "Alcon GSB Unity Cup", count: 1, flag: "https://v3.traincdn.com/resized/size14/sfiles/logo_teams/5720f37a8939c078e93e0b01011fbb32.webp" }
    ]
  },
  { name: "Football", count: 53, icon: <FaFutbol /> },
  { name: "Basketball", count: 42, icon: <MdSportsBasketball /> },
  { name: "FIFA", count: 70, icon: <SiFifa /> },
  { name: "Table Tennis", count: 58, icon: <FaTableTennis /> },
  { name: "Tennis", count: 54, icon: <MdSportsTennis /> },
  { name: "Ice Hockey", count: 27, icon: <FaHockeyPuck /> },
  { name: "Volleyball", count: 13, icon: <FaVolleyballBall /> },
  { name: "Esports", count: 20, icon: <FaGamepad /> }
];

export default function SportsNavigation() {
  const [activeTab, setActiveTab] = useState("LIVE");
  const [openSport, setOpenSport] = useState(null);
  const [openLeague, setOpenLeague] = useState(null);
  const handlealert=()=>{
    alert("Please,Connect game api!")
  }
  return (
    <div className="w-full bg-white text-white mt-[8px]">
      <Toaster/>
      {/* Tabs Section */}
      <div className="flex border-b border-gray-700">
        <button
          className={`flex-1 py-[20px] lg:p-2 ${activeTab === "LIVE" ? "bg-gray-800" : "bg-gray-700"}`}
          onClick={() => setActiveTab("LIVE")}
        >
          <div className="h-full flex justify-center items-center gap-[10px]">
          <div className="w-[10px] h-[10px] rounded-full animate-pulse bg-green-500"></div>
          <span className="hidden sm:inline">LIVE</span>
          </div>
        </button>
        <button
          className={`hidden lg:block flex-1 p-2 ${activeTab === "SPORTS" ? "bg-gray-800" : "bg-gray-700"}`}
          onClick={() => setActiveTab("SPORTS")}
        >
          <span className="hidden sm:inline">SPORTS</span>
          <IoIosFootball className="sm:hidden" />
        </button>
      </div>

      {/* Summary Section */}
      <div className="px-[10px] py-[10px] lg:p-3 border-b text-gray-700 bg-white border-gray-200 flex justify-center lg:justify-between items-center">
        <span  className="hidden lg:block">ALL 907</span>
        <span className="text-gray-800 text-[14px] font-semibold">368</span>
      </div>

      {/* Top Section */}
      <div className="p-3 lg:block hidden text-gray-800">Top</div>

      {/* Sports List */}
      <div>
        {sportsData.map((sport, index) => (
          <div key={index} className="border-b border-gray-200 text-gray-800">
            <button
              className="flex justify-center lg:justify-between w-full p-3 items-center hover:bg-gray-200"
              onClick={() => setOpenSport(openSport === sport.name ? null : sport.name)}
            >
              <span className="flex items-center gap-2">
                {sport.icon}
                <span className="hidden sm:inline">{sport.name} ({sport.count})</span>
              </span>
              
              <span className="hidden lg:flex">{openSport === sport.name ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </button>

            {/* Leagues List (if open) */}
            {openSport === sport.name && sport.leagues && (
              <div>
                {sport.leagues.map((league, idx) => (
                  <div key={idx} className="border-b border-gray-200">
                    <button
                      className="flex justify-between w-full p-3 items-center hover:bg-gray-200"
                      onClick={() => setOpenLeague(openLeague === league.name ? null : league.name)}
                    >
                      <span className="flex items-center gap-2" onClick={handlealert}>
                        <img src={league.flag} alt="flag" className="w-4 h-4" />
                        <span className="hidden sm:inline">{league.name} ({league.count})</span>
                      </span>
                      {openLeague === league.name ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
