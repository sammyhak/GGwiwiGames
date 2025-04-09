import { useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function BetSlip() {
  const [activeTab, setActiveTab] = useState("bet-slip");
  const handlealert=()=>{
    alert("Please,Connect game api!")
  }
  const user_info = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full mt-2 bg-gray-200 shadow-lg border border-gray-300">
      {/* Tabs */}
      <div className="flex bg-black text-white text-sm font-semibold">
        <button
          className={`flex-1 py-2 ${activeTab === "bet-slip" ? "bg-gray-700" : ""}`}
          onClick={() => setActiveTab("bet-slip")}
        >
          Bet slip
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === "my-bets" ? "bg-gray-700" : ""}`}
          onClick={() => setActiveTab("my-bets")}
        >
          My bets
        </button>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span>Your Bets</span>
          <FiSettings className="cursor-pointer" />
        </div>
        <div className="bg-white text-center text-xs h-[150px] text-gray-500 p-4 mt-2 border border-gray-300">
          Add events to the bet slip or enter a code to load events
        </div>
        {
          user_info ? "":        <button onClick={handlealert} className="w-full bg-theme-color text-black font-bold text-sm py-2 mt-3">
          REGISTRATION
        </button>
        }
        <div className="text-center text-xs text-black border-t border-gray-400 mt-3 pt-2 cursor-pointer">
          Save/load events
        </div>
      </div>
    </div>
  );
}
