import React,{useState} from 'react';
import { FaCheck, FaEdit, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { RiComputerLine } from "react-icons/ri";
import { useEffect } from 'react';
import axios from "axios"
import moment from "moment"; // ✅ Import Moment.js
import Header from '../../common/Header';

const Activeuser = () => {
  function StatusSwitch({ status, onChange }) {
    const [isActive, setIsActive] = useState(status === "active");
  
    const handleToggle = () => {
      const newStatus = isActive ? "inactive" : "active";
      setIsActive(!isActive);
      onChange(newStatus);
    };
  
    return (
      <div className="flex items-center space-x-3 w-[130px]  ">
        {/* Status Text */}
        {/* Square Toggle Switch */}
        <label className="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isActive} onChange={handleToggle} />
          <div
            className={`w-12 h-6 bg-red-500 dark:bg-gray-700 rounded-[2px] flex items-center px-1 transition-all duration-300 cursor-pointer peer-checked:bg-green-500`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-[2px] shadow-md transform transition-all duration-300 ${
                isActive ? "translate-x-[20px]" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
              <span className={`text-sm font-medium ${isActive ? "text-[#071251]" : "text-red-500"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    );
  }
      const base_url = "http://localhost:8080";

      const [active_users,set_activeusers]=useState([]);
      const active_user_info=()=>{
          axios.get(`${base_url}/admin/active-users`)
          .then((res)=>{
            console.log(res)
            set_activeusers(res.data.data)
          }).catch((err)=>{
            console.log(err)
          })
      }
      useEffect(()=>{
        active_user_info();
      },[])
  const [searchQuery, setSearchQuery] = useState('');
  const filterusers = active_users.filter((user) =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className=" w-full font-bai h-[99vh] overflow-y-auto ">
      <Header/>
          <section className="p-4  ">
            <div className="p-6">
              <div className="w-full  p-4">
                <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Active Users</h1>

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
      <table className="w-full border-collapse shadow-xl  bg-white  overflow-hidden">
        <thead>
          <tr className="bg-[#071251] text-white text-center ">
          <th className="py-3 px-4">Id</th>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Country</th>
            <th className="py-3 px-4">Joined At</th>
            <th className="py-3 px-4">Balance</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {filterusers.map((user, index) => (
            <tr key={index} className=" text-center w-full even:bg-blue-100 border-gray-200">
              <td className='px-[10px] border-r-[1px] border-gray-400 text-[16px] font-semobold text-gray-700'>
                {index+1}
              </td>
              <td className="py-3 px-4 border-r-[1px] border-gray-400 text-gray-800">
                <p className='font-[500]'>{user?.phoneNumber}</p>
                <span className="text-gray-600">{user.email}</span>
              </td>
       
              <td className="py-3 px-4 border-r-[1px] border-gray-400 text-gray-800 font-[600]">Bangladesh</td>
              <td className="py-3 px-4 text-gray-800 border-r-[1px] border-gray-400">
                <span className='font-[600] text-[14px]'>{moment(user?.createdAt).format("MMMM Do YYYY, h:mm A")}</span>
                <br />
                <span className="text-gray-600">  {moment(user?.createdAt).fromNow()}
                </span>
              </td>
              <td className="py-3 px-4 border-r-[1px] border-gray-400 text-gray-800 font-[600] ">৳{user?.balance}</td>
              <td className="py-3 px-4 flex  space-x-2">
                <td className="py-3 flex items-center border-r-[1px] border-gray-400">
                <StatusSwitch
                      status={user.status}
                      onChange={(newStatus) => handleStatusChange(data, newStatus)}
                    />
                </td>
               <td className='flex justify-end w-full'>
               <NavLink to={`/admin-dashboard/user-details/${user._id}`}>
                <button className="flex jc items-center border-[1px] bg-[#071251] border-[#071251] hover:border-yellow-500 px-[10px] py-[4px] rounded-[5px] cursor-pointer text-white hover:text-black hover:bg-yellow-500 transition-all duration-150">
                  <RiComputerLine className="mr-1" /> Details
                </button>
                </NavLink>
               </td>
             
              </td> 
              {/* <td className="py-3 px-4 text-gray-800">{game.userSelect}</td>
              <td className="py-3 px-4 text-gray-800">
                {Array.isArray(game.result) ? game.result.join(", ") : game.result}
              </td>
              <td className="py-3 px-4 text-gray-800">{game.invest}</td>
              <td className="py-3 px-4">
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
              <td className="py-3 px-4 flex items-center space-x-2">
                <button className="flex items-center border-[1px] border-blue-500 px-[10px] py-[4px] rounded-[5px] text-blue-500 hover:text-blue-600">
                  <AiOutlineEdit className="mr-1" /> Edit
                </button>
                <button className="flex items-center text-red-500 hover:text-red-600 border border-red-600 px-[10px] py-[4px] rounded-[5px]">
                  <AiOutlineDelete className="mr-1" /> Disable
                </button>
              </td> */}
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

export default Activeuser;