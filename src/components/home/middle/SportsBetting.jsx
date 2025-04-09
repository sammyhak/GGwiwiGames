import { useState,useEffect } from "react";
import { FaBaseballBatBall } from "react-icons/fa6";
import { IoMdStats } from "react-icons/io";
import { GiTicket } from "react-icons/gi";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdSportsCricket } from "react-icons/md";
import { TiPinOutline } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import {motion} from "framer-motion"
import { PiMoneyFill } from "react-icons/pi";
import { FaChartColumn } from "react-icons/fa6";
import { FaChartGantt } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
const matches = [
  {
    league: "India vs England",
    teams: [
      { name: "India", flag: "https://images.pexels.com/photos/2091161/pexels-photo-2091161.jpeg?auto=compress&cs=tinysrgb&w=600", score: 356, liveScore: "18/0 (3.0)" },
      { name: "England", flag: "https://images.pexels.com/photos/2091161/pexels-photo-2091161.jpeg?auto=compress&cs=tinysrgb&w=600", liveScore: "7/0 (4.2)" }
    ],
    odds: [1.32, 50, 3.55],
    extraOdds: [1.32, null, 3.55],
    total: "+6"
  },
  {
    league: "Pakistan. Tri-Nation Series",
    teams: [
      { name: "Pakistan", flag: "https://images.pexels.com/photos/2091161/pexels-photo-2091161.jpeg?auto=compress&cs=tinysrgb&w=600", score: 0, liveScore: "302/4 (45.3)" },
      { name: "South Africa", flag: "https://images.pexels.com/photos/2091161/pexels-photo-2091161.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    odds: [3.21, 50, 1.37],
    extraOdds: [3.175, null, 1.355],
    total: "+93"
  },
  {
    league: "India. Legend 90 League",
    teams: [{ name: "India", flag: "https://images.pexels.com/photos/2091161/pexels-photo-2091161.jpeg?auto=compress&cs=tinysrgb&w=600" }],
    odds: [],
    extraOdds: [],
    total: "+6"
  }
];

export default function SportsBetting() {
  const tableData = [
    {
      headers: ['1', 'X', '2', '1', 'Team Wins', '2', 'O', 'Total', 'U', 'O', 'IT1', 'U', '+5'],
      values: [
        ['1.456', '50', '2.78'],
        ['1.445', '-', '2.768'],
        ['-', '-', '-'],
        ['-', '2', '265.5'],
        ['1.8', '+139'],
      ],
    },
  ];
  const [runs, setRuns] = useState(71);
  const [overs, setOvers] = useState(11.5);
  const [rightSideData, setRightSideData] = useState([
    1.06, 50, 10, 1.05, "-", 9.9, "-", "+69"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRuns((prev) => prev + Math.floor(Math.random() * 3));
      setOvers((prev) => (parseFloat(prev) + 0.1).toFixed(1));


      setRightSideData((prevData) =>
        prevData.map((value) =>
          typeof value === "number" ? (value + (Math.random() * 0.5 - 0.25)).toFixed(2) : value
        )
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full bg-gray-100 ">
 <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-theme-color" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/37345.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/37413.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/735245d261459b2aca82539a43fd3ebb.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-theme-color" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/735245d261459b2aca82539a43fd3ebb.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/cebd8ff4b64c014db4b786e575743d16.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row w-full h-full  rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 bg-gray-200 p-2 h-10 ">
          <MdSportsCricket className="text-lg" />
          <img
            className="w-4"
            src="https://v3.traincdn.com/sfiles/logo-champ/69389bb16b683e28ae87bf03d46b56be.webp"
            alt=""
          />
          <a href="#" className="text-xs font-medium hover:underline">
            India Vs New Zealand
          </a>
        </div>
        <div className="p-2 flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-3 ">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-[7px]">
          <TiPinOutline className="text-gray-500 mb-[10px]" />
          <FaRegStar className="text-orange-300" />
          </div>
            <div>
              <p className="text-sm font-medium flex justify-start items-center gap-[5px] mb-[10px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/22283.webp" alt="" />India</p>
              <p className="text-sm flex justify-center items-start gap-[5px]"><img className="w-[20px] h-[20px] rounded-full" src="https://v3.traincdn.com/resized/size16/sfiles/logo_teams/80b4c04fdc181563bdafac5fb62dbf86.webp" alt="" /> New Zealand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-[10px]">251/7</p>
            <motion.p
              className="text-sm font-medium"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {runs}/{overs}
            </motion.p>
          </div>
        </div>
        <div className="px-2 py-[10px] flex justify-start items-center gap-[12px]">
          <PiMoneyFill className="text-green-700"/>
          <FaChartColumn/>
          <FaChartGantt/>
          <FaChartLine/>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col bg-white ">
        <div className="flex justify-between bg-gray-200 p-2 h-10  text-xs font-medium">
          <span>1</span>
          <span>X</span>
          <span>2</span>
          <span>Team Wins</span>
          <span>2</span>
          <span>0</span>
          <span>Total</span>
          <span>U</span>
        </div>
        <div className="grid grid-cols-8 gap-1 p-2 items-center text-sm text-center">
          {rightSideData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-1 rounded py-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>



 
    </section>
  );
}