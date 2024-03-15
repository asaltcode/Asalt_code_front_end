import React from 'react'
import CourseCart from './CourseCart';
import { useSelector } from 'react-redux';
import EmptyCart from '../../../animation/EmptyCart';
import { useNavigate } from 'react-router-dom';
import BgAnimaiton from '../../../components/BgAnimaiton';
import '../../../assets/style/buy-course.css';

const Buying = () => {
    const cart = useSelector(state => state.Cart);
    const navigate = useNavigate()
    return (
        <>
            <BgAnimaiton/>
            <div className="container mt-5">
                {cart.length > 0 ? (
                    <>
                    <div>
                    {cart.map((data, index) => (
                        <CourseCart key={index} thumbnail={data.thumbnail} title={data.title} price={data.price} course_id={data.course_id} />                       
                    ))
                    }
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
