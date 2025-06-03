import { useState, useEffect, useContext } from "react";
import { FaLock, FaEdit, FaExclamationCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";

export default function ProfilePage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const navigate = useNavigate();
  const { fetchUserData, userDetails } = useGlobalContext();
  // Get user info from localStorage
  const user_info = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 w-full">
      <div className="bg-white p-4">
        <h1 className="text-xl font-bold">Personal profile</h1>
        <p className="text-sm text-gray-600">
          Fill in the empty fields to take advantage of the enhanced features of
          the website.
        </p>

        <div className="bg-gray-200 p-2 rounded-md flex items-center justify-between mt-4">
          <button className="bg-[#FFB805] text-white px-4 py-2 rounded">
            Fill in profile
          </button>
          <span className="bg-gray-800 text-white px-2 py-1 rounded">43%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="font-semibold">Account</h2>
            <div className="mt-2">
              <label className="block text-sm">Account number</label>
              <div className="flex items-center bg-gray-200 p-2 rounded mt-1">
                <span>{user_info ? user_info._id : "Loading..."}</span>
                <FaLock className="ml-auto text-gray-500" />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm">Password</label>
              <div className="flex items-center bg-gray-200 p-2 rounded mt-1">
                <span>********</span>
                <FaEdit className="ml-auto text-gray-500 cursor-pointer" />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm">Registration date</label>
              <div className="flex items-center bg-gray-200 p-2 rounded mt-1">
                <span>{registrationDate}</span>
                <FaLock className="ml-auto text-gray-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="font-semibold">
              Contacts <FaExclamationCircle className="inline text-red-500" />
            </h2>
            <div className="mt-2">
              <label className="block text-sm">Phone</label>
              <div className="flex items-center bg-gray-200 p-2 rounded mt-1">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent w-full outline-none"
                  placeholder="Enter phone number"
                />
                <FaEdit className="ml-auto text-gray-500 cursor-pointer" />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm">Email</label>
              <div className="flex items-center bg-gray-200 p-2 rounded mt-1">
                <span>{email}</span>
                <FaLock className="ml-auto text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow mt-6">
          <h2 className="font-semibold">
            Personal info{" "}
            <FaExclamationCircle className="inline text-red-500" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              placeholder="Surname"
              defaultValue={userDetails?.surname || ""}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Document number"
              defaultValue={userDetails?.player_id || ""}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="First name"
              defaultValue={userDetails?.firstName || ""}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Document issue date"
              className="p-2 border rounded w-full"
            />
            <input type="date" className="p-2 border rounded w-full" />
            <input
              type="text"
              placeholder="Country"
              value={userDetails?.country || "Bangladesh"}
              disabled
              className="p-2 border rounded w-full bg-gray-200"
            />
            <input
              type="text"
              placeholder="Place of birth"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Permanent registered address"
              className="p-2 border rounded w-full"
            />
          </div>
          <button className="bg-[#FFB805] text-white px-6 py-2 rounded mt-4 w-full">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
