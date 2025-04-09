import { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BsPencil } from "react-icons/bs";
import { FaCoins, FaPercentage } from "react-icons/fa";
import { FaFutbol, FaHockeyPuck, FaBasketballBall, FaTableTennis, FaBaseballBall, FaVolleyballBall, FaFootballBall } from "react-icons/fa";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
export default function AccountSettings() {

  const [showBalance, setShowBalance] = useState(true);
  const [emailLogin, setEmailLogin] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [smsUpdates, setSmsUpdates] = useState(true);
  const [emailPreferences, setEmailPreferences] = useState({
    events: true,
    deposit: false,
    bets: false,
  });

  const [selectAll, setSelectAll] = useState(true);
  const sports = [
    { name: "Football", icon: <FaFutbol /> },
    { name: "Ice Hockey", icon: <FaHockeyPuck /> },
    { name: "Basketball", icon: <FaBasketballBall /> },
    { name: "Tennis", icon: <FaTableTennis /> },
    { name: "Baseball", icon: <FaBaseballBall /> },
    { name: "Volleyball", icon: <FaVolleyballBall /> },
    { name: "Rugby", icon: <FaFootballBall /> },
  ];
  return (
    <div className="p-6 bg-gray-200 w-full relative">
      {/* Log out button top left */}
      <div className="pb-[20px] flex justify-between items-center">
        <div>
            <h1>Account settings</h1>
            <p>Additional website features available</p>
        </div>
        <button className=" bg-gray-500 text-white px-4 py-2 rounded-md flex items-center">
        <BiLogOut className="mr-2" /> Log out
      </button>
      </div>
 
      <div className="flex gap-4  bg-gray-100 rounded-lg mt-[20px]">
      {/* Mailing List */}
      <div className="w-1/2 bg-white p-4 rounded-lg shadow">
        <h2 className="text-gray-700 font-semibold mb-3">Mailing list</h2>
        <div className="flex items-center gap-2 p-2 bg-gray-200 rounded">
          <button
            onClick={() => setSmsUpdates(!smsUpdates)}
            className={`w-10 h-5 flex items-center rounded-full transition ${
              smsUpdates ? "bg-sky-500" : "bg-gray-400"
            }`}
          >
            <span
              className={`w-4 h-4 bg-white rounded-full transform transition ${
                smsUpdates ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-gray-700 text-sm">
            Receive updates about special offers by SMS{" "}
            <a href="#" className="text-blue-600 underline">
              (Agreement)
            </a>
          </span>
        </div>

        <h3 className="mt-4 text-blue-600 text-sm">Send via email</h3>
        {[
          { key: "events", label: "News about events" },
          { key: "deposit", label: "Deposit notifications" },
          { key: "bets", label: "My bet outcomes" },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2 mt-2">
            <button
              onClick={() =>
                setEmailPreferences((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
              className={`w-10 h-5 flex items-center rounded-full transition ${
                emailPreferences[key] ? "bg-sky-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  emailPreferences[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-gray-700 text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* Accounts Section */}
      <div className="w-1/2 bg-white p-4 rounded-lg shadow">
        <h2 className="text-gray-700 font-semibold mb-3">Your accounts</h2>
        <div className="bg-gray-200 flex justify-between items-center p-3 rounded">
          <div className="flex items-center gap-2">
            <FaBangladeshiTakaSign className="text-sky-500" />
            <span className="text-gray-700 font-semibold">Main account (BDT)</span>
          </div>
          <button className="text-gray-500">
            <BsPencil />
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-2">№1166683851 | ৳0</p>

        <h3 className="mt-4 text-gray-700 font-semibold">Add account</h3>
        <div className="flex mt-2">
          <select className="w-full p-2 border rounded">
            <option>Select currency</option>
          </select>
          <button className="ml-2 bg-sky-500 text-white px-4 py-2 rounded">
            ADD
          </button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-[20px] mt-[20px]">
      {/* Account Settings */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="mt-2 space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="toggle" defaultChecked />
            <span>Show balance on top panel</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="toggle" defaultChecked />
            <span>Email login</span>
          </label>
        </div>
      </div>

      {/* Two-factor Authentication */}
      <div className="bg-white p-4 rounded shadow flex justify-between items-center ">
        <div>
          <h2 className="text-lg font-semibold">Two-factor authentication</h2>
          <p className="text-sm text-gray-500">Extra protection for your account</p>
        </div>
        <button className="bg-sky-500 text-white px-4 py-2 rounded">ENABLE</button>
      </div>

      {/* Promo Code Check */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Promo code check</h2>
        <p className="text-sm text-blue-500">Get an extra bonus!</p>
        <div className="mt-2 flex space-x-2">
          <input type="text" placeholder="Enter your code*" className="border p-2 w-full rounded" />
          <button className="bg-sky-500 text-white px-4 py-2 rounded">CHECK</button>
        </div>
        <p className="text-right text-sm text-gray-500 cursor-pointer">History</p>
      </div>

      {/* Cashback Section */}
      <div className="bg-white p-4 rounded shadow ">
        <h2 className="text-lg font-semibold">Cashback</h2>
        <div className="flex mt-2">
          <div className="bg-black text-white p-4 flex-1 flex items-center space-x-2">
            <FaCoins size={24} />
            <div>
              <p className="font-semibold">Promo points</p>
              <p className="text-sm">Based on placed bets</p>
            </div>
          </div>
          <div className="p-4 flex-1 flex items-center space-x-2 border border-gray-300">
            <FaPercentage size={24} />
            <div>
              <p className="font-semibold">Percentage</p>
              <p className="text-sm">Based on your account balance</p>
            </div>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500 mt-2">
          <span className="cursor-pointer">Terms and Conditions</span> | Points available: <strong>0</strong>
        </div>
      </div>
    </div>
    <div className="flex gap-4">
      {/* Left Panel */}
      <div className="w-1/2 bg-white shadow-lg border border-gray-300 p-4 rounded-lg">
        <h2 className="font-bold text-lg text-gray-700">Pre-match and Live sports</h2>
        <p className="text-sm text-gray-500">Show the following sports only</p>
        <div className="flex items-center gap-2 mt-2">
          <button className="px-4 py-1 bg-black text-white rounded">All</button>
          <button className="px-4 py-1 bg-gray-200 rounded">Esports</button>
        </div>
        <div className="flex items-center justify-between my-2 border border-gray-300 rounded p-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none"
          />
          <button onClick={() => setSelectAll(!selectAll)}>
            {selectAll ? <BsToggleOn size={24} /> : <BsToggleOff size={24} />}
          </button>
        </div>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {sports.map((sport, index) => (
            <div key={index} className="flex items-center justify-between p-3 border-b last:border-none">
              <div className="flex items-center gap-2 text-gray-700">
                {sport.icon} <span>{sport.name}</span>
              </div>
              <div className="flex gap-2 text-gray-700">
                <input type="checkbox" checked={selectAll} readOnly /> Sports
                <input type="checkbox" checked={selectAll} readOnly /> Live
              </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-sky-500 text-white py-2 mt-4 rounded">SAVE</button>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white flex justify-start gap-[30px] border border-gray-300 p-4 rounded-lg">
     <div className="">
     <h2 className="font-bold text-lg text-gray-700">Bonuses</h2>
        <div className="bg-gray-800 text-white p-4 mt-2">
          <h3 className="font-bold">Bonus for sports betting</h3>
          <p className="text-sm">Welcome bonus on your 1st deposit up to 12000 BDT</p>
        </div>
        <div className="border border-gray-300 p-4 mt-2">
          <h3 className="font-bold text-gray-700">Casino + Fast Games</h3>
          <p className="text-sm text-gray-500">Welcome package up to 446000 BDT + 220 FS</p>
        </div>
        <div className="border border-gray-300 p-4 mt-2">
          <h3 className="font-bold text-gray-700">Reject bonuses</h3>
          <p className="text-sm text-gray-500">Make your selection later</p>
        </div>
     </div>
        <p className="text-[17px] text-gray-500 mt-[30px]">
          • Bettors are entitled to participate in the company's other bonus offers, regardless of the chosen bonus type (i.e. casino or sport). <br />
          • By rejecting bonuses, you automatically reject all other promotions.
        </p>
      </div>
    </div>
    </div>
  );
}
