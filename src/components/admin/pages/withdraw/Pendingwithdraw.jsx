import React, { useState, useEffect } from 'react';
import { FaRegCommentDots } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import moment from "moment";
import axios from "axios";
import Header from '../../common/Header';
import toast, { Toaster } from "react-hot-toast";

const Pendingwithdraw = () => {
  const base_url = "http://localhost:8080"; // Correct base URL
  const [withdrawals, setWithdrawals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all withdrawal requests
  const fetchWithdrawals = () => {
    axios.get(`${base_url}/admin/pending-withdrawal`)
      .then((res) => {
        setWithdrawals(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // Helper function to determine status background color
  const getStatusClasses = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return '';
    }
  };

  // Search filter
  const filteredWithdrawals = withdrawals.filter((transaction) =>
    transaction.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle withdrawal status change
  const handleChangeStatus = (id, newStatus) => {
    axios
      .put(`${base_url}/admin/withdrawals/${id}/status`, { status: newStatus })
      .then((res) => {
        setWithdrawals((prevWithdrawals) =>
          prevWithdrawals.map((transaction) =>
            transaction._id === id ? { ...transaction, status: newStatus } : transaction
          )
        );
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update status.");
      });
  };

  return (
    <div className="w-full font-bai overflow-y-auto">
      <Header />
      <Toaster />
      <section className="p-4">
        <div className="p-6">
          <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Withdrawals Request</h1>
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
                            <th className="p-3">ID</th>
                            <th className="p-3">Method</th>
                            <th className="p-3">Initiated</th>
                            <th className="p-">User</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3t">Change Status</th>
                            <th className="p-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {withdrawals.map((transaction, index) => (
                            <tr key={index} className="border-b text-center border-gray-300 even:bg-gray-50">
                                <td className='px-[10px] border-r-[1px] border-gray-400 text-[16px] font-semobold text-gray-700'>
                        {index+1}
                      </td>
                              <td className="p-3 border-r-[1px] border-gray-400">
                                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                                  {transaction.paymentMethod}
                                </span>
                                <div className="text-gray-500 text-sm">{transaction.orderId}</div>
                              </td>
                              <td className="p-3 text-gray-700 border-r-[1px] border-gray-400">
                                {moment(transaction.createdAt).format('MMMM Do YYYY, h:mm A')}
                              </td>
                              <td className="p-3 border-r-[1px] border-gray-400">
                                <span className="font-semibold text-gray-700">{transaction?.customer_name}</span>
                                <div className="text-blue-600 cursor-pointer hover:underline">
                                  {transaction?.customer_email}
                                </div>
                              </td>
                              <td className="p-3 border-r-[1px] border-gray-400">
                                <div className="text-gray-700">৳{transaction.amount}</div>
                              </td>
                              <td className="p-3 border-r-[1px] border-gray-400">
                                <span
                                  className={`px-2 py-1 rounded-md text-sm ${getStatusClasses(transaction.status)}`}
                                >
                                  {transaction.status}
                                </span>
                              </td>
                              <td className="p-3 border-r-[1px] border-gray-400">
                                <select
                                  value={transaction.status}
                                  onChange={(e) => handleChangeStatus(transaction._id, e.target.value)}
                                  className="border border-gray-300 text-gray-700 rounded-md p-2 disabled:opacity-50"
                                  disabled={transaction.status === "approved" || transaction.status === "rejected"}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </td>
                              <td className="p-3">
                                <NavLink to={`/withdrawals/details/${transaction._id}`}>
                                  <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition">
                                    <FaRegCommentDots /> Details
                                  </button>
                                </NavLink>
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

export default Pendingwithdraw;
