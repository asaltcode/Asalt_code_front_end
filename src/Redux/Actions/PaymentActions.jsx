import AxiosService from "../../utils/AxiosService"
import { clearPayment, paymentOrderFail, paymentOrderRequest, paymentOrderSuccess } from "../Slices/PaymentSlicer"


export const orderPayment = () => async (dispatch) =>{
    try {
        dispatch(paymentOrderRequest());
        const {data} = await AxiosService.post("/order")
        dispatch(paymentOrderSuccess(data))
    } catch (error) {
        dispatch(paymentOrderFail(error.response.data.message || data.message) ) //error.response.data.message
    }
}

export const paymentClear = async (dispatch) =>{
    dispatch(clearPayment())
}