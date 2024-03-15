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
            const { course_id } = action.payload;
            if (state.some(item => item.course_id === course_id)) {
                return state; // Item already exists in cart, do not add
            }
            return [...state, action.payload];
         },
        removeFromCart: (state, action) =>{
            return state.filter(item => item.course_id !== action.payload.id);
        }
    }
})

export const {saveAllCart, addToCart, removeFromCart} = cartSlice.actions
export default cartSlice.reducer
