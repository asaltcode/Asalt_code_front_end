import React, { useState } from "react";
import "../../../assets/css/test.css";
import Topbar from "../Global/Topbar";
import Sidebar from "../Global/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sideToggle, setSideToggle] = useState("")
  const [activeSideToggle, setActiveSideToggle] = useState("")
  const [profileShow, setProfileShow] = useState("") //topBar profile Drop Down 
  const [profileDropDown, setProfileDropDown] = useState("");//sideBar profile Drop Down 
  const handleToggles = () =>{
    profileDropDown === "show" ? setProfileDropDown("") : null
  }


  return (
    <>
      <div onClick={handleToggles} className={`dashboar_container ${sideToggle}`}>
        <div className="container-scroller">
          <Sidebar activeSideToggle={activeSideToggle} profileDropDown={profileDropDown} setProfileDropDown={setProfileDropDown} />
          <div className="container-fluid p-0 page-body-wrapper">
            <Topbar sideToggle={sideToggle} setSideToggle={setSideToggle} activeSideToggle={activeSideToggle} setActiveSideToggle={setActiveSideToggle} profileShow={profileShow} setProfileShow={setProfileDropDown} />
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
