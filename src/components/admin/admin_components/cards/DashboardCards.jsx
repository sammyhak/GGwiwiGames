import { useState,useEffect} from 'react';
import { FaUsers, FaGamepad, FaDollarSign, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';

export default function DashboardCards() {
    const [pending_withdraw,set_pending_withdraw]=useState();
    const [approved_withdraw,set_approved_withdraw]=useState();
    const [rejected_withdraw,setrejected_withdraw]=useState();
    const [all_withdraw,set_allwithdraw]=useState();
    const base_url = "http://localhost:8080";
    // ----------------deposit--------------------------
    const [pending_deposit,set_pending_deposit]=useState();
    const [success_deposit,set_success_deposit]=useState();
    const [all_deposit,set_all_deposit]=useState();
    // -------------user---------------
    const [active_user,set_active_user]=useState();
    const [inactive_user,set_inactive_user]=useState();
    const [all_user,set_alluser]=useState();
    const [totalTodayAmount,settotalTodayAmount]=useState()
    // Fetch Pending Withdrawals
    const fetch_countation = () => {
      axios
        .get(`${base_url}/admin/all-coutation`)
        .then((res) => {
          set_pending_withdraw(res.data.pending_withdraw);
      set_approved_withdraw(res.data.approved_withdraw);
      set_allwithdraw(res.data.totalWithdrawAmount);
      // ---------------------deposit--------------- 
      set_pending_deposit(res.data.pending_deposit);
      set_success_deposit(res.data.success_deposit);
      set_all_deposit(res.data.totalDepositAmount)
      set_active_user(res.data.active_user);
      set_inactive_user(res.data.deactive_user);
      settotalTodayAmount(res.data.totalTodayAmount);
      set_alluser(res.data.total_user)
  
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      fetch_countation();
    }, []);
    const data = [
      { title: 'Total User', value: all_user, color: 'from-black to-red-600', icon: <FaUsers /> },
      { title: 'Total Club', value: 0, color: 'from-black to-red-600', icon: <FaUsers /> },
      { title: 'Total Affiliator', value: 0, color: 'from-black to-red-600', icon: <FaUsers /> },
      { title: 'Total Agent', value: 0, color: 'from-black to-red-600', icon: <FaUsers /> },
      { title: 'Mob Cash Agent', value: 0, color: 'from-black to-green-500', icon: <FaMoneyBillWave /> },
      { title: 'Total Games', value: 1, color: 'from-black to-green-500', icon: <FaGamepad /> },
      { title: 'Active Games', value: 1, color: 'from-black to-green-500', icon: <FaGamepad /> },
      { title: 'Dactived Games', value: 0, color: 'from-black to-green-500', icon: <FaGamepad /> },
      { title: 'Total Deposit', value: all_deposit, color: 'from-black to-blue-500', icon: <FaDollarSign /> },
      { title: 'Today Deposit', value: totalTodayAmount, color: 'from-black to-blue-500', icon: <FaDollarSign /> },
      { title: 'Total Withdraw', value: all_withdraw, color: 'from-black to-blue-500', icon: <FaDollarSign /> },
      { title: 'Today Withdraw', value: 0, color: 'from-black to-blue-500', icon: <FaDollarSign /> }
    ];
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-5 rounded-[6px] shadow-lg bg-gradient-to-r ${item.color} text-white transform transition duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <div>
            <p className="text-2xl font-extrabold">{item.value}</p>
            <p className="text-lg font-semibold text-yellow-400">{item.title}</p>
          </div>
          <div className="text-4xl opacity-80">{item.icon}</div>
        </div>
      ))}
    </div>
  );
}
