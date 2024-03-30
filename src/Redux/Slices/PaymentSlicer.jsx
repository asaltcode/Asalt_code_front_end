import { createSlice } from "@reduxjs/toolkit";

const PaymentSlicer = createSlice({
    name: "payment",
    initialState: {
        loading: false,
    },
    reducers : {
        paymentOrderRequest(state, action) {
            return {loading: true,}
        },
        paymentOrderSuccess(state, action) {
            return {
                loading: false,
                orderDetails: action.payload.orderDetails
            }
        },
        paymentOrderFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        clearPayment(state, action) {
            return {
                loading: false,
            }
        }
    }
})

export const {actions, reducer} = PaymentSlicer
export const {paymentOrderRequest, paymentOrderSuccess, paymentOrderFail, clearPayment} = actions
export default reducer