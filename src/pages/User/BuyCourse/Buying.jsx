import { useEffect } from 'react';
import '../../../assets/style/buy-course.css';
import CourseCart from './CourseCart';
import { useDispatch, useSelector } from 'react-redux';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { saveAllCart } from '../../../Redux/CartSlicer';
import EmptyCart from '../../../animation/EmptyCart';
import { useNavigate } from 'react-router-dom';

const Buying = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.Cart);
    const navigate = useNavigate()
    const getAllCart = async () => {
        try {
            const res = await AxiosService.get(ApiRoutes.GET_ALL_CART.path, { authenticate: ApiRoutes.GET_ALL_CART.authenticate });
            if (res.status === 200) {
                dispatch(saveAllCart(res.data.cartList));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCart();
    }, []);

    return (
        <>
            <div className="bg-animate">
                <div className="glowing">
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
                <div className="glowing">
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
                <div className="glowing">
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
                <div className="glowing">
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
            </div>
            <div className="container mt-5">
                {cart.length > 0 ? (
                    cart.map((data, index) => (
                        <CourseCart key={index} thumbnail={data.thumbnail} title={data.title} price={data.price} course_id={data.course_id} />
                       
                    ))
                ) : (
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
