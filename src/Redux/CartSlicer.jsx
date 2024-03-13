import { createSlice } from "@reduxjs/toolkit";

export const cartSlicer = createSlice({
    name: 'Cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) =>{
           console.log("hi")
        },
        removeFromCart: (state) =>{

        }
    }
})

export const {addToCart, removeFromCart} = cartSlicer.actions
export default cartSlicer.reducer