import { createSlice } from "@reduxjs/toolkit";

const courseSlicer = createSlice({
    name: 'course',
    initialState: {
        loading: false,
    },
    reducers: {
        courseRequest(state) {
            return {loading : true}
        },
        courseSuccess(state, action) {
            return {
              loading : false,
              course : action.payload.course
            }
        },
        courseFail(state, action) {
            return{
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = courseSlicer

export const { courseRequest, courseSuccess, courseFail } = actions;
export default reducer;