import React,{useState} from 'react';
import { FaCheck, FaEdit, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Header from '../../common/Header';
const Gamelogs = () => {
    const games = [
        {
          gameName: "Number Slot",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "3",
          result: ["6", "2", "7"],
          invest: "৳1.00 USD",
          winOrFail: "Loss"
        },
        {
          gameName: "Number Slot",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "5",
          result: ["6", "4", "5"],
          invest: "৳1.00 USD",
          winOrFail: "Win"
        },
        {
          gameName: "Card Finding",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "black",
          result: "red",
          invest: "৳1.00 USD",
          winOrFail: "Loss"
        },
        {
          gameName: "Card Finding",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "black",
          result: "red",
          invest: "৳1.00 USD",
          winOrFail: "Loss"
        },
        {
          gameName: "Card Finding",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "red",
          result: "black",
          invest: "৳1.00 USD",
          winOrFail: "Loss"
        },
        {
          gameName: "Dice Rolling",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "6",
          result: "4",
          invest: "৳1.00 USD",
          winOrFail: "Loss"
        },
        {
          gameName: "Dice Rolling",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "2",
          result: "4",
          invest: "৳1.00 USD",
          winOrFail: "Loss"
        },
        {
          gameName: "Dice Rolling",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "5",
          result: "2",
          invest: "৳1.00 USD",
          winOrFail: "Loss"
        },
        {
          gameName: "Dice Rolling",
          user: "Faisal Zaki",
          username: "@faisalzaki",
          userSelect: "4",
          result: "2",
          invest: "৳5.00 USD",
          winOrFail: "Loss"
        }
      ];
      

  const [searchQuery, setSearchQuery] = useState('');
  const filtrgames = games.filter((game) =>
    game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className=" w-full font-bai">
      <Header/>
          <section className="p-4  ">
            <div className="p-6">
              <div className="w-full  p-4">
                <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Game Logs</h1>

                  <div className="relative w-[30%]">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="overflow-x-auto border-l-[1px] border-r-[1px] border-b-[1px]  border-gray-500 ">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                  <tr className="bg-[#071251] text-center text-white ">
            <th className="py-3 px-4">Game Name</th>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">User Select</th>
            <th className="py-3 px-4">Result</th>
            <th className="py-3 px-4">Invest</th>
            <th className="py-3 px-4">Win or Fail</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtrgames.map((game, index) => (
            <tr key={index} className="border-b border-gray-500 text-center even:bg-gray-50">
              <td className="py-3 px-4 text-gray-800 border-r-[1px] border-gray-400 font-[600]">{game.gameName}</td>
              <td className="py-3 px-4 text-gray-800 border-r-[1px] border-gray-400">
                <strong>{game.user}</strong>
                <br />
                <span className="text-blue-600">{game.username}</span>
              </td>
              <td className="py-3 px-4 text-gray-800 border-r-[1px] border-gray-400">{game.userSelect}</td>
              <td className="py-3 px-4 text-gray-800 border-r-[1px] border-gray-400">
                {Array.isArray(game.result) ? game.result.join(", ") : game.result}
              </td>
              <td className="py-3 px-4 text-gray-800 border-r-[1px] border-gray-400">{game.invest}</td>
              <td className="py-3 px-4 border-r-[1px] border-gray-400">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    game.winOrFail === "Win"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {game.winOrFail}
                </span>
              </td>
              <td className="py-3 px-4 flex justify-center items-center space-x-2">
                {/* <button className="flex items-center border-[1px] border-blue-500 px-[10px] py-[4px] rounded-[5px] text-blue-500 hover:text-blue-600">
                  <AiOutlineEdit className="mr-1" /> Edit
                </button> */}
                <button className="flex items-center text-red-500 bg-red-100 hover:text-red-600 border border-red-600 px-[10px] py-[4px] rounded-[5px]">
                  <AiOutlineDelete className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
              </div>
            </div>
          </section>
    </div>
  );
};

export default Gamelogs;