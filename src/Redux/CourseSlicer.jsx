import { createSlice } from "@reduxjs/toolkit";

export const CourseSlicer = createSlice({
    name: 'Course',
    initialState: [],
    reducers: {
        setAllCourse : (state, action) => action.payload,
    }
})

export const {setAllCourse} = CourseSlicer.actions
export default CourseSlicer.reducer