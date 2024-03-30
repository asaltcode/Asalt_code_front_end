import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import { cartsRequest, cartsSuccess, cartsFail, cartAddRequest, cartAddSuccess, cartAddFail, cartDelRequest, cartDelSuccess, cartDelFail, removeAllCart, clearCarts } from "../Slices/CartsSlicer";

// const {carts} = useSelector(state => state.cartsState)
export const addCart = (id, carts) => async (dispatch) => {
     let res = carts.filter(data => data.course_id === id)
     try {
         if(res.length !== 0){
            return null
        }
        dispatch(cartAddRequest());
        const { data } = await AxiosService.post(`/cart/${id}`);
        dispatch(cartAddSuccess(data.cart));
    } catch (error) {
        dispatch(cartAddFail(error.response.data.message));
    }
};
export const getCarts = async (dispatch) => {
    try {
        dispatch(cartsRequest());
        const { data } = await AxiosService.get("/carts");
        dispatch(cartsSuccess(data));
    } catch (error) {
        dispatch(cartsFail(error.response.data.message));
    }
};
export const removeCart = (id) => async (dispatch) => {
    try {
        dispatch(cartDelSuccess({ id: id }));
        await AxiosService.delete(`/cart/${id}`);
    } catch (error) {
        dispatch(cartDelFail(error.response.data.message));
    }
};
export const clearAllCart = async (dispatch) => {
    try {
        dispatch(removeAllCart());
        await AxiosService.delete(`/carts`);
    } catch (error) {
       
    }
};

export const paymentSuccessCartClear = (dispatch)=> {
    dispatch(clearCarts())
}