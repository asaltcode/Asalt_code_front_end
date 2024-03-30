import { paidCoursesFail, paidCoursesRequest, paidCoursesSuccess } from "../Slices/MyCoursesSlicer";
import AxiosService from "../../utils/AxiosService";


//Normal users
export const getMyCourses = async (dispatch) => {
    try {
        dispatch(paidCoursesRequest());
        const { data } = await AxiosService.get("/api/my-courses");
        dispatch(paidCoursesSuccess(data));
    } catch (error) {
        dispatch(paidCoursesFail(error.message));
    }
};
// export const getCourse = (id) => async (dispatch) => {
//     try {
//         dispatch(courseRequest());
//         const { data } = await AxiosService.get(`/api/course/${id}`);
//         dispatch(courseSuccess(data));
//     } catch (error) {
//         dispatch(courseFail(error.response.data.message));
//     }
// };