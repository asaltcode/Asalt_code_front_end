import { createSlice } from "@reduxjs/toolkit";

const AuthSlicer = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    signupRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    signupSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    signupFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    userUpdateRequest(state, action){
      return {
        ...state,
          loading: true
      }
    },
    userUpdateSuccess(state, action){
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            loading: false
        }
    },
    userUpdateFail(state, action){
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
  },
});

const { actions, reducer } = AuthSlicer;

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  signupRequest,
  signupSuccess,
  signupFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
} = actions;
export default reducer;
