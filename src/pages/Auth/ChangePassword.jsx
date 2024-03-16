import React,{useState ,useContext} from 'react'
import { UserEmailContext } from '../../context/UserEmailContextCoponent'
import { useFormik } from 'formik'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
// import '../style/change_password.css'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
const ChangePassword = () => {
  const navigate = useNavigate()
  const [disable, setDisabled] = useState(true)
  const { userEmail } = useContext(UserEmailContext)
  let formik = useFormik({ //Formik Validations
    initialValues: {
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
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
    onSubmit: async(values)=>{
      const data = {...values, email: userEmail}
      try {
        if(userEmail){
          const res = await AxiosService.post(ApiRoutes.CHANGE_PASSWORD.path, data, {authenticate: ApiRoutes.CHANGE_PASSWORD.authenticate})
          res.status === 200 && userEmail !== "" ? (navigate('/login'), toast.success(res.data.message)) : navigate('/forget-password');
        } else{
          toast.error(`What you are trying is the wrong way`)
          navigate('/forget-password')
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <div className="bg-dark text-light otp-container">      
    <div className="otp-input-box">
      <header>
        <h4>Change your password</h4>
      </header>
      <div className="otp-inputs">
        <form className="otp-form" onSubmit={formik.handleSubmit}>
          <label className='cp_label' style={{alignSelf: "self-start"}}>New password :</label>
        {formik.touched.confirm_password && formik.errors.password ? (<div className="errorMes">{formik.errors.password}</div>) : null}
        <input type="text" className='text-center change_password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label className='cp_label' style={{alignSelf: "self-start"}}>Confirm password :</label>
        {formik.touched.confirm_password && formik.errors.confirm_password ? (<div className="errorMes">{formik.errors.confirm_password}</div>) : null}
        <input type="text" className='text-center change_password' name='confirm_password' value={formik.values.confirm_password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <button type="submit"  className={`btn text-light bg-primary m-auto`}>Change</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ChangePassword