import React,{useState} from 'react';
import moment from "moment"
import {NavLink } from "react-router-dom"
import { FaRegCommentDots } from "react-icons/fa";
const DepositTable = ({deposits}) => {

  return (
    <div className="w-full font-sans p-4">
      <div className="bg-gradient-to-r from-black text-center mb-[10px] to-red-600 text-white p-4  text-xl font-semibold rounded-t-md">
        Today New Deposit
      </div>
      <div className='w-full overflow-x-auto '>
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-yellow-500 text-gray-800">
                    <th className="p-3 text-left">Method</th>
                    <th className="p-3 text-left">Initiated</th>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Change Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
  {deposits.map((transaction, index) => (
    <tr key={index} className="border-b border-gray-300 even:bg-gray-50">
      <td className="p-3">
        <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
          {transaction.paymentMethod}
        </span>
        <div className="text-gray-500 text-sm">{transaction.transactionId}</div>
      </td>
      <td className="p-3 text-gray-700">
        {moment(transaction.createdAt).format('MMMM Do YYYY, h:mm A')}
      </td>
      <td className="p-3">
        <span className="font-semibold text-gray-700">{transaction?.customer_name}</span>
        <div className="text-blue-600 cursor-pointer hover:underline">
          {transaction?.customer_email}
        </div>
      </td>
      <td className="p-3">
        <div className="text-gray-700">৳{transaction.depositAmount}</div>
      </td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-md text-sm
            ${transaction.status === "approved" ? "bg-green-100 text-green-600" : ""}
            ${transaction.status === "rejected" ? "bg-red-100 text-red-600" : ""}
            ${transaction.status === "pending" ? "bg-yellow-100 text-yellow-600" : ""}
          `}
        >
          {transaction.status}
        </span>
      </td>
      <td className="p-3">
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
        <NavLink to={`/deposits/pending-deposit-details/${transaction._id}`}>
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
  );
};

export default DepositTable;