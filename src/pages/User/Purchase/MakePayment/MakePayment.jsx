import React, { useState, useEffect } from 'react'
import AxiosService from '../../../../utils/AxiosService'
import ApiRoutes from '../../../../utils/ApiRoutes'
import { jwtDecode } from 'jwt-decode'

const MakePayment = () => {
    const [details, setDetails] = useState({})
    const [cart, setCart] = useState([])
    const getDetails = async () =>{
        try {
            const token = localStorage.getItem('token')
            const decode = jwtDecode(token)
            const user = await AxiosService.get(`${ApiRoutes.GET_USER.path}/${decode.id}`, {authenticate: ApiRoutes.GET_USER.authenticate})
            const cartRes = await AxiosService.post(ApiRoutes.GET_ALL_CART.path, {user_id: decode.id})
            setCart(cartRes.data.cartList)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)   
        }
    }

    useEffect(()=>{
       getDetails()
    },[])
  return (
    <div className="mt-4">
        <div className="row">
            <div className="col-md-12">
                <div className='bg-dark p-3 rounded-5 text-center' style={{fontSize: "12px"}}> Order Details will be sent to your email address : 
                    <span className='text-primary'>  elangovanr558@gmail.com</span>
                </div>        
                <p>Course Count = {cart.length}</p>          
                <div className="row bg-secondary rounded-5 p-2 m-4">
                    <div className="col-6 text-muted">Razorpay</div>
                <div className="col-6 text-dark text-end">₹ {
                    cart.reduce((acc, curr) => acc + curr.price, 0)
                }</div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default MakePayment