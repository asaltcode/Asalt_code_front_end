import React, { useState } from "react";
// import "../assets/vendors/mdi/css/materialdesignicons.min.css"
// import "../assets/vendors/css/vendor.bundle.base.css"
// import "../assets/vendors/jvectormap/jquery-jvectormap.css"
// import "../assets/vendors/flag-icon-css/css/flag-icon.min.css"
// import "../assets/vendors/owl-carousel-2/owl.carousel.min.css"
// import "../assets/vendors/owl-carousel-2/owl.theme.default.min.css"
// import "../../../assets/css/style.css";
import "../../../assets/css/test.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "../Global/Topbar";
import Sidebar from "../Global/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sideToggle, setSideToggle] = useState("")
  const [activeSideToggle, setActiveSideToggle] = useState("")
  return (
    <>
      <div className={`dashboar_container ${sideToggle}`}>
        <div className="container-scroller">
          <Sidebar activeSideToggle={activeSideToggle} />
          <div className="container-fluid p-0 page-body-wrapper">
            <Topbar sideToggle={sideToggle} setSideToggle={setSideToggle} activeSideToggle={activeSideToggle} setActiveSideToggle={setActiveSideToggle} />
            <div className="main-panel">
              <div className="content-wrapper">
                <Outlet/>
              </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
