import React, {useState, useEffect} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from "../../../utils/ApiRoutes"
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const EditUser = () => {
    const navigate = useNavigate()
    const params = useParams()
    let [initialValues, setInitialValues] = useState(
        {
            name: "",
            lastName: "",
            email: "",
            gender: "",
            dob: "",
            role: "",
          }
    )
   
    const getUser = async () =>{
        try {
            const res =  await AxiosService.get(`${ApiRoutes.GET_USER_BY_ID.path}${params.id}`,{authenticate: ApiRoutes.GET_USER_BY_ID.authenticate})
            let {name, lastName, email, gender, dob, role} = res.data.user;
            dob == null || undefined ? dob = 'dd-mm-yyyy' : dob
            setInitialValues({name, lastName, email, gender, dob, role}); 
            console.log(res.data.user)  
        } catch (error) {
           console.log(error)
           toast.error(error.response.data.message || error.message)           
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
//   dob: Yup.date()
// .max(new Date(), 'Date of birth must be in the past')
// .test('is-adult', 'You must be at least 18 years old', function (value) {
//     const today = new Date();
//     const birthDate = new Date(value);
//     const age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age >= 18;
// }),
}),

role:Yup.string().required("Role is required"),
enableReinitialize:true,
onSubmit: async (values) =>{
    const {id} = params;
    try {
        
        const res = await AxiosService.put(`${ApiRoutes.EDIT_USER.path}${id}`,values, {authenticate: ApiRoutes.EDIT_USER.authenticate})
        if(res.status === 200){
           toast.success(res.data.message)
           navigate('/admin')
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)   
    }
}
})



useEffect(()=>{
    getUser()
},[params.id])

  return (
    <>
    <div id='edit' className="col-12 grid-margin">
        <div  className="card">
            <div className="card-body">
                <h4 className="card-title">Horizontal Two column</h4>
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
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Role</label>
                                <div className="col-sm-9">
                                    <select name='role' className="form-control text-light" onChange={formik.handleChange} value={formik.values.role}>
                                        <option value="">Select Role</option>                
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {formik.touched.role && formik.errors.role ? (<div className="errorMes">{formik.errors.role}</div>) : null} 
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Membership</label>
                                <div className="col-sm-4">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="membershipRadios"
                                                id="membershipRadios1" value="" checked /> Free </label>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="membershipRadios"
                                                id="membershipRadios2" value="option2" /> Professional </label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    {/* <p className="card-description"> Address </p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Address 1</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control text-light" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">State</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control text-light" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Address 2</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control text-light" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Postcode</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control text-light" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">City</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control text-light" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Country</label>
                                <div className="col-sm-9">
                                    <select className="form-control text-light">
                                        <option>America</option>
                                        <option>Italy</option>
                                        <option>Russia</option>
                                        <option>Britain</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div> */}
                     <button type="submit" className="btn btn-primary mr-2 text-dark">Submit</button>
                      <button className="btn btn-warning text-dark" onClick={()=> navigate("/admin")}>Cancel</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default EditUser