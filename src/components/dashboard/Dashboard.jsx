import React from 'react'
import TopBarMenu from '../home/topBarMenu/TopBarMenu'
import Sidebar from './Sidebar'
import Footer from '../shared/Footer'
import PaymentMethods from './PaymentMethods'


const Dashboard = () => {
  return (
   <section className='w-full bg-[#1a1a1a]'>
        <PaymentMethods/>
   </section>
  )
}


export default Dashboard
