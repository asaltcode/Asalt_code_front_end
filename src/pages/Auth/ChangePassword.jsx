import React,{useState} from 'react'
import { useFormik } from 'formik'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
import '../../assets/style/change_password.css'
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import EmailSendLoad from '../../animation/EmailSendLoad'
import { useDispatch } from 'react-redux'
import MetaData from '../../common/MetaData'
import { loadUser } from '../../Redux/Actions/UserActions'
const ChangePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const param = useParams()
  const [disable, setDisabled] = useState(true)
  const [loading, setLoading] = useState(null)
  // const { userEmail } = useContext(UserEmailContext)
  let formik = useFormik({ //Formik Validations
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
          .matches(/^(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
          .matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
          .matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
          .matches(/^(?=.*[!@#$%^&*()_+])/, { message: 'Password must contain at least one special character' })
          .min(6, 'Password must be at least 6 characters long')
          .required('Password is required'),
      confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required'),    
    }),
    onSubmit: async(values)=>{
      const token = param.token  
      try {
        setLoading(true)
          const res = await AxiosService.post(`${ApiRoutes.RESET_PASSWORD.path}/${token}`, values)
          if(res.status === 201){
            toast.success("Password Changed Successfully!", {position: "top-center"})
            await dispatch(loadUser)
            navigate('/')
          }else{
            navigate('/forget-password');
          }
      } catch (error) {
        toast.error(error.response.data.message || error.message, {position: "bottom-center"})   
        navigate('/forget-password');
      }finally{
        setLoading(false)
      }
    }
  })
  return (<>
      {loading && <EmailSendLoad/>}
      <MetaData title={"Password Reset"}/>
    <div className="bg-dark text-light otp-container">
        <div className="otp-input-box">
            <header>
                <h4>Change your password</h4>
            </header>
            <div className="otp-inputs">
                <form className="otp-form" onSubmit={formik.handleSubmit}>
                    <label className='cp_label' style={{alignSelf: "self-start" }}>New password :</label>
                    {formik.touched.password && formik.errors.password ? (<div className="errorMes"> {formik.errors.password}</div>) : null}
                        <div className="input-box">
                           <input type="text" className='text-center change_password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>
                    <label className='cp_label' style={{alignSelf: "self-start" }}>Confirm password :</label>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className="errorMes"> {formik.errors.confirmPassword}</div>) : null}
                        <div className="input-box">
                            <input type="text" className='text-center change_password' name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>
                    <button type="submit" className={`btn text-light bg-primary m-auto`}>Change</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default ChangePassword