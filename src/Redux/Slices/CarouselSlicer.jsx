import { createSlice } from "@reduxjs/toolkit";

const carouselSlicer = createSlice({
    name: 'carousel',
    initialState: {
        loading: false,
    },
    reducers: {
        getCarouselRequest(state) {
            return {...state, loading : true}
        },
        getCarouselSuccess(state, action) {
            return {
              loading : false,
              carousel : action.payload.carousel
            }
        },
        getCarouselFail(state, action) {
            return{
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = carouselSlicer

export const { getCarouselRequest, getCarouselSuccess, getCarouselFail } = actions;
export default reducer;