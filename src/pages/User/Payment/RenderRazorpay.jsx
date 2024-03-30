import React, { useEffect, useRef } from 'react';
import crypto from 'crypto-js';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { paymentClear } from '../../../Redux/Actions/PaymentActions';
import { paymentSuccessCartClear } from '../../../Redux/Actions/CartsActions';

// Function to load script and append it to the DOM
const loadScript = src => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

const RenderRazorpay = ({ orderId, currency, user_email, user_name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  // Function to display the Razorpay checkout modal
  const displayRazorpay = async (options) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    rzp1.on('payment.failed', (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    rzp1.open();
  };

  // Function to handle payment success or failure
  const handlePayment = async (status, orderDetails = {}) => {
    // Informing the server about the payment
    // await AxiosService.post(ApiRoutes.PAYMENT_PAID_STATUS.path, {status, orderDetails})
  };

  // Options for the Razorpay checkout modal
  const options = {
    currency: "INR",
    name: "Asalt Code",
    image: "https://avatars.githubusercontent.com/u/112842382?s=96&v=4",
    order_id: orderId,
    handler: async (response) => {
      console.log('succeeded');
      console.log(response);
      paymentId.current = response.razorpay_payment_id;

      const succeeded = await AxiosService.post(ApiRoutes.PAYMENT_CAPTURE.path, response);
      if (succeeded) {
        handlePayment('succeeded', {
          orderId,
          paymentId,
          signature: response.razorpay_signature,
        });
        dispatch(paymentClear);
        dispatch(paymentSuccessCartClear);
        navigate('/');
      } else {
        dispatch(paymentClear);
        handlePayment('failed', {
          orderId,
          paymentId: response.razorpay_payment_id,
        });
      }
    },
    modal: {
      confirm_close: true,
      ondismiss: async (reason) => {
        const {
          reason: paymentReason, field, step, code,
        } = reason && reason.error ? reason.error : {};
        if (reason === undefined) {
          console.log('cancelled');
          handlePayment('Cancelled');
        } else if (reason === 'timeout') {
          console.log('timedout');
          handlePayment('timedout');
        } else {
          console.log('failed');
          handlePayment('failed', {
            paymentReason, field, step, code,
          });
        }
      },
    },
    prefill: {
      name: user_name,
      email: user_email
    },
    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: '',
    },
  };

  // Load the Razorpay checkout modal on component mount
  useEffect(() => {
    displayRazorpay(options);
  }, []);

  // The component doesn't render anything visible
  return null;
}

export default RenderRazorpay;
