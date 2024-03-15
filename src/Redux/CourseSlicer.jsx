import { createSlice } from "@reduxjs/toolkit";

export const CourseSlicer = createSlice({
    name: 'Course',
    initialState: [],
    reducers: {
        setAllCourse : (state, action) => action.payload,
        courseById: (state, action) => {
            const course = state.find(course => course._id === action.payload);
            return course ? course : null; // Return null if course is not found
        },
    }
})

export const {setAllCourse, courseById} = CourseSlicer.actions
export default CourseSlicer.reducer