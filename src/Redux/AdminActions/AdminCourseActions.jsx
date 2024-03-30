import AxiosService from "../../utils/AxiosService";
import AdminApi from "../../utils/ApiRouters/AdminApis";
import { adminCoursesFail, adminCoursesRequest, adminCoursesSuccess, courseDelFail, courseDelSuccess } from "../Slices/AdminCourseSlicer";

//Normal users
export const getAdminCourses = async (dispatch) => {
    try {
        dispatch(adminCoursesRequest());
        const { data } = await AxiosService.get(AdminApi.GET_COURSES.path)
        dispatch(adminCoursesSuccess(data));
    } catch (error) {
        dispatch(adminCoursesFail(error.response.data.message));
    }
};

export const delCourse = (id) => async (dispatch) => {
    try {
        dispatch(courseDelSuccess({ id: id }));
        await AxiosService.delete(`${AdminApi.COURSE_BY_ID.path}/${id}`);
    } catch (error) {
        dispatch(courseDelFail(error.response.data.message));
    }
};
export const editCourse = (id) => async (dispatch) => {
    try {
        dispatch(courseDelSuccess({ id: id }));
        await AxiosService.delete(`${AdminApi.COURSE_BY_ID.path}/${id}`);
    } catch (error) {
        dispatch(courseDelFail(error.response.data.message));
    }
};