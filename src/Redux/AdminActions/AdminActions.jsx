import AdminApi from "../../utils/ApiRouters/AdminApis";
import AxiosService from "../../utils/AxiosService";
import { usersFail, usersRequest, usersSuccess } from "../Slices/UsersSlicer";
import { userFail, userRequest, userSuccess } from "../Slices/UserSlicer";


export const getAllUsers = async (dispatch) =>{
    try {
        dispatch(usersRequest());
        const { data } = await AxiosService.get(AdminApi.USERS.path);
        dispatch(usersSuccess(data));
      } catch (error) {
        dispatch(usersFail(error.response.data.message));
      }
}

export const getUser = (id) => async (dispatch) =>{
    try {
        dispatch(userRequest());
        const { data } = await AxiosService.get(`${AdminApi.USER_BY_ID.path}/${id}`);
        dispatch(userSuccess(data));
      } catch (error) {
        dispatch(userFail(error.response.data.message));
      }
}