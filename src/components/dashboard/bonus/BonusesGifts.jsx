import React, { useState } from "react";

const BonusesGifts = () => {
  const [activeTab, setActiveTab] = useState("bonuses");

  return (
    <div className="bg-black text-white p-6 w-full min-h-screen">
      <h2 className="text-lg font-bold">BONUSES AND GIFTS</h2>
      <p className="text-sm text-gray-400 mb-4">
        The following bonuses and gifts are available to you. Don’t forget to open them before they expire!
      </p>
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter promo code"
          className="p-2 bg-black border border-gray-500 text-white w-64"
        />
        <button className="bg-[#A28C5D] text-black px-4 py-2">OK</button>
      </div>
      <div className="flex gap-4 text-lg font-bold">
        <button
          className={`pb-1 ${activeTab === "gifts" ? "border-b-2 border-[#A28C5D]" : "text-gray-500"}`}
          onClick={() => setActiveTab("gifts")}
        >
          GIFTS
        </button>
        <button
          className={`pb-1 ${activeTab === "bonuses" ? "border-b-2 border-[#A28C5D]" : "text-gray-500"}`}
          onClick={() => setActiveTab("bonuses")}
        >
          BONUSES
        </button>
      </div>
      <p className="text-sm text-gray-400 mt-4">
        The countdown starts from the moment a bonus is credited, not activated. 
        <span className="text-[#A28C5D] font-bold"> TERMS AND CONDITIONS</span>
      </p>
      <p className="mt-6 text-gray-500">Nothing found</p>
    </div>
  );
};

export default BonusesGifts;
