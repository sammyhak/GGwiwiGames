import React from "react";
import { FaDollarSign, FaComments, FaHeadset } from "react-icons/fa";

const SupportCenter = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <h1 className="text-2xl font-bold">Support Center</h1>
      <p className="text-gray-600">For all your website queries</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Payment Queries */}
        <div className="bg-white p-6 shadow-md text-center rounded-md flex flex-col justify-between h-full">
          <div>
            <FaDollarSign className="text-4xl mx-auto text-gray-700" />
            <h2 className="font-bold mt-4">Payment queries</h2>
            <p className="text-gray-600">Make a query or view query history</p>
          </div>
          <button className="mt-4 bg-sky-500 text-white px-4 py-2 rounded w-full">PAYMENT QUERIES</button>
        </div>

        {/* Online Consultant */}
        <div className="bg-white p-6 shadow-md text-center rounded-md flex flex-col justify-between h-full">
          <div>
            <FaComments className="text-4xl mx-auto text-gray-700" />
            <h2 className="font-bold mt-4">Online consultant</h2>
            <p className="text-gray-600">Ask any questions directly in the chat</p>
          </div>
          <button className="mt-4 bg-sky-500 text-white px-4 py-2 rounded w-full">WRITE A MESSAGE</button>
        </div>

        {/* Callback */}
        <div className="bg-white p-6 shadow-md rounded-md flex flex-col justify-between h-full">
          <div>
            <FaHeadset className="text-4xl mx-auto text-gray-700" />
            <h2 className="font-bold mt-4 text-center">Callback</h2>
            <p className="text-gray-600 text-center">Please complete a request and an operator will get back to you shortly</p>
            <input type="text" placeholder="Your phone number" className="mt-4 w-full p-2 border rounded" />
            <textarea placeholder="Please describe the issue" className="mt-4 w-full p-2 border rounded"></textarea>
            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">Consent to process personal information</span>
            </div>
          </div>
          <div>
            <button className="mt-4 bg-sky-500 text-white px-4 py-2 rounded w-full">ORDER A CALLBACK</button>
            <button className="mt-2 bg-gray-300 text-black px-4 py-2 rounded w-full">REQUEST HISTORY</button>
          </div>
        </div>

        {/* Customer Support Query */}
        <div className="bg-white p-6 shadow-md rounded-md flex flex-col justify-between h-full">
          <div>
            <h2 className="font-bold">Customer Support query</h2>
            <input type="text" placeholder="First name" className="mt-4 w-full p-2 border rounded" />
            <input type="email" placeholder="E-mail" className="mt-4 w-full p-2 border rounded" />
            <textarea placeholder="Message" className="mt-4 w-full p-2 border rounded"></textarea>
          </div>
          <div>
            <button className="mt-4 bg-sky-500 text-white px-4 py-2 rounded w-full">SEND</button>
            <button className="mt-2 bg-gray-300 text-black px-4 py-2 rounded w-full">CLEAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
