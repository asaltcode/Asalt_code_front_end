import React, {useState, useEffect, useContext} from 'react'
// import "../style/Login.css"
import { useNavigate, Link } from 'react-router-dom'
import EmailSendLoad from '../../animation/EmailSendLoad'
import ForgotAnim from '../../animation/ForgotAnim'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { UserEmailContext } from '../../context/UserEmailContextCoponent'

const ForgetPassword = () => {
    const {setUserEmail} = useContext(UserEmailContext)
    const navigate = useNavigate();   
    const [scale, setScale] = useState(1);
    const [loading, setLoading] = useState(null)
    const [beEmailError, setBeEmailError] = useState(null)
    //Sign up button clicking effect
    const handleMouseDown = () => setScale(0.9);
    const handleMouseUp = () => setScale(1);
    const handleMouseLeave = () => setScale(1);
    const handleTouchStart = () => setScale(0.9);


    const formik = useFormik({
        initialValues :{
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email')
            .matches(
              /^(.+)@(?!sparet\.com)(gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$/,
              'Email must be from Gmail, Outlook, Yahoo Mail, or Zoho Mail'
            )
            .required('Email is Required')
        }),
        onSubmit : async (values) =>{
            try {
                setLoading(true)                
                const res = await AxiosService.post(`${ApiRoutes.FOR_GOT.path}`, values, {authenticate: ApiRoutes.FOR_GOT.authenticate})
                  if(res.status === 200){
                    setUserEmail(values.email)
                    // setOtp(res.data.OTP)
                    navigate(`/otp-verify`)
                    toast.success(res.data.message)
                  }
            } catch (error) {
                toast.error(error.response.data.message || error.message)   
                setBeEmailError(error.response.data.message)
            }finally{
                setLoading(false)
            }
        }
    })


  return (
      <>
      {loading && <EmailSendLoad/>}
        <section>
        <button className='button' onClick={()=>navigate("/home")} style={{marginTop: '20px', marginLeft: "30px", width: "50px" ,position: 'fixed'} }><i className="fa-solid fa-arrow-left"></i></button>
        <div className="form-container">
            <form onSubmit={formik.handleSubmit} className="form-box">
                <p className="top-head">Forgot Your Password ?</p>
                <div className="image">
                    <ForgotAnim />   
                </div>
                    <div className="form-group">
                        <input id="email" type="text" placeholder="Enter your email" autoComplete="off" name='email' value={formik.values.email} onFocus={()=> setBeEmailError(null)} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? (<div className="errorMes">{formik.errors.email}</div>) : (<div className="errorMes">{beEmailError}</div>)}
                    </div>
                <div className="form-group">
                <button className='button' type='submit' style={{ width: '100%', transform : `scale(${scale})` }} id="logIn" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart}>Send</button>
                <div className="signUpPage">
                    <p>Don't have an account? <span>
                            <Link className='links' to="/signup">Sign up and get started!</Link>
                        </span></p>
                </div>
                </div>
            </form>
        </div>
    </section>
    </>
  )
}

export default ForgetPassword