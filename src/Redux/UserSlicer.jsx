// CartSlicer.js
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        saveUser: (state, action) => action.payload,
    }
})

export const {saveUser} = UserSlice.actions
export default UserSlice.reducer