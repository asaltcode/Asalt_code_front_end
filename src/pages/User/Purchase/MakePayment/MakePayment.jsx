import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts } from '../../../../Redux/Actions/CartsActions'

const MakePayment = () => {
    const { user } = useSelector((state) => state.authState);
    const { carts } = useSelector((state) => state.cartsState);
    
  return (
    <div className="mt-4">
        <div className="row">
            <div className="col-md-12">
                <div className='bg-dark p-3 rounded-5 text-center' style={{fontSize: "12px"}}> Order Details will be sent to your email address : 
                    <span className='text-primary'> {user && user.email}</span>
                </div>        
                <p>Course Count = {carts && carts.length}</p>          
                <div className="row bg-secondary rounded-5 p-2 m-4">
                    <div className="col-6 text-muted">Razorpay</div>
                <div className="col-6 text-dark text-end">₹ {
                    carts && carts.reduce((acc, curr) => acc + curr.price, 0)
                }</div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default MakePayment