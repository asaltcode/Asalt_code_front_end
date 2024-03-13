// CartContextComponent.js
import React, { useState, useEffect } from 'react';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export const CartContext = React.createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const decode = jwtDecode(token);
      const res = await AxiosService.post(ApiRoutes.GET_ALL_CART.path, { user_id: decode.id }, { authenticate: ApiRoutes.GET_ALL_CART.authenticate });
      if (res.status === 200) {
        setCart(res.data.cartList);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    updateCart();
  },[]);

  return (
    <CartContext.Provider value={{ cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextComponent;
