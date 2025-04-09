import { useState } from "react";
import { FaLock, FaEnvelope, FaMobileAlt, FaQuestionCircle } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

export default function AccountSecurity() {
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showSecurityInput, setShowSecurityInput] = useState(false);
  
  return (
    <div className="bg-gray-100 w-full p-6 flex justify-center ">
      <div className="bg-white p-6 w-full">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-xl font-semibold">Account Security</h2>
          <span className="text-sm text-red-600 font-semibold">Not protected - 20%</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-green-100 p-4 rounded-lg flex items-center border border-gray-300 border-green-300">
            <FaLock className="text-green-600 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Change Password</h3>
              <p className="text-sm text-gray-600">Change your password every month</p>
            </div>
          </div>
          <div 
            className="bg-white p-4 rounded-lg border flex items-center border-gray-300 cursor-pointer shadow"
            onClick={() => setShowSecurityInput(!showSecurityInput)}
          >
            <FaQuestionCircle className="text-gray-600 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Security Question</h3>
              <p className="text-sm text-gray-600">Enter an answer that only you know</p>
              {showSecurityInput && (
                <input 
                  type="text" 
                  placeholder="Enter your security question" 
                  className="mt-2 p-2 w-full border rounded"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border flex border-gray-300 items-center shadow">
            <FaEnvelope className="text-gray-600 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Email Login Enabled</h3>
              <p className="text-sm text-gray-600">Use your ID 1161982815 to log in</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border flex border-gray-300 items-center shadow">
            <MdSecurity className="text-gray-600 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Protect your account in 2 steps</p>
              <button className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded">Enable</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border flex border-gray-300 items-center shadow">
            <FaMobileAlt className="text-gray-600 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Link Your Phone</h3>
              <p className="text-sm text-gray-600">Restore access to your account</p>
            </div>
          </div>
        </div>
        {/* <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Recent Sessions</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-700">Windows - 20/02/2025 (21:17) - 103.38.55.249</p>
            <IoIosClose className="text-2xl text-red-600 cursor-pointer" />
          </div>
          <button className="mt-3 bg-gray-800 text-white px-4 py-2 rounded">End All Sessions</button>
        </div> */}
      </div>
    </div>
  );
}
