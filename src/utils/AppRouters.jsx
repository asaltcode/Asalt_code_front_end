import React, {useContext, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
//Auth
import Signup from "../pages/Auth/Signup";
import SignupVerify from "../pages/Auth/SignupVerify";
import EmailVerifyAnim from "../animation/EmailVerifyAnim";
import Login from "../pages/Auth/Login";
import ForgePassword from "../pages/Auth/ForgetPassword";
import OTPVerify from "../pages/Auth/OTPVerify";
import ChangePassword from "../pages/Auth/ChangePassword";

//User Pages
import Navication from "../common/Navication";
import Home from "../pages/User/Home/Home";
import Course from "../pages/User/Course/Course";
import Progress from "../common/ScrollProgress";
import Buying from "../pages/User/BuyCourse/Buying";
import Footer from "../common/Footer";

//Producted Routers
import AdminProductedRoute from "../pages/Auth/AdminProductedRoute";
import UserProductedRoute from "../pages/Auth/UserProductedRoute";

// context components
import UserEmailContextCoponent from "../context/UserEmailContextCoponent";
import CartContextComponent from "../context/CartContextComponent";

//Admin Routes
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import UserTable from "../pages/Admin/Users List/UserTable";
import EditUser from "../pages/Admin/EditUser/EditUser";
import CarouselTable from "../pages/Admin/Carousel/CarouselTable";
import CourseTable from "../pages/Admin/View Course/CourseTable";
import EditCourse from "../pages/Admin/View Course/EditCourse";
import AllDatas from "../components/Admin/components/AllDatas";
import AddCourse from "../pages/Admin/View Course/AddCourse";
import AddSyllbus from "../pages/Admin/View Course/AddSyllbus";
import AddTopic from "../pages/Admin/View Course/AddTopic";
import VideoPlayer from "../pages/User/VideoPlay/VideoPlayer";
import CourseDisclosure from "../pages/User/Course/CourseDisclosure";
import Purchase from "../pages/User/Purchase/Purchase";
import OrderDetails from "../pages/User/Purchase/Order/OrderDetails";
import BillingDetails from "../pages/User/Purchase/Billing/BillingDetails";
import MakePayment from "../pages/User/Purchase/MakePayment/MakePayment";

const AppRouters = [
  {
    path: "/admin",
    exact: true,
    element: (
      <>
       <Progress />
        <AdminProductedRoute>
          <Dashboard />
        </AdminProductedRoute>
      </>
    ),
    children: [
      {
        path: "",
        element: <>
         <Progress />
        <AllDatas/>
        <UserTable/>
        <Outlet/>
        </>,
        children: [
          {
            path: "edit/:id",
            element: <EditUser/>
          },
        ]
      },
      {
        path: "carousel",
        element: <>
         <Progress />
        <CarouselTable/>
        </>,
        children: []
      },
      {
        path: "course",
        element: <>
         <Progress />
         <CourseTable/>
         <Outlet/>
        </>,
        children: [
          {
            path: "edit/:id",
            element: <EditCourse/>,
          },
        ]
      },
     
      {
        path: "add-course",
        element: <>
        <Progress />
        <AddCourse/>     
        <AddSyllbus/>  
        <AddTopic/>
        </>,
      },      
    ]
  },
  {
    path: "/signup",
    exact: true,
    element: <Signup />,
  },
  {
    path: "/verify",
    exact: true,
    element: <SignupVerify />,
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
  },
  {
    path: "/forget-password",
    exact: true,
    element: (
      <>
        <UserEmailContextCoponent>
          <ForgePassword />
        </UserEmailContextCoponent>
      </>
    ),
  },
  {
    path: "/otp-verify",
    exact: true,
    element: (
      <>
        <UserEmailContextCoponent>
          <OTPVerify />
        </UserEmailContextCoponent>
      </>
    )
  },
  {
    path: "/change-password",
    exact: true,
    element: (
      <>
        <UserEmailContextCoponent>
          <ChangePassword />
        </UserEmailContextCoponent>
      </>
    ),
  },
  {
    path: "/email-verify",
    exact: true,
    element: <EmailVerifyAnim />,
  },
  {
    path: "/home",
    exact: true,
    element: (
      <>
        <Progress />
        <Navication />       
           <Home />       
        <Footer />
      </>
    ),
  },
  {
    path: "/course",
    exact: true,
    element: (
      <>
        <Progress />
        <Navication />
        <UserProductedRoute>
          <Outlet/>
        </UserProductedRoute>
         <Footer />
      </>
    ),
    children: [
      {
        path: "",
        exact: true,
        element: (
          <>
            <Progress />            
            <Course />           
          </>
        ),
      },
      {
        path: "disclosure/:id",
        exact: true,
        element: (
          <>
            <Progress />            
            <CourseDisclosure/>            
          </>
        ),
      },
    ]
  },
  {
    path: "/purchase",
    exact: true,
    element: (
      <>   
      <UserProductedRoute>
          <CartContextComponent>
             <Purchase /> 
          </CartContextComponent>     
      </UserProductedRoute>
      </>
    ),
    children: [      
     { path: "",
      exact: true,
      element: (<OrderDetails/>),
    },
     { path: "billing-details",
      exact: true,
      element: (<BillingDetails  />),
    },
     { path: "make-payment",
      exact: true,
      element: (<MakePayment/>),
    },
    ]
  },
  {
    path: "/buy-course",
    exact: true,
    element: (
      <>
        <Progress />
        <Navication />
        <Buying />
        <Footer />
      </>
    ),
  },
  {
    path: "/video/:id",
    exact: true,
    element: (<VideoPlayer/>),
  },
  {
    path: "/*",
    exact: true,
    element: <Navigate to="/home"/>,
  },
];
export default AppRouters;
