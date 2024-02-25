import React, { useEffect, useState } from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const AddSyllbus = () => {
    const navigate = useNavigate()
    const [course, setCourse] = useState([])
    let initialValues ={
            title: "",
            visibility: true,
            course_id: "",          
          }

let formik = useFormik({ //Formik Validations
initialValues: initialValues,
validationSchema: Yup.object({
    title: Yup.string().required('Title is required').max(30,'Title can not exceed 30 characters').min(5,'Title can not be shorter than 5 leters'),
    visibility: Yup.bool().required("Visibility is required"),
    course_id: Yup.string().required("Course is required"),
}),

author:Yup.string().required("Role is required"),
enableReinitialize:true,
onSubmit: async (values,  { resetForm }) =>{
   try {
       const res = await AxiosService.post(ApiRoutes.ADD_SYLLABUS.path, values, {authentication: ApiRoutes.ADD_SYLLABUS.authenticate})
    console.log(values)
       if(res.status === 200){
           toast.success(res.data.message)
        }
    resetForm(initialValues)
   } catch (error) {
    console.log(error)
    toast.error(error.response.data.message || error.message)     
   }
}
})


const  getCourse = async () =>{
   try {
    const res = await AxiosService.post(ApiRoutes.GET_ALL_COURSE.path, {authenticate: ApiRoutes.GET_ALL_COURSE.authenticate})            
        setCourse(res.data.courses)
        console.log(res.data.courses)
        } catch (error) {
            console.log(error)
           toast.error(error.response.data.message || error.message)   
        }
}

useEffect(()=>{
    getCourse()
},[])
  return (
    <>
    <div id='edit' className="col-12 grid-margin">
        <div  className="card">
            <div className="card-body">
                <h4 className="card-title">Add Syllabus</h4>
                <form onSubmit={formik.handleSubmit} className="form-sample">
                    <p className="card-description"> Syllabus info </p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Syllabus Title</label>
                                <div className="col-sm-9">
                                    <input type="text" name='title' className="form-control text-light" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.title && formik.errors.title ? (<div className="errorMes">{formik.errors.title}</div>) : null}                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                           <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Course</label>
                                <div className="col-sm-9">
                                    <select name='course_id' className="form-control text-light" onChange={formik.handleChange} value={formik.values.course_id}>
                                        <option value="">Select course</option>
                                        {
                                            course.map((data, index) =>{
                                               return <option key={index} value={data._id}>{data.title}</option>
                                            })
                                        }
                                    </select>
                                    {formik.touched.course_id && formik.errors.course_id ? (<div className="errorMes">{formik.errors.course_id}</div>) : null} 
                                </div>
                            </div>     
                        </div>                                           
                    </div>
                    <div className="row">                                         
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Visibility</label>
                                <div className="col-sm-9">
                                    <select name='visibility' className="form-control text-light" onChange={formik.handleChange} value={formik.values.visibility}>
                                        <option value={true}>Public</option>
                                        <option value={false}>Private</option>
                                    </select>
                                    {formik.touched.visibility && formik.errors.visibility ? (<div className="errorMes">{formik.errors.visibility}</div>) : null} 
                                </div>
                            </div>
                        </div>                        
                    </div>                
                     <button type="submit" className="btn btn-success mr-2 rounded-3 p-2 text-black">Add Syllabus</button>
                      <button className="btn btn-primary rounded-3 p-2" onClick={()=> navigate("/admin/course")}>Cancel</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default AddSyllbus