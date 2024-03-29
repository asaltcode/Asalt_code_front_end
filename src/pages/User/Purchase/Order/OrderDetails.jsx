import React, { useContext, useEffect, useState } from 'react'
import AxiosService from '../../../../utils/AxiosService'
import ApiRoutes from '../../../../utils/ApiRoutes'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart} from '../../../../Redux/CartSlicer';

const OrderDetails = () => {
    const dispatch = useDispatch()
    const carts = useSelector(state => state.Cart)
      const handleDelete = async (course_id) =>{
        try {
            dispatch(removeFromCart({id: course_id}))
            const data = {course_id}
            await AxiosService.delete(ApiRoutes.DEL_CART.path, {data}, {authenticate: ApiRoutes.DEL_CART.authenticate})
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error.message);   
        }
    }   
  return (    
    <div className="mt-4">
    <div className="row">
        <div className="col-md-12">
            <div className="row">
                <div style={{fontSize: "12px" , color: "gray" }} className="col-6 fw-light">Course Details</div>
                <div style={{fontSize: "12px" , color: "gray" }} className="col-6 fw-light text-end">Price</div>
            </div>
            <hr className='bg-light' />
            {/* Card Start */}
            {
            carts.map((data, index) =>{
            return <div key={index}>
                <div className="row">
                    <div className="col-3 fw-light">
                        <img style={{borderRadius: "20px" , boxShadow: "0 0 10px" , objectFit: 'cover' }}
                            src={data.thumbnail} height={"60px"} width={'80px'} alt="image" />
                    </div>
                    <div className="col-7 fw-light ">
                        <p className='text-start'>{data.title}</p>
                        <p className='text-start text-muted'>Life Time </p>
                    </div>
                    <div className="col-2 fw-light text-end">
                        <p> ₹ {data.price}</p>
                        <p><i onClick={()=> handleDelete(data.course_id)} style={{cursor:
                                "pointer"}} className='mdi mdi-delete-forever fs-6 text-danger'></i></p>
                    </div>
                </div>
                <hr className='bg-light' />
            </div>
            })
            }
            {/* Card end */}
        </div>
    </div>
</div>
  )
}

export default OrderDetails