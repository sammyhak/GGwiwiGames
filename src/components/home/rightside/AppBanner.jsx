import React from "react";
import { FaAndroid, FaApple } from "react-icons/fa";


const AppBanner = () => {
  return (
    <div className="w-full bg-gray-100  mt-2 p-4 relative">
      {/* Tabs */}
      <div className="flex bg-gray-800 text-white ">
        <div className="flex-1 flex items-center justify-center py-2 bg-gray-700 rounded-tl-lg">
          <FaAndroid className="mr-2" /> Android
        </div>
        <div className="flex-1 flex items-center justify-center py-2 bg-gray-900  opacity-60">
          <FaApple className="mr-2" /> iOS
        </div>
      </div>
      
      {/* QR Code */}
      <div className="flex justify-center py-4">
        {/* <QRCode value="https://example.com/download" size={100} /> */}
      </div>

      {/* App Info */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-800">
          <span className="text-theme-color">MEL</span>BET
        </h2>
        <p className="text-sm text-gray-600">MOBILE APPLICATION</p>
      </div>

      {/* Download Button */}
      <div className="mt-4 flex justify-center">
        <button className="bg-theme-color text-black font-[500] py-2 px-4  flex items-center shadow">
          Free download
        </button>
      </div>
    </div>
  );
};

export default AppBanner;
