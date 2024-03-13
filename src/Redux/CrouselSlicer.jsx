import { createSlice } from "@reduxjs/toolkit";

export const CrouselSlicer = createSlice({
    name: 'Crousel',
    initialState: [],
    reducers: {
        saveCrousel : (state, action) => action.payload,
    }
})

export const {saveCrousel} = CrouselSlicer.actions
export default CrouselSlicer.reducer