// CartSlicer.js
import { createSlice } from "@reduxjs/toolkit";

export const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    loaading: false,
    carts: [],
  },
  reducers: {
    cartsRequest(state) {
      return { loading: true };
    },
    cartsSuccess(state, action) {
      return {
        loading: false,
        carts: action.payload.carts,
      };
    },
    cartsFail(state, action) {
      return {
        ...state,
        carts: [],
        loading: false,
        error: action.payload,
      };
    },
    cartAddRequest(state) {
      return { loading: true, carts: [...state.carts] };
    },
    cartAddSuccess(state, action) {
      const updataedCart = [...state.carts, action.payload];
      return {
        loading: false,
        carts: updataedCart,
      };
    },
    cartAddFail(state, action) {
      return {
        loading: false,
        carts: [...state.carts],
        error: action.payload,
      };
    },
    cartDelRequest(state) {
      return { loading: true };
    },
    cartDelSuccess(state, action) {
      const updatedCarts = state.carts.filter(
        (item) => item.course_id !== action.payload.id
      );
      return {
        loading: false,
        carts: updatedCarts,
      };
    },
    cartDelFail(state, action) {
      return {
        loading: false,
        carts: [...state.carts],
        error: action.payload,
      };
    },
    removeAllCart(state, action) {
      return {
        loaading: false,
        carts: [],
      };
    },
    clearCarts(state, action) {
      return {
        loaading: false,
        carts: [],
      };
    },
  },
});

const { actions, reducer } = cartsSlice;
export const {
  cartsRequest,
  cartsSuccess,
  cartsFail,
  cartAddRequest,
  cartAddSuccess,
  cartAddFail,
  cartDelRequest,
  cartDelSuccess,
  cartDelFail,
  removeAllCart,
  clearCarts
} = actions;
export default reducer;
