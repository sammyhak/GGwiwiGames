import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {

// ----------------------user-details---------------------------
 // Get user info from localStorage
 const storedUser = JSON.parse(localStorage.getItem("user"));
  
 const [userDetails, setUserDetails] = useState(null);
 const [phone, setPhone] = useState("Not available");
 const [email, setEmail] = useState("Not available");
 const [registrationDate, setRegistrationDate] = useState("Not available");

 // Fetch user data
 const fetchUserData = async () => {
   if (!storedUser?._id) return;
   
   try {
     const response = await axios.get(
       `https://ggwiwigamesbe.onrender.com/user/user-info/${storedUser._id}`
     );
     console.log(response.data)
     setUserDetails(response.data);
     setPhone(response.data.phoneNumber || "Not available");
     setEmail(response.data.email || "Not available");
     setRegistrationDate(new Date(response.data.createdAt).toLocaleDateString() || "Not available");
   } catch (error) {
     console.error("Error fetching user data:", error.response?.data || error.message);
   }
 };

// ----------------------user-details---------------------------

  return (
    <GlobalContext.Provider value={{userDetails,fetchUserData}}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook to use the context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
