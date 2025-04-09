import { useState } from "react";

const PaymentQueries = () => {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="bg-gray-100 w-full p-4">
      <div className="bg-gray-300 p-4 rounded-md">
        <h1 className="text-lg font-bold">Payment queries</h1>
        <p className="text-sm text-gray-600">
          Your deposit, withdrawal and transfer queries
        </p>
      </div>

      <div className="bg-white mt-4 p-4 rounded-md shadow-md">
        <div className="flex">
          <button
            className={`py-2 px-4 cursor-pointer focus:outline-none ${
              activeTab === "Active" ? "border-b-2 border-yellow-500 font-bold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Active")}
          >
            Active
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "Inactive" ? "border-b-2 border-yellow-500 font-bold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Inactive")}
          >
            Inactive
          </button>
        </div>

        <div className="p-6 text-center text-gray-600">
          {activeTab === "Active" ? (
            <div>
              <h2 className="font-bold text-lg text-gray-800">No payment queries</h2>
              <p>You have no active payment queries</p>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-lg text-gray-800">No inactive payment queries</h2>
              <p>You have no inactive payment queries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentQueries;
