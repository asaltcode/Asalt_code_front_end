import React,{useEffect} from 'react'
import Lottie from 'lottie-web'
import animationData from './json/SuccessAnimation.json'
import { toast } from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

const EmailVerifyAnim = () => {
    const handleResendEmail = async () =>{
      const {email, name} = sessionStorage
     try {
      const res = await AxiosService.put(ApiRoutes.RE_SEND.path, {name, email})
      if(res.status === 200){
        // toast.success("Email has been re-sent")
        toast.success(res.data.message)
      }
     } catch (error) {
      toast.error(error.response.data.message || error.message)  
     }
    }

     
    useEffect(() => {
      const container = document.getElementById("animation-container");
      Lottie.loadAnimation({
        container,
        animationData,
        renderer: "svg", //or 'canvas'
        loop: true,
        autoplay: true,
      });
    }, []); // Run the effect once when the component mounts
  return (
    <>
    {/* The container for the Lottie animation */}
    {/* <div id="animation-container" className="overflow-hidden" style={{ width: "300px", height: "300px" }}></div> */}
   <div className='d-flex justify-content-center row align-items-center bg-dark' style={{height: '100vh', width: '100%', transition : 'none'}}>
    <div className='align-self-start text-light mt-5'>
         <h1>Verify Your Email</h1> <br />
        <p className="lh-1" >Please check your email for a link to verify your email adress</p>
        <p className="lh-1">Once verified, you'll be able to continue.</p>
    </div>
    {/* This is a animation */}
   <div id='animation-container' className='overflow-hidden' style={{height: '400px', width: '400px', position: "fixed", transition: "none"}}></div>
   <div className=' text-light align-self-end mb-5'>
    <p>Dign't receive an email? <a style={{cursor: "pointer", color: "aqua"}} onClick={handleResendEmail} >Resend</a></p>
    </div>
   </div>
    </>
  )
}

export default EmailVerifyAnim