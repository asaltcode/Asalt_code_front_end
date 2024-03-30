import { createSlice } from "@reduxjs/toolkit";

const adminCourseSlicer = createSlice({
  name: "courses",
  initialState: {
    loading: false,
  },
  reducers: {
    adminCoursesRequest(state) {
      return { loading: true };
    },
    adminCoursesSuccess(state, action) {
      return {
        loading: false,
        courses: action.payload.courses,
      };
    },
    adminCoursesFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    courseDelRequest(state) {
      return { loading: true };
    },
    courseDelSuccess(state, action) {
      const updatedCourse = state.courses.filter(
        (item) => item._id !== action.payload.id
      );
      return {
        loading: false,
        courses: updatedCourse,
      };
    },
    courseDelFail(state, action) {
      return {
        loading: false,
        courses: [...state.carts],
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = adminCourseSlicer;
export const {adminCoursesRequest, adminCoursesSuccess, adminCoursesFail, courseDelRequest, courseDelSuccess, courseDelFail} = actions
export default reducer;
