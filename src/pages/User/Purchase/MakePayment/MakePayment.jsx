import React, { useState, useEffect } from 'react'
import AxiosService from '../../../../utils/AxiosService'
import ApiRoutes from '../../../../utils/ApiRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { endLoading, onLoading } from '../../../../Redux/loaderSlicer'

const MakePayment = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.Cart)
    const [email, setEmail] = useState("")
    const getDetails = async () =>{
        try {
            dispatch(onLoading())
            const user = await AxiosService.get(`${ApiRoutes.GET_USER.path}`, {authenticate: ApiRoutes.GET_USER.authenticate})
            if(user.status === 200){
                setEmail(user.data.user.email)
            }
        } catch (error) {
            console.log(error)
            // toast.error(error.response.data.message || error.message)  
        }finally{
            dispatch(endLoading())
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
                    <span className='text-primary'> {email}</span>
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