import React, {useEffect, useState} from 'react'
import "../../assets/style/Login.css"
// import "../style/signup.css"
import { useNavigate, Link } from 'react-router-dom'
import EmailVerifyAnim from '../../animation/EmailVerifyAnim'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { toast } from 'react-toastify'
import Loading from '../../animation/Loading'
import { clearAuthError, login } from '../../Redux/Actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'


// import useAuth from '../hook/useAuth'

const Login = () => {
    // const {setAuth} = useAuth()
    const dispatch = useDispatch()
    const {loading, error, isAuthenticated} = useSelector(state => state.authState)
    const navigate = useNavigate()
    const [toggleEye, setToggleEye] = useState("fa-eye-slash")
    const [passwordType, setPasswordType] = useState("password")
    const [scale, setScale] = useState(1);
    // const [loading, setLoading] = useState(null)
    const [beEmailError, setBeEmailError] = useState(null)
    const [bePasswordError, setBePasswordError] = useState(null)

    //Log in button clicking effect
    const handleMouseDown = () => setScale(0.9);
    const handleMouseUp = () => setScale(1);
    const handleTouchStart = () => setScale(0.9);

    const formik = useFormik({
      initialValues: {
        email: "",
        password : "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .matches(
              /^(.+)@(?!sparet\.com)(gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$/,
              'Email must be from Gmail, Outlook, Yahoo Mail, or Zoho Mail'
            )
            .required('Email is Required'),
        password: Yup.string().required('Password is Required'),
      }),
      onSubmit: async (values) =>{
        const {email, password} = values
       
        dispatch(login(email, password))
        //  try {
        //     setLoading(true)
        //     // const res = await AxiosService.post(ApiRoutes.LOG_IN.path, values, {authenticate: ApiRoutes.LOG_IN.authenticate})
        //     const res = await AxiosService.post("/auth/singin",values)
        //     localStorage.setItem('token', res.data.token)
        //     localStorage.setItem('name', res.data.name)
        //     console.log(res)
        //     if(res.status === 200){
        //         const user = await AxiosService.get(ApiRoutes.GET_USER.path, {authenticate : ApiRoutes.GET_USER.authenticate })
        //         if(res?.data?.role === 'admin' &&  user?.data?.user?.role === "admin"){
        //             navigate('/admin')              
        //         }
        //         else if(res?.data?.role === 'user' && user?.data?.user?.role === "user" ){
        //             navigate('/')
        //         }
        //     }
        //     else if(res.status === 202){
        //         toast.info(res.data.message)   
        //     }
           
        //  } catch (error) {
        //     console.log(error)
        //    toast.error(error.response.data.message || error.message)   
        //     error.response.data.field === 'email' ? setBeEmailError(error.response.data.message): setBePasswordError(error.response.data.message)            
        //  }finally{
        //     setLoading(false)
        //  }
      }
    })
  useEffect(()=>{
    if(isAuthenticated){
        navigate("/")
    }
    if(error){
      toast(error, {
        type: "error",
        onOpen: ()=> dispatch(clearAuthError)
      })
      return
    }
  },[isAuthenticated, error, dispatch])
  return (<>
  {loading ? <Loading/> : 
  <section>
        <button className='button' onClick={()=>navigate("/")} style={{marginTop: '20px', marginLeft: "30px", width: "50px" ,position: 'fixed'} }>
            <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="form-container">
            <form action="" onSubmit={formik.handleSubmit} className="form-box">
                <p className="top-head">Log in to Asalt Code</p>
                <div className="input-box">
                    <div className="form-group form-groups">
                        <input id="userId" type="text" name='email' placeholder="Email" autoComplete='off' value={formik.values.email} onBlur={formik.handleBlur} onFocus={()=> setBeEmailError(null)} onChange={beEmailError === null ? formik.handleChange: ()=>setBeEmailError(null)} />
                        {formik.errors.email && formik.touched.email ? <div className="errorMes text-start">{formik.errors.email}</div>: <div className="errorMes text-start">{beEmailError}</div>}
                    </div>
                    <div className="form-group form-groups m-3">
                        <div className="pass">
                            <input id="password" type={`${passwordType}`} name='password' placeholder="Password" autoComplete='off' value={formik.values.password} onBlur={formik.handleBlur} onFocus={()=> setBePasswordError(null)} onChange={bePasswordError === null ? formik.handleChange: ()=>setBePasswordError(null)} />
                            <div className="eye">
                                <i onClick={()=>{passwordType === "password"?`${setPasswordType("text")} ${setToggleEye("fa-eye")}` : `${setPasswordType("password")} ${setToggleEye("fa-eye-slash")}`}} className={`fa-regular ${toggleEye}`}></i>
                            </div>
                        </div>
                        {formik.errors.password && formik.touched.password ? <div className="errorMes text-start">{formik.errors.password}</div>: <div className="errorMes text-start">{bePasswordError}</div>}
                    </div>
                    <p>
                        <Link to="/forget-password" className='links'>Forget your password</Link>
                    </p>
                </div>
                <button className='button p-4' id="logIn" type='submit' style={{ width: '90%' , transform : `scale(${scale})` }} name='userName' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}onTouchStart={handleTouchStart}>Log in</button>
                <div className="signUpPage">
                    <p>Don't have an account? <span><Link className='links' to="/signup">Sign up and get started!</Link></span></p>
                </div>
            </form>
        </div>
    </section>
}
  </> )
}

export default Login