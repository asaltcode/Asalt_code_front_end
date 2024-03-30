import {
  carouselRequest,
  carouselSuccess,
  carouselFail,
  carouselAddRequest,
  carouselAddSuccess,
  carouselAddFail,
  adminCarouselRequest,
  adminCarouselSuccess,
  adminCarouselFail,
  delCarouselSuccess
} from "../Slices/CarouselsSlicer";
import AxiosService from "../../utils/AxiosService";
import AdminApi from "../../utils/ApiRouters/AdminApis";
import { getCarouselFail, getCarouselRequest, getCarouselSuccess } from "../Slices/CarouselSlicer";

export const getCarousels = () => async (dispatch) => {
  try {
    dispatch(carouselRequest());
    const { data } = await AxiosService.get("/carousels");
    dispatch(carouselSuccess(data));
  } catch (error) {
    dispatch(carouselFail(error.response.data.message));
  }
};

//Admin Functions

export const addCarousel = () => async () => {};
//Find all carousels
export const getAllCarousels = async (dispatch) => {
    try {
        dispatch(adminCarouselRequest());
        const {data} = await AxiosService.get(AdminApi.GET_CAROUSELS.path)
        dispatch(adminCarouselSuccess(data))
    } catch (error) {
        dispatch(adminCarouselFail(error.response.data.message))
    }
};
//delet carousel
export const deleteCarousel = (id) => async (dispatch) => {
    try {
        dispatch(delCarouselSuccess({id}))
        await AxiosService.delete(`${AdminApi.CAROUSEL_BY_ID.path}/${id}`)  
    } catch (error) {
        console.error(error.message)
    }
}

//get single Carousel
export const getCarousel = (id) => async (dispatch) => {
    try {
        dispatch(getCarouselRequest())
        const {data} = await AxiosService.get(`${AdminApi.CAROUSEL_BY_ID.path}/${id}`)  
        dispatch(getCarouselSuccess(data))
    } catch (error) {
        dispatch(getCarouselFail(error.response.data.message))
    }
}