import React from "react";
const ApiRoutes = {
  // Auth Routes
  SIGN_UP: {
    path: "/auth/signup",
    authenticate: false,
  },
  LOG_IN: {
    path: "/auth/login",
    authenticate: false,
  },
  RE_SEND: {
    path: "/re-send",
    authenticate: false,
  },
  VERIFY: {
    path: "/verify",
    authenticate: false,
  },
  VERIFY_TRIGGER: {
    path: "/trigger",
    authenticate: false,
  },
  FOR_GOT: {
    path: "/auth/password/forgot",
    authenticate: false,
  },
  VERIFY_OTP: {
    path: "/otp-verify",
    authenticate: false,
  },
  RESET_PASSWORD: {
    path: "/auth/password/reset",
    authenticate: false,
  },
  PROFIL_UPDATE: {
    path: "/profile/update",
    authenticate: false,
  },


  // User And Admin Producte
  USER_PRODUCT_ROUTES: {
    path: "/product",
    authenticate: true,
  },
  ADMIN_PRODUCT_ROUTES: {
    path: "/admin-product",
    authenticate: true,
  },

  GET_ALL_USER: {
    path : "/get-all-user",
    authenticate: true,
  },
  GET_USER_BY_ID: {
    path : "/get-user-by-id/",
    authenticate: true,
  },

  GET_USER: {
    path : "/user",
    authenticate: true,
  },
  DEL_USER_BY_ID: {
    path : "/delete-user-by-id/",
    authenticate: true,
  },
  EDIT_USER: {
    path : "/edit-user/",
    authenticate: true,
  },

  // Add To cart related routers
  ADD_TO_CART: {
    path : "/add-to-cart",
    authenticate: true,
  },
  GET_ALL_CART: {
    path : "/get-all-cart",
    authenticate: true,
  },
  DEL_CART: {
    path : "/del-cart",
    authenticate: true,
  },
  DEL_ALL_CART: {
    path : "/del-all-cart",
    authenticate: true,
  },
  PAYMENT_CAPTURE: {
    path : "/payment-capture",
    authenticate: true,
  },
  
// Carousle Routers
  ADD_CAROUSEL: {
    path: "/add-carousel",
    authenticate: true,
  },
  GET_CAROUSEL: {
    path: "/get-carousel",
    authenticate: false,
  },
  GET_ALL_CAROUSEL: {
    path: "/get-all-carousel",
    authenticate: true,
  },
  GET_CAROUSEL_BY_ID: {
    path: "/get-carousel-by-id",
    authenticate: true,
  },
  DEL_CAROUSEL: {
    path: "/del-carousel",
    authenticate: true,
  },
  EDIT_CAROUSEL: {
    path: "/edit-carousel",
    authenticate: true,
  },

  // course Routers
  GET_COURSE: {
    path: "/courses",
    authenticate: false,
  },
  ADD_COURSE: {
    path: "/course/new",
    authenticate: true,
  },
  GET_ALL_COURSE: {
    path: "/admin/courses",
    authenticate: true,
  },
  GET_COURSE_BY_ID: {
    path: "/course",
    authenticate: true,
  },
  EDIT_COURSE_BY_ID: {
    path: "/course",
    authenticate: true,
  },
  DEL_COURSE: {
    path: "/course",
    authenticate: true,
  },

  // Syllabus Relate Routers
  ADD_SYLLABUS: {
    path: "/add-syllabus",
    authenticate: true,    
  },
  GET_ALL_SYLLABUS: {
    path: "/get-all-syllabus",
    authenticate: true,
  },
  GET_SYLLABUS_BY_ID: {
    path: "/get-syllabus-by-id",
    authenticate: true,
  },
  EDIT_SYLLABUS_BY_ID: {
    path: "/edit-syllabus",
    authenticate: true,
  },
  DEL_SYLLABUS: {
    path: "/del-syllabus",
    authenticate: true,
  },
  GET_SYLLABUS_BY_COURSE_ID: {
    path: "/syllabus/course",
    authenticate: true,
  },
  GET_PAID_SYLLABUS_BY_COURSE_ID: {
    path: "/paid/syllabus/course",
    authenticate: true,
  },
  GET_SYLLABUS_BY_COURSE_ID_ADMIN: {
    path: "/get-syllabus-by-course-id-admin",
    authenticate: true,
  },
  GET_SYLLABUS_BY_COURSE_ID_NORMAL: {
    path: "/get-syllabus-by-course-id-normal",
    authenticate: false,
  },
  // Course Topics
  ADD_TOPIC: {
    path: "/add-topic",
    authenticate: true,
  },
  GET_TOPIC_BY_SYLLABUS_ID: {
    path: "/get-topic-by-syllabus-id",
    authenticate: true,
  },
  GET_TOPIC_BY_ID: {
    path: "/get-topic-by-id",
    authenticate: true,
  },
  EDIT_TOPIC: {
    path: "/edit-topic",
    authenticate: true,
  },


  
  VIDEO_UPLOAD: {
    path: "/upload-video",
    authenticate: false,
  },

  // Course Access
  COURSE_ACCESS: {
    path: "/course-access",
    authenticate: true
  },
};

export default ApiRoutes;