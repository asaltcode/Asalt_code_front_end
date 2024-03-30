import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import {
  loginFail,
  loginRequest,
  loginSuccess,
  clearError,
  signupFail,
  signupRequest,
  signupSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  logoutSuccess,
  logoutFail,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail

} from "../Slices/AuthSlicer";

const { LOG_IN, SIGN_UP, GET_USER } = ApiRoutes;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await AxiosService.post(LOG_IN.path, { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const { data } = await AxiosService.post(SIGN_UP.path, { userData });
    dispatch(signupSuccess(data));
  } catch (error) {
    dispatch(signupFail(error.response.data.message));
  }
};

export const loadUser = async (dispatch) =>{
    try {
        dispatch(loadUserRequest());
        const { data } = await AxiosService.get(GET_USER.path);
        dispatch(loadUserSuccess(data));
      } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
      }
}

export const logout = async (dispatch) =>{
  try {
    await AxiosService.get("auth/logout")
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail());
  }
}

export const updateProfile = (formData) => async (dispatch) =>{
  try {
    dispatch(userUpdateRequest());
    const config = {
      headers: {
          'Content-type': 'multipart/form-data'
      }
  }
    const {data} = await AxiosService.post(ApiRoutes.PROFIL_UPDATE.path, formData, config)
    dispatch(userUpdateSuccess(data))
  } catch (error) {
    dispatch(userUpdateFail(error.response.data.message))    
  }
}

