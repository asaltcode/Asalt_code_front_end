import React from 'react'
// import { removeFromCart } from '../../../Redux/Slices/CartsSlicer'
import { useDispatch } from 'react-redux'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { getCarts, removeCart } from '../../../Redux/Actions/CartsActions'

const CourseCart = ({thumbnail, title, price, course_id, id}) => {
    const dispatch = useDispatch()
    const handleDelete = async (id) =>{  
        dispatch(removeCart(id))
    }
  return (
    <div>
        <div className="row">
            <div className="col-3 fw-light">
                <img style={{borderRadius: "20px" , boxShadow: "0 0 10px" , objectFit: 'cover' }}
                    src={thumbnail} height={"60px"} width={'80px'} alt="image" />
            </div>
            <div className="col-7 fw-light ">
                <p className='text-start'>{title}</p>
                <p className='text-start text-muted'>Life Time </p>
            </div>
            <div className="col-2 fw-light text-end">
                <p> ₹ {price}</p>
                <p><i onClick={()=> handleDelete(course_id)} style={{cursor:
                        "pointer"}} className='mdi mdi-delete-forever fs-6 text-danger'></i></p>
            </div>
        </div>
        <hr className='bg-light' />
    </div>
  )
}

export default CourseCart