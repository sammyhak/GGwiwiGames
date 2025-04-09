import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TopBarMenu from '../components/home/topBarMenu/TopBarMenu';
import Footer from '../components/shared/Footer';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user'); // Ensure this key exists when logging in
    if (!user) {
      navigate('/'); // Redirect to login if no user is found
    }
  }, [navigate]);

  return (
    <section className='w-full bg-[#1a1a1a]'>
      <TopBarMenu />
      <section className='flex'>
        <Sidebar />
        <Outlet /> {/* This renders the matched child route component */}
      </section>
      <Footer />
    </section>
  );
};

export default DashboardLayout;
