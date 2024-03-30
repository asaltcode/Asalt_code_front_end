import { createSlice } from "@reduxjs/toolkit";

const coursesSlicer = createSlice({
    name: 'courses',
    initialState: {
        loading: false,
    },
    reducers: {
        coursesRequest(state) {
            return {...state, loading : true}
        },
        coursesSuccess(state, action) {
            return {
              loading : false,
              courses : action.payload.courses
            }
        },
        coursesFail(state, action) {
            return{
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = coursesSlicer

export const { coursesRequest, coursesSuccess, coursesFail } = actions;
export default reducer;
