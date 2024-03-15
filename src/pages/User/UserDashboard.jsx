import React, { useEffect } from "react";
import Navication from "../../common/Navication";
import Footer from "../../common/Footer";
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <>
      <div className="user-container">
        <Navication />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
