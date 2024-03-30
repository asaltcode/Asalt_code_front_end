import React from "react";
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
import Home from "../pages/User/Home/Home";
import Course from "../pages/User/Course/Course";
import Progress from "../common/ScrollProgress";
import Buying from "../pages/User/BuyCourse/Buying";

//Producted Routers
import AdminProductedRoute from "../pages/Auth/AdminProductedRoute";
import UserProductedRoute from "../pages/Auth/UserProductedRoute";

// context components
import UserEmailContextCoponent from "../context/UserEmailContextCoponent";

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

import SyllabusTable from "../pages/Admin/View syllabus/SyllabusTable";
import EditSyllabus from "../pages/Admin/View syllabus/EditSyllabus";
import TopicTable from "../pages/Admin/View Topics/TopicTable";
import EditTopic from "../pages/Admin/View Topics/EditTopic";
import EditCarousel from "../pages/Admin/Carousel/EditCarousel";
import UserDashboard from "../pages/User/UserDashboard";
import Sliders from "../pages/User/Home/Sliders";

import ProtectedRoute from "../components/Router/ProtectedRoute";
import EditProfile from "../components/EditProfile";
import MyCourses from "../pages/User/MyCourses/MyCourses";

const AppRouters = [
  {
    path: "/admin",
    exact: true,
    element: (
      <>
       <Progress />
        {/* <AdminProductedRoute> */}
        <ProtectedRoute isAdmin={true} >
          <Dashboard />
        </ProtectedRoute>
        {/* </AdminProductedRoute> */}
      </>
    ),
    children: [
      {
        path: "",
        element: <>
         <Progress />
         {/* <ProtectedRoute isAdmin={true} >  */}
            <AllDatas/> 
            <UserTable/>
         {/* </ProtectedRoute > */}
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
              <Outlet/>          
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
        path: "my-courses",
        exact: true,
        element: <MyCourses/>
      },
      {
        path: "/profile/edit",
        exact: true,
        element: <EditProfile />,
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
          {/* <UserProductedRoute> */}
                <ProtectedRoute>
                 <Purchase /> 
                </ProtectedRoute>
        
          {/* </UserProductedRoute> */}
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
    path: "/password/reset/:token",
    exact: true,
    element: <ChangePassword />
  },
  {
    path: "/email-verify",
    exact: true,
    element: <EmailVerifyAnim />,
  },  
  {
    path: "/video/:id",
    exact: true,
    element: ( 
    // <UserProductedRoute> 
      <VideoPlayer/>
      // </UserProductedRoute>
      ),
  },
  {
    path: "/*",
    exact: true,
    element: <Navigate to="/"/>
  },
];
export default AppRouters;
