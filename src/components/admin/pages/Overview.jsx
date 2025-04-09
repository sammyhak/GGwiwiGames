import React,{useState,useEffect} from "react";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../common/Header";
import DashboardCards from "../admin_components/cards/DashboardCards";
import DepositTable from "../admin_components/table/DepositTable";
import axios from "axios";
import Withdrawtable from "../admin_components/table/Withdrawtable";
const Overview = () => {
	  const base_url = "http://localhost:8080"; // Correct base URL
	  const [pending_deposit, set_pending_deposit] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

	
	  // Fetch all withdrawal requests
	  const fetchWithdrawals = () => {
		axios.get(`${base_url}/admin/all-withdrawals`)
		  .then((res) => {
			setWithdrawals(res.data.data);
			console.log(res.data);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  };
	
	  const pending_deposit_info = () => {
		axios.get(`${base_url}/admin/deposits`)
		.then((res) => {
		  set_pending_deposit(res.data);
		  console.log(res.data);
		})
		.catch((err) => {
		  console.log(err);
		});
	  };
	
	  useEffect(() => {
		pending_deposit_info();
		fetchWithdrawals();
	  }, []);
	return (
		<div className='w-full xl:w-[82%] overflow-auto h-screen relative z-10 font-bai overflow-y-auto'>
			<Header title='Overview' />
            <section className="">
				<DashboardCards/>
				<DepositTable deposits={pending_deposit}/>
				<Withdrawtable withdrawals={withdrawals}/>
			</section>
		</div>
	);
};
export default Overview;
