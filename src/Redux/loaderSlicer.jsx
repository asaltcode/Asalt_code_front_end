import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        onLoading: (state) => {
            return true;
        },
        endLoading: (state) => {
            return false;
        },
    }
});

export const { onLoading, endLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
