import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { updateProfile } from '../Redux/Actions/UserActions'
import Loading from '../animation/Loading'
import { toast } from 'react-toastify'


const EditProfile = () => {
    const dispatch = useDispatch()
    const {user, error, loading} = useSelector(state => state.authState)
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("../../public/defaultProfile.png");


    let [initialValues, setInitialValues] = useState(
        {
            name: "",
            lastName: "",
            email: "",
            gender: "",
            dob: "",
          }
    )


    const onChangeAvatar = (e) =>{
        if(e.target.name === "avatar"){
           const reader = new FileReader
           reader.onload = () =>{
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(e.target.files[0])
            }
           }
           reader.readAsDataURL(e.target.files[0])
        }else{
            setInitialValues({...initialValues, [e.target.name]:e.target.value})
        }
    }
   
let formik = useFormik({ //Formik Validations
initialValues: initialValues,
validationSchema: Yup.object({
    name:Yup.string().required('Name is required').max(20,'Name can not exceed 20 characters').min(3,'Name can not be shorter than 3 leters'),
    lastName:Yup.string().required('Name is required').max(20,'Name can not exceed 20 characters').min(1,'Name can not be shorter than 3 leters'),
    email: Yup.string().email('Invalid email address').matches(/^(.+)@(?!sparet\.com)(gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$/,
    'Email must be from Gmail, Outlook, Yahoo Mail, or Zoho Mail').required('Email is required'),
    gender: Yup.string().max(20,'Name can not exceed 20 characters').min(4,'Name can not be shorter than 3 leters'),
    role: Yup.string().required("Role is required"),
}),

role:Yup.string().required("Role is required"),
enableReinitialize:true,
onSubmit: async (values) =>{
    const {email, name, lastName, gender, dob} = values
    const formData = new FormData();
    formData.append('name', name)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('gender', gender)
    formData.append('dob', dob)
    formData.append('avatar', avatar)
    
    dispatch(updateProfile(formData))    
}
})


useEffect(()=>{
    if(user){
        setInitialValues(user)
    }
    if(error){
        toast.error(error)
    }
}, [user, error])
  return (
    <>
    {loading && <Loading/>}
    <div style={{minHeight: "100vh"}} className="edit-profile overflow-hidden d-flex align-items-md-center bg-dark">
        <div id='edit' className="col-12 grid-margin">
            <div  className="card">
                <div className="row">
                <div className="card-body col-md-4 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img className="rounded-circle user-profile-image mt-5 object-fit-cover" src={user && user.avatar ? user.avatar : "../../public/defaultProfile.png"} height="150" width="150"  />
                        <span className="font-weight-bold text-light">{user && user.name}</span>
                        <span className="text-primary">{user && user.email}</span>
                        {/* <span>United States</span> */}
                    </div>
                </div>
                <div className="card-body col-md-8">
                    <div className="d-flex justify-content-between">
                    <div onClick={()=>navigate("/")} className="d-flex flex-row Cpointer align-items-center back">
                        <i className="mdi mdi-arrow-left mb-2 "></i>                            
                    <h5 className="text-light">Back to home</h5>
                    </div>
                    <h5 className="card-title">Edit Profile</h5>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="form-sample">
                        <p className="card-description"> Personal info </p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-light">First Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" name='name' className="form-control text-light" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        {formik.touched.name && formik.errors.name ? (<div className="errorMes">{formik.errors.name}</div>) : null}                                   
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-light">Last Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" name='lastName' className="form-control text-light" value={formik.values.lastName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        {formik.touched.lastName && formik.errors.lastName ? (<div className="errorMes">{formik.errors.lastName}</div>) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-light">Email</label>
                                    <div className="col-sm-9">
                                        <input type="text" name='email' className="form-control text-light" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        {formik.touched.email && formik.errors.email ? (<div className="errorMes">{formik.errors.email}</div>) : null} 
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-light">Gender</label>
                                    <div className="col-sm-9">
                                        <select name='gender' className="form-control text-light" onChange={formik.handleChange} value={formik.values.gender}>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        {formik.touched.gender && formik.errors.gender ? (<div className="errorMes">{formik.errors.gender}</div>) : null} 
                                    </div>
                                </div>
                            </div>                        
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-light">Date of Birth</label>
                                    <div className="col-sm-9">
                                        <input type='date' name='dob' className="form-control text-light" placeholder="dd/mm/yyyy" value={formik.values.dob} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        {formik.touched.dob && formik.errors.dob ? (<div className="errorMes">{formik.errors.dob}</div>) : null} 
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className='form-group row'>
                                    <label htmlFor='avatar_upload' className='col-form-label text-light col-sm-3'>Avatar</label>
                                    <div className='d-flex align-items-center col-sm-9'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img src={avatarPreview} className='rounded-circle mt-2 user-profile-image object-fit-cover img-xs' alt='Avatar Preview'/>
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input type='file' name='avatar' className='custom-file-input' id='customFile' accept='image/' onChange={onChangeAvatar}/>
                                            <label className='custom-file-label col-form-label' htmlFor='customFile'>Choose Avatar</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <button type="submit" className="btn btn-primary mr-2 text-dark">Submit</button>
                        <button className="btn btn-warning text-dark" onClick={()=> navigate("/")}>Cancel</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default EditProfile