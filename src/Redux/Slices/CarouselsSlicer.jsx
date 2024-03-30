import { createSlice } from "@reduxjs/toolkit";

const CarouselSlicer = createSlice({
  name: "carousels",
  initialState: {
    loading: false,
    carousels: [],
    adminCarousels: [],
  },
  reducers: {
    carouselRequest(state) {
      return {...state, loading: true };
    },
    carouselSuccess(state, action) {
      return {
        loading: false,
        carousels: action.payload.carousel,
      };
    },
    carouselFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    carouselAddRequest(state) {
      return { loading: true };
    },
    carouselAddSuccess(state, action) {
      return {
        loading: false,
        carousels: action.payload.carousel,
      };
    },
    carouselAddFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    adminCarouselRequest(state) {
      return { loading: true };
    },
    adminCarouselSuccess(state, action) {
      return {
        loading: false,
        adminCarousels: action.payload.carousels,
      };
    },
    adminCarouselFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    delCarouselRequest(state) {
      return { loading: true };
    },
    delCarouselSuccess(state, action) {
        const UpdatedCarousels = state.adminCarousels.filter(item => item._id !== action.payload.id)
      return {
        loading: false,        
        adminCarousels: UpdatedCarousels,
      };
    },
    delCarouselFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = CarouselSlicer;

export const {
  carouselRequest,
  carouselSuccess,
  carouselFail,
  carouselAddRequest,
  carouselAddSuccess,
  carouselAddFail,
  adminCarouselRequest,
  adminCarouselSuccess,
  adminCarouselFail,
  delCaroulseRequest,
  delCarouselSuccess,
  delCarouselFail
} = actions;
export default reducer;
