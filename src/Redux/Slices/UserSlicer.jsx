// CartSlicer.js
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false
    },
    reducers: {
        userRequest(state, action){
            return {
                loading: true
            }
        },
        userSuccess(state, action){
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        },
        userFail(state, action){
            return {
                ...state,
                loading: false
            }
        },
    }
})
const {actions, reducer} = UserSlice
export const {userRequest, userSuccess, userFail} = actions
export default reducer