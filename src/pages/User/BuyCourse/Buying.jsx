import React from 'react'
import CourseCart from './CourseCart';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../../../animation/EmptyCart';
import { useNavigate } from 'react-router-dom';
import BgAnimaiton from '../../../components/BgAnimaiton';
import '../../../assets/style/buy-course.css';
import { saveAllCart } from '../../../Redux/CartSlicer';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';

const Buying = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.Cart);
    const navigate = useNavigate()
    const handleDeleteAllCart = async () =>{
        try {
            dispatch(saveAllCart([]))
            const res = await AxiosService.delete(ApiRoutes.DEL_ALL_CART.path, {authenticate: ApiRoutes.DEL_ALL_CART.authenticate})
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <BgAnimaiton/>
            <div className="container mt-5">
                {cart.length > 0 ? (
                    <>
                    <div className='col-md-6 m-auto'>
                    {cart.map((data, index) => (
                        <CourseCart key={index} thumbnail={data.thumbnail} title={data.title} price={data.price} course_id={data.course_id} />                       
                    ))
                    }
                    <div className="d-flex justify-content-between">
                        <div>Total Amount :</div>
                        <div>₹ {cart.reduce((acc, curr) => acc + curr.price, 0)}</div>
                    </div>
                    <hr className='bg-light' />
                    <div className="d-flex justify-content-between">
                        <div className='btn-primary btn p-2 rounded-4'><i className='mdi mdi-cart'/>Buy Now</div>
                        <div onClick={handleDeleteAllCart} className='btn-danger btn p-2 rounded-4'>Clear <i className='mdi mdi-cart-off'/></div>
                    </div>
                    </div>
                    </> ) : (
                    <div className='bg-light  col-md-4 m-auto rounded-5'>
                        <EmptyCart />
                        <div className="pb-3 text-center">
                          <div style={{boxShadow: "5px 5px 15px gray"}} onClick={()=>navigate("/course")} className="btn btn-primary rounded-3 p-3">Add Course</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Buying;
