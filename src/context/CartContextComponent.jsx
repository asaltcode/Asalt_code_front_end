// CartContextComponent.js
import React, { useState, useEffect } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
export const CartContext = React.createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = async () => {
    try {
      const res = await AxiosService.get(ApiRoutes.GET_ALL_CART.path, {
        authenticate: ApiRoutes.GET_ALL_CART.authenticate,
      });
      if (res.status === 200) {
        setCart(res.data.cartList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextComponent;
