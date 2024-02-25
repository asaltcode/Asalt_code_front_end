import React, {useState} from 'react';
import '../../assets/style/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import Loading from '../../animation/Loading';


const Signup = () => {
  const navigate = useNavigate()
  const [toggleEye, setToggleEye] = useState("fa-eye-slash");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(null)
  const [scale, setScale] = useState(1);

  //Sign up button clicking effect
  const handleMouseDown = () => setScale(0.9);
  const handleMouseUp = () => setScale(1);
  const handleTouchStart = () => setScale(0.9);

  let formik = useFormik({ //Formik Validations
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      name:Yup.string().required('Name is required').max(20,'Name can not exceed 20 characters').min(3,'Name can not be shorter than 3 leters'),
      email: Yup.string().email('Invalid email address').matches(/^(.+)@(?!sparet\.com)(gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$/,
      'Email must be from Gmail, Outlook, Yahoo Mail, or Zoho Mail').required('Email is required'),
      password: Yup.string()
          .matches(/^(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
          .matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
          .matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
          .matches(/^(?=.*[!@#$%^&*()_+])/, { message: 'Password must contain at least one special character' })
          .min(6, 'Password must be at least 6 characters long')
          .required('Password is required'),
      confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    
    }),
    onSubmit: async (values)=>{
      const {name, email, password} = values
      const datas = {name, email, password}
      try {
        setLoading(true)
        const res = await AxiosService.post(`${ApiRoutes.SIGN_UP.path}`, datas, {authenticate: ApiRoutes.SIGN_UP.authenticate})
      if(res.status === 200){
        // setUserDetails(datas.email)
        sessionStorage.setItem('name', name)
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('password', password)
        // toast.success(res.data.message)
        navigate('/email-verify')              
      }
      } catch (error) {
        toast.error(error.response.data.message || error.message)   
        // console.log(error.response.data.message || error.message)
      }finally{
        setLoading(false)
      }
    }
  })

  return (
    <>
     {loading && <><Loading/></>} 
    <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="signup-form" id="forms">
            <h1 className="top-head">Create Account</h1>
            {/* User name input */}
            <div className="form-group form-groups">
                <input type="text" id="name" placeholder="Username" name='name' autoComplete="off" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.name && formik.errors.name ? (<div className="errorMes">{formik.errors.name}</div>) : null}
            </div>
           {/* User Email input */}
            <div className="form-group form-groups">
                <input type="text" id="email" placeholder="Email Id" name='email' autoComplete="off" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? (<div className="errorMes">{formik.errors.email}</div>) : null}
                
            </div>
            {/* User Password input */}
            <div className="form-group form-groups">
                 <div className="pass">
                    <input type={`${passwordType}`} id="password" placeholder="Password" name='password' autoComplete="off" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                 <div className="eye"><i onClick={()=>{passwordType === "password"?`${setPasswordType("text")} ${setToggleEye("fa-eye")}` : `${setPasswordType("password")} ${setToggleEye("fa-eye-slash")}`}} className={`fa-regular ${toggleEye}`}></i></div>
                    </div>
                {formik.touched.password && formik.errors.password ? (<div className="errorMes">{formik.errors.password}</div>) : null}
            </div>
            {/* User Confirm Password input */}
            <div className="form-group form-groups">
                <input type="password" id="cpassword" placeholder="Confirm Password" name='confirm_password' autoComplete="off" value={formik.values.confirm_password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.confirm_password && formik.errors.confirm_password ? (<div className="errorMes">{formik.errors.confirm_password}</div>) : null}
            </div>
            {/* User Data is Submiting to DB */}
            <div className="form-group form-groups">
                <button className='button ' type="submit" style={{ width: '100%', transform : `scale(${scale})` }} id="signUp" name='userName' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart}>
                    Sign Up
                </button>
                <div className="signUpPage">
                    <p>Already have an account?<Link to="/login" className="links"> Log in</Link></p>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default Signup