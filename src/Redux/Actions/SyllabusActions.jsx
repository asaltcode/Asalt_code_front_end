import AdminApi from "../../utils/ApiRouters/AdminApis";
import ApiRoutes from "../../utils/ApiRoutes";
import AxiosService from "../../utils/AxiosService";
import {
  getSyllabusFail,
  getSyllabusRequest,
  getSyllabusSuccess,
  paidSyllabusFail,
  paidSyllabusRequest,
  paidSyllabusSuccess,
  syllabusFail,
  syllabusRequest,
  syllabusSuccess,
} from "../Slices/SyllabusSlicer";

export const getSyllabus = (id) => async (dispatch) => {
  try {
    dispatch(syllabusRequest());
    const { data } = await AxiosService.get(
      `${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID.path}/${id}`
    );
    dispatch(syllabusSuccess(data));
  } catch (error) {
    dispatch(syllabusFail(error.response.data.message));
  }
};
export const getPaidSyllabus = (id) => async (dispatch) => {
  try {
    dispatch(paidSyllabusRequest());
    const { data } = await AxiosService.get(
      `${ApiRoutes.GET_PAID_SYLLABUS_BY_COURSE_ID.path}/${id}`
    );
    dispatch(paidSyllabusSuccess(data));
  } catch (error) {
    dispatch(paidSyllabusFail(error.response.data.message));
  }
};

//Admin Actions

export const getSyllabusById = (id) => async (dispatch) => {
  try {
    dispatch(getSyllabusRequest());
    const { data } = await AxiosService.get(
      `${AdminApi.SYLLABUS_BY_ID.path}/${id}`
    );
    dispatch(getSyllabusSuccess(data));
  } catch (error) {
    dispatch(getSyllabusFail(error.response.data.message));
  }
};


