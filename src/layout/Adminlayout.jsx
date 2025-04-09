import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/common/Sidebar';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin'); // Ensure this key exists when logging in
    if (!isAdmin) {
      navigate('/'); // Redirect to login if not admin
    }
  }, [navigate]);

  return (
    <section>
      <section className="flex">
        <Sidebar />
        <Outlet /> {/* This renders the matched child route component */}
      </section>
    </section>
  );
};

export default AdminLayout;
