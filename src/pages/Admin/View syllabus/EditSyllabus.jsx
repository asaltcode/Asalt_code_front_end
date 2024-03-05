import React, {useState, useEffect} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const EditSyllabus = () => {
  const navigate = useNavigate()
  const params = useParams()
  let [initialValues, setInitialValues] = useState(
      {
          title: "",
          visibility: "",
        }
  )
 
  const getAllSyllbus = async () =>{
      try {
          const res =  await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_ID.path}/${params.id}`,{authenticate: ApiRoutes.GET_SYLLABUS_BY_ID.authenticate})
          console.log(res.data)
          if(res.status === 200){
            const {title, visibility} = res.data.syllabus
            setInitialValues({title, visibility})
             }
      } catch (error) {
         console.log(error)
         toast.error(error.response.data.message || error.message)           
      }
  }


let formik = useFormik({ //Formik Validations
initialValues: initialValues,
validationSchema: Yup.object({
  title: Yup.string().required('Title is required').max(60,'Title can not exceed 30 characters').min(5,'Title can not be shorter than 5 leters'),
  visibility: Yup.string().required("Visibility is required"),
}),

enableReinitialize:true,
onSubmit: async (values) =>{
  const {id} = params;
  try {        
      const res = await AxiosService.put(`${ApiRoutes.EDIT_SYLLABUS_BY_ID.path}/${id}`,values, {authenticate: ApiRoutes.EDIT_SYLLABUS_BY_ID.authenticate})
      if(res.status === 200){
         toast.success(res.data.message)
         navigate('/admin/syllabus')
      }
  } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || error.message)   
  }
}
})
useEffect(()=>{
  getAllSyllbus()
},[params.id])

return (
  <>
  <div id='edit' className="col-12 grid-margin">
      <div  className="card">
          <div className="card-body">
              <h4 className="card-title">Edit The Syllabus</h4>
              <form onSubmit={formik.handleSubmit} className="form-sample">
                  <p className="card-description"> Course info </p>
                  <div className="row">
                      <div className="col-md-6">
                          <div className="form-group row">
                              <label className="col-sm-3 col-form-label text-light">Title</label>
                              <div className="col-sm-9">
                                  <input type="text" name='title' className="form-control text-light" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                  {formik.touched.title && formik.errors.title ? (<div className="errorMes">{formik.errors.title}</div>) : null}                                   
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
              
                   <button type="submit" className="btn btn-primary mr-2 text-dark">Submit</button>
                    <button className="btn btn-warning text-dark" onClick={()=> navigate("/admin/syllabus")}>Cancel</button>
              </form>
          </div>
      </div>
  </div>
  </>
)
}

export default EditSyllabus