import { createSlice } from "@reduxjs/toolkit";

const myCoursesSlicer = createSlice({
    name: 'paidCourses',
    initialState: {
        loading: false,
    },
    reducers: {
        paidCoursesRequest(state) {
            return {loading : true}
        },
        paidCoursesSuccess(state, action) {
            return {
              loading : false,
              myCourses : action.payload.courses
            }
        },
        paidCoursesFail(state, action) {
            return{
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = myCoursesSlicer

export const { paidCoursesRequest, paidCoursesSuccess, paidCoursesFail } = actions;
export default reducer;