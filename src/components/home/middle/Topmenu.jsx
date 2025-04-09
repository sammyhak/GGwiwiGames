import { useState } from "react";
import { FaSearch, FaHome, FaTrophy, FaAngleRight } from "react-icons/fa";
import { MdSportsCricket, MdSportsBasketball, MdSportsTennis, MdSportsHockey, MdSportsVolleyball } from "react-icons/md";
import { FaFutbol, FaTableTennis, FaGamepad, FaBars } from "react-icons/fa";
import { GiSoccerBall, GiCardAceSpades } from "react-icons/gi";
import { RiSlideshow3Fill } from "react-icons/ri";
import { IoMdMore, IoMdArrowDropdown, IoMdSearch } from "react-icons/io";


const Topmenu = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [liveStreams, setLiveStreams] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Matches");
  const sports = [
    { name: "Cricket", icon: <MdSportsCricket />, leagues: ["India vs England", "ICC World Cup", "T10 League", "IPL", "Big Bash League", "County Championship"] },
    { name: "Football", icon: <FaFutbol />, leagues: ["UEFA Champions League", "La Liga", "Premier League", "Bundesliga", "Serie A", "Ligue 1"] },
    { name: "Basketball", icon: <MdSportsBasketball />, leagues: ["NBA", "EuroLeague", "WNBA", "FIBA World Cup"] },
    { name: "Tennis", icon: <MdSportsTennis />, leagues: ["Wimbledon", "US Open", "Australian Open", "French Open"] },
    { name: "Ice Hockey", icon: <MdSportsHockey />, leagues: ["NHL", "IIHF World Championship", "KHL"] },
    { name: "Volleyball", icon: <MdSportsVolleyball />, leagues: ["FIVB World League", "Olympics", "NCAA Volleyball"] },
    { name: "Esports", icon: <FaGamepad />, leagues: ["Dota 2 International", "CS:GO Major", "League of Legends Worlds", "Fortnite Championship"] },
    { name: "Alpine Skiing", icon: <RiSlideshow3Fill />, leagues: ["FIS World Cup", "Winter Olympics", "X Games"] },
    { name: "Baccarat", icon: <GiCardAceSpades />, leagues: ["World Baccarat Series", "High Roller Championship"] },
  ];
  
  
  return (
    <section>
      {/* Top Navigation Bar */}
      <nav className="bg-[#1e1e1e] text-white flex items-center px-4 py-2 text-sm">
        {/* Left Icons (Only Icons on Mobile) */}
        <div className="flex items-center gap-2">
          <FaHome className="text-lg cursor-pointer" />
          <FaAngleRight className="text-gray-400 hidden sm:inline" />
          <FaTrophy className="text-lg cursor-pointer" />
        </div>

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden sm:flex ml-4 gap-4">
          {["Matches", "Recommended", "Upcoming events", "1st period", "2nd period"].map((item) => (
            <span
              key={item}
              className={`cursor-pointer px-2 py-1 ${
                active === item ? "border-b-2 border-theme-color" : "text-gray-400"
              }`}
              onClick={() => setActive(item)}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Search Field (Visible on All Screens) */}
        <div className="ml-auto flex items-center bg-[#2e2e2e] px-2 py-1 rounded-md w-full max-w-[200px] sm:max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white px-2 text-sm w-full"
          />
          <FaSearch className="text-gray-400" />
        </div>

        {/* More Options (Hidden on Desktop, Visible on Mobile) */}
        <div className="sm:hidden flex ml-2">
          <FaBars className="text-lg cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="bg-gray-900 text-white p-2 absolute top-12 left-0 w-full z-50 sm:hidden">
          {["Matches", "Recommended", "Upcoming events", "1st period", "2nd period"].map((item) => (
            <div key={item} className="p-2 border-b border-gray-700 hover:bg-gray-800" onClick={() => setActive(item)}>
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Secondary Navigation (Icons Only on Mobile) */}
      <div className="bg-black text-white flex items-center p-2 space-x-4 text-sm relative">
        {/* Gamepad, More Options & Dropdown */}
        <div className="flex space-x-4">
          <FaGamepad className="text-lg cursor-pointer" />
          <IoMdMore className="text-lg cursor-pointer" />
          <IoMdArrowDropdown className="text-lg cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default Topmenu;
