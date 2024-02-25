import React from "react";
const ApiRoutes = {
  SIGN_UP: {
    path: "/signup",
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
  LOG_IN: {
    path: "/login",
    authenticate: false,
  },
  FOR_GOT: {
    path: "/forgot",
    authenticate: false,
  },
  VERIFY_OTP: {
    path: "/otp-verify",
    authenticate: false,
  },
  CHANGE_PASSWORD: {
    path: "/change-password",
    authenticate: false,
  },
  USER_PRODUCT_ROUTES: {
    path: "/product",
    authenticate: true,
  },
  AdMIN_PRODUCT_ROUTES: {
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
  DEL_USER_BY_ID: {
    path : "/delete-user-by-id/",
    authenticate: true,
  },
  EDIT_USER: {
    path : "/edit-user/",
    authenticate: true,
  },
  ADD_CAROUSEL: {
    path: "/add-carousel",
    authenticate: true,
  },
  GET_CAROUSEL: {
    path: "/get-carousel",
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
  GET_COURSE: {
    path: "/get-course",
    authenticate: false,
  },
  ADD_COURSE: {
    path: "/add-course",
    authenticate: true,
  },
  GET_ALL_COURSE: {
    path: "/get-all-course",
    authenticate: true,
  },
  GET_COURSE_BY_ID: {
    path: "/get-course-by-id",
    authenticate: true,
  },
  EDIT_COURSE_BY_ID: {
    path: "/edit-course",
    authenticate: true,
  },
  DEL_COURSE: {
    path: "/del-course",
    authenticate: true,
  },
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
  ADD_TOPIC: {
    path: "/add-topic",
    authenticate: true,
  },
  GET_SYLLABUS_BY_COURSE_ID: {
    path: "/get-syllabus-by-course-id",
    authenticate: false,
  },

  VIDEO_UPLOAD: {
    path: "/upload-video",
    authenticate: false,
  },
};

export default ApiRoutes;