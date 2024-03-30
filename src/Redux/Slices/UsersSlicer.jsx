import { createSlice } from "@reduxjs/toolkit";

const UsersSlicer = createSlice({
    name: "allUsers",
    initialState: {
        loading: false,
    },
    reducers: {
        usersRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        usersSuccess(state, action) {
            return {
                loading: false,
                users: action.payload.users
            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
    }
})

export const {actions, reducer} = UsersSlicer;
export const {usersRequest, usersSuccess, usersFail} = actions;
export default reducer