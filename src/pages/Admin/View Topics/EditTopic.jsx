import React, {useState, useEffect} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const EditTopic = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [syllabus_id, setSyllabusId] = useState("")
    let [initialValues, setInitialValues] = useState(
        {
            title: "",
            visibility: "",
            public_id: ""
        }
    )
   
const getTopic = async () =>{
    try {
        const res =  await AxiosService.post(`${ApiRoutes.GET_TOPIC_BY_ID.path}/${params.id}`,{authenticate: ApiRoutes.GET_TOPIC_BY_ID.authenticate})
        if(res.status === 200){
            const {title, visibility, public_id, syllabus_id} = res.data.topic
            setInitialValues({title, visibility, public_id})
            setSyllabusId(syllabus_id)
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
    visibility: Yup.boolean().required("Visibility is required"),
    public_id: Yup.string().required("Public Id is requird")
  }),
  
  enableReinitialize:true,
  onSubmit: async (values) =>{
    const {id} = params;
    try {        
        const res = await AxiosService.put(`${ApiRoutes.EDIT_TOPIC.path}/${id}`,values, {authenticate: ApiRoutes.EDIT_TOPIC.authenticate})
        console.log(res)
        if(res.status === 200){
           toast.success(res.data.message)
           navigate(`/admin/syllabus/topic/${syllabus_id}`)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)   
    }
  }
  })
  useEffect(()=>{
    getTopic()
  },[])
  
  return (
    <>
        <div id='edit' className="col-12 grid-margin">
            <div  className="card">
                <div className="card-body">
                    <h4 className="card-title">Edit The Topic</h4>
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
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-light">Public Id</label>
                                    <div className="col-sm-9">
                                    <input type="text" name='public_id' className="form-control text-light" value={formik.values.public_id} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        {formik.touched.public_id && formik.errors.public_id ? (<div className="errorMes">{formik.errors.public_id}</div>) : null} 
                                    </div>
                                </div>
                            </div>                        
                        </div>                             
                        <button type="submit" className="btn btn-primary mr-2 text-dark">Submit</button>
                        <button className="btn btn-warning text-dark" onClick={()=> navigate(`/admin/syllabus/topic/${syllabus_id}`)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditTopic