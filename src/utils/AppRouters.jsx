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

import { jwtDecode } from "jwt-decode";
import SyllabusTable from "../pages/Admin/View syllabus/SyllabusTable";
import EditSyllabus from "../pages/Admin/View syllabus/EditSyllabus";
import TopicTable from "../pages/Admin/View Topics/TopicTable";
import EditTopic from "../pages/Admin/View Topics/EditTopic";
import EditCarousel from "../pages/Admin/Carousel/EditCarousel";
import UserDashboard from "../pages/User/UserDashboard";
import Sliders from "../pages/User/Home/Sliders";
const token = localStorage.getItem('token')
const decode = jwtDecode(token === null ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc' : token)
console.log()

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
        children: [
          {
            path: "edit/:id",
            element: <EditCarousel/>
          }
        ]
      },
      {
        path: "course",
        element: <>
         <Progress />
         <CourseTable/>
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
      {
        path: "syllabus",
        element: <>
        <Progress />
        <SyllabusTable/>
        </>,
        children: [
          {
            path: "edit/:id",
            element:<><EditSyllabus/> </>,
          },
          {
            path: "topic/:id",
            element:<><TopicTable/></>,
          },
          {
            path: "edit-topic/:id",
            element: <EditTopic/>
          }
        ]
      },      
    ]
  },

  {
    path: "/",
    exact: true,
    element: <>
    <UserDashboard/>
    </>,
    children: [
      {
        path: "",
        exact: true,
        element: <>
        <Sliders/>
        <Home/>
        </>
      },
      {
        path: "course",
        exact: true,
        element: (
          <>
            <Progress />
            <UserProductedRoute>
              <Outlet/>
            </UserProductedRoute>    
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
        path: "buy-course",
        exact: true,
        element: (
          <>
            <Progress />
            <Buying />
          </>
        ),
      },
      {
        path: "purchase",
        exact: true,
        element: (
          <>   
          <UserProductedRoute>
                 <Purchase /> 
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
    path: "/video/:id",
    exact: true,
    element: ( <UserProductedRoute> <VideoPlayer/></UserProductedRoute>),
  },
  {
    path: "/*",
    exact: true,
    element: <>{ decode.role === 'user' || token === null ? <Navigate to="/"/> : <Navigate to="/admin"/>}</>,
  },
];
export default AppRouters;
