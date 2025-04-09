import { useState, useEffect } from "react";
import { FaArrowLeft, FaFileArchive } from "react-icons/fa";
import axios from "axios";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TopBarMenu from "../../../../home/topBarMenu/TopBarMenu";
import Footer from "../../../../shared/Footer";

export default function Transactionhistory() {
  const [activeTab, setActiveTab] = useState("main");
  const [transactions, setTransactions] = useState([]);
  const user_info = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://ggwiwigamesbe.onrender.com/user/transactions/${user_info.email}`, {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        console.log(response.data)
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, [user_info._id]);

  return (
    <section className="bg-gray-100">
      <TopBarMenu />
      <Toaster />
      <div className="flex items-center justify-center bg-[#E8E8E8]">
        <div className="w-full bg-white overflow-hidden">
          <div className="bg-[#2E2E2E] text-white px-4 py-2 flex items-center ">
            <NavLink to="/">
              <div className="px-[10px] py-[8px] bg-[#4F4F4F] flex justify-center mr-[10px] items-center rounded-[5px] text-[20px]">
                <HiArrowNarrowLeft className="cursor-pointer " />
              </div>
            </NavLink>
            <h2 className="text-[16px] font-[600]">Transaction history</h2>
          </div>
          <div className="w-full px-2 py-4 bg-gray-100 shadow-lg">
            {/* Tabs */}
            <div className="flex ">
              <button
                className={`flex-1 py-2 text-center  ${
                  activeTab === "main" ? "border-b-2  border-yellow-500" : ""
                }`}
                onClick={() => setActiveTab("main")}
              >
                Main account
              </button>
              <button
                className={`flex-1 py-2 text-center ${
                  activeTab === "virtual" ? "border-b-2 border-yellow-500" : ""
                }`}
                onClick={() => setActiveTab("virtual")}
              >
                Virtual account
              </button>
            </div>

            {/* Info Section */}
            <div className="p-4 bg-white rounded shadow-sm my-2">
              <p className="text-gray-500">
                Includes deposits, withdrawals and transfers of funds
              </p>
            </div>

            {/* Transactions Section */}
            <div className="p-4 bg-white rounded shadow-sm my-2">
              {transactions.length === 0 ? (
                <div className="text-center text-gray-500">
                  <p className="font-semibold">No transactions</p>
                  <p>Your monetary transactions will be displayed here</p>
                </div>
              ) : (
                <table className="w-full border border-gray-300 mt-2 overflow-y-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Type</th>
                      <th className="py-2 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="py-2 px-2 text-center text-[13px]">{tx.date}</td>
                        <td className="py-2 px-2 text-[14px] text-center">
                          <p>{tx.type}</p>
                          <p
  className={`text-[13px] px-[10px] py-[5px] mt-2 rounded-full 
    ${
      tx?.status === "approved"
        ? "bg-green-100 text-green-600"
        : tx?.status === "pending"
        ? "bg-yellow-100 text-yellow-600"
        : tx?.status === "rejected"
        ? "bg-red-100 text-red-600"
        : "bg-gray-100 text-gray-500"
    }`}
>
  {tx?.status}
</p>

                        </td>
                        <td className="py-2 px-4 text-center">৳{tx.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Load Archive Button */}
            <button
              className="w-full bg-yellow-500 text-white py-2 mt-2 flex items-center justify-center gap-2 rounded"
              onClick={() => setTransactions(transactions)} // Placeholder for archive functionality
            >
              <FaFileArchive /> LOAD ARCHIVE
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
