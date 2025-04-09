import React from "react";
import { FaMedal } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineCalculate } from "react-icons/md";

const levels = [
  { level: "Copper", points: 0, rate: 100, cashback: "5%", color: "text-yellow-500" },
  { level: "Bronze", points: 300000, rate: 150, cashback: "6%", color: "text-blue-500" },
  { level: "Silver", points: 1000000, rate: 200, cashback: "7%", color: "text-gray-400" },
  { level: "Gold", points: 2000000, rate: 250, cashback: "8%", color: "text-yellow-400" },
  { level: "Ruby", points: 5000000, rate: 300, cashback: "9%", color: "text-red-500" },
  { level: "Sapphire", points: 15000000, rate: 350, cashback: "10%", color: "text-blue-300" },
  { level: "Diamond", points: 25000000, rate: 400, cashback: "11%", color: "text-cyan-300" },
  { level: "VIP", points: 75000000, rate: 450, cashback: "0.05% - 0.25%", color: "text-gray-500" }
];

const CircularProgressBar = ({ progress }) => {
  const radius = 30;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#f59e0b"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="transition-all duration-300"
      />
    </svg>
  );
};

const CashbackPage = () => {
  return (
    <div className="p-6 bg-gray-100 w-full  flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full p-6  flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Casino VIP Cashback</h2>
          <p className="text-gray-500">Find out about the MelBet casino loyalty levels here.</p>
        </div>
        
        {/* Progress Section */}
        <div className="flex items-center space-x-4">
          <CircularProgressBar progress={30} />
          <span className="text-sm text-gray-600">Experience: 30%</span>
        </div>
      </div>
      
      {/* Cashback Table & Calculation */}
      <div className="p-6 w-full flex flex-col items-center">
      <div className="w-full flex">
        <div className="w-3/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Level</th>
                <th className="p-3 border">Experience Pts</th>
                <th className="p-3 border">Experience Rate</th>
                <th className="p-3 border">Cashback</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level, index) => (
                <tr key={index} className="border">
                  <td className={`p-3 font-semibold ${level.color}`}>{level.name}</td>
                  <td className="p-3">{level.points.toLocaleString()}</td>
                  <td className="p-3">{level.rate}</td>
                  <td className="p-3 font-bold">{level.cashback}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-sm text-gray-600">
            *At all levels from Copper to Diamond, cashback is calculated based on lost bets. Once VIP, cashback is on all bets placed.
          </div>
        </div>
        <div className="w-2/5 px-6 bg-gray-100">
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="bg-gray-200 p-2 font-semibold">Type of Cashback</div>
            <div className="p-2 font-bold text-lg">Cashback BDT</div>
            <div className="bg-gray-100 p-2">Main account</div>
            <div className="p-2 font-semibold">Unsettled</div>
            <div className="mt-4 text-gray-600">Available from:</div>
            <button className="mt-2 w-full py-2 bg-sky-500 text-white rounded hover:bg-yellow-600">
              CALCULATE CASHBACK AMOUNT
            </button>
            <button className="mt-2 w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
              WITHDRAW
            </button>
            <div className="mt-4 text-sm text-blue-500 cursor-pointer underline">Terms and Conditions</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CashbackPage;
