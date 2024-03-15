import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SadIcon from '../../../assets/images/sad.svg'
import { toast } from 'react-toastify'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import RenderRazorpay from '../Payment/RenderRazorpay'
import { useDispatch, useSelector } from 'react-redux'
import { saveAllCart } from '../../../Redux/CartSlicer'
import '../../../assets/style/purchase.css'


const Purchase = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.Cart)
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(() => {
      return parseInt(localStorage.getItem('progress')) || 0;
  });

  const handleProgress = async () => {
    if (location.pathname === '/purchase') {
        localStorage.setItem('progress', '0')
        setProgress(0)
    }
  };

  const handleNavigate = () => {
      if (location.pathname === '/purchase') {
          if (cart.length === 0) {
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

//   handle payments create

  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
   });
   const handleCreateOrder = async (amount, course_id) => {
   console.log(user._id)
      const res = await AxiosService.post('/order',
      {
      amount: 100, //convert amount into lowest unit. here, Dollar->Cents    
      course_id,
      user_id : user._id   
      },
      {authenticate: true}
      );
      console.log(res.data)
   
  
      if(res.data && res.data.order_id){
      setOrderDetails({
          orderId: res.data.order_id,
          currency: res.data.currency,
          amount: res.data.amount,
          user_email: res.data.user_email,
          user_name: res.data.user_name
      });
      setDisplayRazorpay(true);
  };
  }

  const getAllCart = async () =>{
    try {
        const res = await AxiosService.get(ApiRoutes.GET_ALL_CART.path, { authenticate: ApiRoutes.GET_ALL_CART.authenticate });
            if (res.status === 200) {
                dispatch(saveAllCart(res.data.cartList));
            }
    } catch (error) {
        console.log(error)
    }
  }
  const handleClear = () =>{ //This function prevents wrong navigation
    localStorage.setItem('progress', '0')
    setTimeout(()=> navigate("/"),3500)
  }

  useEffect(() => {
      handleProgress();
      getAllCart()
  }, []);


  return (
      <div className='purchase-container '>
          <div className="container">
              <div className="purchase-align-container">
                  <div className="purchase-box row">
                      <div className="progress_content">
                          <div className="progress_box  mt-5">
                              <div className="progress-outer">
                                  <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
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
                     {displayRazorpay && (<RenderRazorpay user_email={orderDetails.user_email} user_name={orderDetails.user_name} amount={orderDetails.amount} currency={orderDetails.currency} orderId={orderDetails.orderId}/>)}
                      {cart.length > 0 ? (
                        <Outlet cart={cart} />
                        ) : (
                          <div className='pt-5 pb-5'>
                              <p className='text-muted fs-2'>Not Found <img src={SadIcon} alt="" /> </p>
                          </div>
                      )}            
                      {/* <RenderRazorpay/>          */}
                      <div className="purchase_buttons">
                          {location.pathname === "/purchase" ? null : <button onClick={handleBack} className='btn btn-warning rounded-5' type="button">Back</button>}
                          {location.pathname === "/purchase/make-payment" && cart.length > 0
                          ? <button onClick={()=> handleCreateOrder(cart.reduce((acc, curr) => acc + curr.price, 0), cart.map(id => id.course_id))} className='btn btn-primary rounded-5' type="button">Make Payment</button> 
                          : cart.length === 0 ? (<><button onClick={() => navigate('/')} className='btn btn-primary rounded-5'>Go To Home</button>{handleClear()}</>) :
                            <button onClick={handleNavigate} className='btn btn-primary rounded-5' type="button">Next</button>}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Purchase;
