import Reac, {useState} from 'react'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import RenderRazorpay from './RenderRazorpay';

const Payment = () => {
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
      orderId: null,
      currency: null,
      amount: null,
     });
     const handleCreateOrder = async (amount) => {

      console.log("pay")
    //     const res = await AxiosService.post('/order',
    //     {
    //     amount: amount, //convert amount into lowest unit. here, Dollar->Cents       
    //     }
    //     );
    //     console.log(res.data)
    
    //     if(res.data && res.data.order_id){
    //     setOrderDetails({
    //         orderId: res.data.order_id,
    //         currency: res.data.currency,
    //         amount: res.data.amount,
    //     });
    //     setDisplayRazorpay(true);
    // };
    }
 
    // console.log(process.env.RAZOR_SECRET_KEY)
     
  return (
    <div>Payment
         <div className='bg-danger text-light'>              
                <button onClick={() => handleCreateOrder(100)}>Place Order</button>
            {/* {displayRazorpay && (<RenderRazorpay amount={orderDetails.amount} currency={orderDetails.currency} orderId={orderDetails.orderId}/>)} */}
            </div>
    </div>
  )
}

export default Payment
