// CartSlicer.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'Cart',
    initialState:[],
    reducers: {
        saveAllCart: (state, action) =>{
           return action.payload
        },
        addToCart: (state, action) =>{
           return [...state, action.payload]
        },
        removeFromCart: (state, action) =>{
            return state.filter(item => item.course_id !== action.payload.id);
        }
    }
})

export const {saveAllCart, addToCart, removeFromCart} = cartSlice.actions
export default cartSlice.reducer
