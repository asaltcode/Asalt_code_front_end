import React, { useRef, useState, useContext } from "react";
import "../../assets/style/otp-verify.css";
import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../context/UserEmailContextCoponent";

const OTPVerify = () => {
  const navigate = useNavigate()
 const [disable, setDisabled] = useState(true)
  const { userEmail } = useContext(UserEmailContext)
  console.log(userEmail)
  const handleSubmit = async (e) =>{
   try {
    e.preventDefault()
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData); 
    const data = {email: userEmail, otp: formProps.otp}
    if(userEmail != ''){
      const res = await AxiosService.post(ApiRoutes.VERIFY_OTP.path, data, {authenticate: ApiRoutes.VERIFY_OTP.authenticate})
      if(res.status === 200){
       res.status === 200 && userEmail !== '' ? navigate('/change-password') : navigate('/forget-password')
       toast.success(res.data.message)
      }
    }
    else{
      toast.error(`What you are trying is the wrong way`)
      navigate('/forget-password')
    }
   } catch (error) {
    toast.error(error.response.data.message || error.message)   
    // console.log(error.response.data.message || error.message)
   }
  }

  return (
    <div className="bg-dark text-light otp-container">      
      <div className="otp-input-box">
        <header>
          <h4>Enter Your OTP</h4>
        </header>
        <div className="otp-inputs">
          <form className="otp-form" onSubmit={handleSubmit}>
          <input type="text" className='text-center otp-box' name='otp' onChange={(e)=>e.target.value.length === 6 ? setDisabled(false) : setDisabled(true)} maxLength={6} />
          <button type="submit"  className={`btn ${disable ?'disabled': ''} text-light bg-primary m-auto`}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
