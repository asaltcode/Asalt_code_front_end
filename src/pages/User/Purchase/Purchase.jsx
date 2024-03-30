import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SadIcon from '../../../assets/images/sad.svg';
import { toast } from 'react-toastify';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import RenderRazorpay from '../Payment/RenderRazorpay';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/style/purchase.css';
import { orderPayment } from '../../../Redux/Actions/PaymentActions';
import Loading from "../../../animation/Loading"

const Purchase = () => {
  const dispatch = useDispatch();
  const { carts } = useSelector(state => state.cartsState);
  const {user} = useSelector(state => state.authState)
  const {loading, orderDetails, error} = useSelector(state => state.paymentState)
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(() => {
    return parseInt(localStorage.getItem('progress')) || 0;
  });

  const handleProgress = () => {
    if (location.pathname === '/purchase') {
      localStorage.setItem('progress', '0');
      setProgress(0);
    }
  };

  const handleNavigate = () => {
    if (location.pathname === '/purchase') {
      if (carts.length === 0) {
        navigate('/purchase');
      } else {
        navigate('/purchase/billing-details');
      }
      setProgress(50);
      localStorage.setItem('progress', '50');
    } else if (location.pathname === '/purchase/billing-details') {
      navigate('/purchase/make-payment');
      setProgress(100);
      localStorage.setItem('progress', '100');
    }
  };

  const handleBack = () => {
    if (location.pathname === '/purchase/billing-details') {
      navigate('/purchase');
      setProgress(0);
      localStorage.setItem('progress', '0');
    } else if (location.pathname === '/purchase/make-payment') {
      navigate('/purchase/billing-details');
      setProgress(50);
      localStorage.setItem('progress', '50');
    }
  };

  const handleCreateOrder = async () => {
         dispatch(orderPayment())
  };


  const handleClear = () => {
    localStorage.setItem('progress', '0');
    setTimeout(() => navigate("/"), 3500);
  };

  useEffect(() => {
    handleProgress();
  }, []);

  useEffect(()=>{
    if(error){
      toast.error(error)
      return 
    }
    if(orderDetails){
      setDisplayRazorpay(true)
    }
  },[error, orderDetails])

  return (<>
  {loading && <Loading/>}
  {/* <Loading/> */}
    <div className='purchase-container'>
      <div className="container">
        <div className="purchase-align-container">
          <div className="purchase-box row">
            <div className="progress_content">
              {/* Progress bar code */}
              <div className="progress_box  mt-5">
                              <div className="progress-outer">
                                  <div className="progress-bars" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <div className="progress_status_text ">
                                  <div className='user_status_text'>Order Details</div>
                                  <div className='user_status_text'>Billing Details</div>
                                  <div className='user_status_text'>Make Payment</div>
                              </div>
                              <div className="progress_status ">
                                  <div className='user_status'>1</div>
                                  <div className='user_status'>2</div>
                                  <div className='user_status'>3</div>
                              </div>
                          </div>
            </div>
            {displayRazorpay && (<RenderRazorpay user_email={user.email} user_name={user.name}  orderId={orderDetails && orderDetails.order_id}/>)}
            {carts && carts.length > 0 ? (
              <Outlet cart={carts} />
            ) : (
              <div className='pt-5 pb-5'>
                <p className='text-muted fs-2'>Not Found <img src={SadIcon} alt="" /> </p>
              </div>
            )}
            <div className="purchase_buttons">
              {location.pathname === "/purchase" ? null : <button onClick={handleBack} className='btn btn-warning rounded-5' type="button">Back</button>}
              {location.pathname === "/purchase/make-payment" && carts && carts.length > 0
                ? <button onClick={() => handleCreateOrder()} className='btn btn-primary rounded-5' type="button">Make Payment</button>
                :carts && carts.length === 0 ? (
                  <>
                    <button onClick={() => navigate('/')} className='btn btn-primary rounded-5'>Go To Home</button>
                    <button onClick={handleClear} className='btn btn-primary rounded-5'>Clear</button>
                  </>
                ) :
                  <button onClick={handleNavigate} className='btn btn-primary rounded-5' type="button">Next</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Purchase;
