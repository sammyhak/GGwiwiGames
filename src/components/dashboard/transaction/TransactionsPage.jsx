import { useState, useEffect } from "react";
import axios from "axios";

const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState("Main account");
  const [transactions, setTransactions] = useState([]);
  const user_info = JSON.parse(localStorage.getItem("user"));
  const tabs = ["Main account", "Virtual account"];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/transactions/${user_info.email}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, [user_info.email]);

  return (
    <div className="w-full bg-gray-200 p-4">
      <div className="p-4">
        <h1 className="text-xl font-bold">Information about deposits, withdrawals and transfers of funds</h1>
        <p className="text-gray-600">Includes deposits, withdrawals and transfers of funds</p>
        <div className="mt-4 flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md cursor-pointer ${activeTab === tab ? "bg-black text-white" : "bg-gray-300 text-black"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="bg-[#FFB805] cursor-pointer text-white px-4 py-2 rounded-md">PAYMENT QUERIES</button>
        <button className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded-md">LOAD ARCHIVE</button>
      </div>
      <div className="bg-white mt-4 p-4 ">
        {transactions.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300  p-2">Type</th>
                <th className="border border-gray-300  p-2">Amount</th>
                <th className="border border-gray-300  p-2">Method</th>
                <th className="border border-gray-300  p-2">Wallet Number</th>
                <th className="border border-gray-300  p-2">Status</th>
                <th className="border border-gray-300  p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="text-center border">
                  <td className="border border-gray-300 p-2">{transaction.depositAmount ? "Deposit" : "Withdraw"}</td>
                  <td className="border border-gray-300  p-2">{transaction.depositAmount || transaction.amount} BDT</td>
                  <td className="border border-gray-300  p-2">{transaction.paymentMethod}</td>
                  <td className="border border-gray-300  p-2">{transaction.userWalletNumber || transaction.walletNumber}</td>
                  <td className={`border border-gray-300  p-2 ${transaction.status === "approved" ? "text-green-500" : "text-red-500"}`}>{transaction.status}</td>
                  <td className="border  border-gray-300  p-2">{transaction.createdAt?.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold">No transactions</h2>
            <p className="text-gray-600">Your monetary transactions will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
