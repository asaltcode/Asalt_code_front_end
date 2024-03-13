import React, {useEffect} from 'react'
import Navication from '../../common/Navication'
import Footer from '../../common/Footer'
import { Outlet } from 'react-router-dom'
import CartContextComponent from '../../context/CartContextComponent'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const Carts = useSelector(state => state.Cart)
  const updateCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const decode = jwtDecode(token);
      const res = await AxiosService.post(ApiRoutes.GET_ALL_CART.path, { user_id: decode.id }, { authenticate: ApiRoutes.GET_ALL_CART.authenticate });
      if (res.status === 200) {
        // setCart(res.data.cartList);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message || error.message);
    }
  };


  useEffect(()=>{
    updateCart()
  })
  return (
   <>
   <div className="user-container">
   <CartContextComponent>
      <Navication/>
      <Outlet/>
   </CartContextComponent>
   </div>
   <Footer/>
   </>
  )
}

export default UserDashboard