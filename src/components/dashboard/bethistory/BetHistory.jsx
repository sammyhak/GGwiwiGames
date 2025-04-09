import { useState } from "react";
import { FaSearch, FaFilter, FaEnvelope, FaTrash } from "react-icons/fa";

const BetHistory = () => {
  const [activeTab, setActiveTab] = useState("On the website");
  const tabs = ["On the website", "Toto", "Baseline odds", "Unsettled bets", "Casino", "Autosale"];

  return (
    <div className="w-full bg-gray-200 p-4">
      {/* Tabs */}
      <div className="bg-white p-4 shadow-md flex space-x-6 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-gray-600 cursor-pointer ${activeTab === tab ? "border-b-2  border-yellow-500 font-semibold" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex mt-4">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">ACTIONS</h2>
          <div className="flex space-x-2 mb-4">
            <button className="p-2 bg-gray-200 rounded"><FaFilter /></button>
            <button className="p-2 bg-gray-200 rounded"><FaEnvelope /></button>
            <button className="p-2 bg-gray-200 rounded"><FaTrash /></button>
          </div>

          <label className="block mb-2 text-sm font-semibold">PERIOD</label>
          <input type="date" className="w-full p-2 border border-gray-200 rounded mb-2" />
          <input type="date" className="w-full p-2 border border-gray-200 rounded mb-4" />

          <label className="block mb-2 text-sm font-semibold">BET TYPE</label>
          <select className="w-full p-2 border border-gray-200 rounded mb-4">
            <option>All</option>
          </select>

          <label className="block mb-2 text-sm font-semibold">OTHER</label>
          <div className="space-y-2">
            {["Sports", "Live", "Settled", "Unsettled", "By settlement time", "Deleted"].map((item) => (
              <div key={item} className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full bg-sky-500 text-white p-2 rounded">APPLY</button>
        </div>

        {/* Main Content */}
        <div className="w-3/4 ml-4">
          <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
            <span className="text-gray-600 text-[17px]">Results</span>
            <div className="relative">
              <input type="text" placeholder="Search" className="border border-[#eee] rounded p-2 pl-8" />
              <FaSearch className="absolute left-2 top-3 text-gray-500" />
            </div>
          </div>

          <div className="bg-white p-4 mt-4 rounded-md shadow-md text-center">
            <h3 className="text-lg font-semibold">Bets not found</h3>
            <p className="text-gray-600 text-sm">No bets found in the selected period. Try adjusting your filters.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetHistory;
