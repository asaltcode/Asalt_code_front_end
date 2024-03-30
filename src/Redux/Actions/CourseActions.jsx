import { coursesRequest, coursesSuccess, coursesFail } from "../Slices/CoursesSlicer";
import { courseFail, courseRequest, courseSuccess } from "../Slices/CourseSlicer";
import AxiosService from "../../utils/AxiosService";

//Normal users
export const getCourses = () => async (dispatch) => {
    try {
        dispatch(coursesRequest());
        const { data } = await AxiosService.get("/courses");
        dispatch(coursesSuccess(data));
    } catch (error) {
        dispatch(coursesFail(error.message));
    }
};
export const getCourse = (id) => async (dispatch) => {
    try {
        dispatch(courseRequest());
        const { data } = await AxiosService.get(`/course/${id}`);
        dispatch(courseSuccess(data));
    } catch (error) {
        dispatch(courseFail(error.response.data.message));
    }
};

// Admin functions

