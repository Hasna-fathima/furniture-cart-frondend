import React from 'react';
import UserHeader from '../Components/UserHeader';
import { Outlet } from 'react-router-dom';
// import Footer from '../Components/Footer';

function UserLayout() {
  return (
    <div className='container'>
      <UserHeader />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default UserLayout;

