import React, {useEffect, useState} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const EditCarousel = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [syllabus_id, setSyllabusId] = useState("")
    let [initialValues, setInitialValues] = useState(
        {
            imageUrl: "",
            visibility: "",
            imageAlt: "",
            description: ""
        }
    )
   
const getTopic = async () =>{
    try {
        const res =  await AxiosService.post(`${ApiRoutes.GET_CAROUSEL_BY_ID.path}/${params.id}`,{authenticate: ApiRoutes.GET_CAROUSEL_BY_ID.authenticate})
        if(res.status === 200){
            setInitialValues(res.data.carousel)
            }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)           
    }
}
  
  
  let formik = useFormik({ //Formik Validations
  initialValues: initialValues,
  validationSchema: Yup.object({
    imageUrl: Yup.string().required('Image is required'),
    imageAlt: Yup.string().required("Image Alt is requird"),
    visibility: Yup.boolean().required("Visibility is required"),
    description: Yup.string().max(1000,'Description can not exceed 1000 characters').min(20,'Description can not be shorter than 20 leters')
  }),
  
  enableReinitialize:true,
  onSubmit: async (values) =>{
    const {id} = params;
    try {        
        const res = await AxiosService.put(`${ApiRoutes.EDIT_CAROUSEL.path}/${id}`,values, {authenticate: ApiRoutes.EDIT_CAROUSEL.authenticate})
        console.log(res)
        if(res.status === 200){
           toast.success(res.data.message)
           navigate(`/admin/carousel`)
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
                                    <label className="col-sm-3 col-form-label text-light">Image Url</label>
                                    <div className="col-sm-9">
                                        <input type="text" name='imageUrl' className="form-control text-light" value={formik.values.imageUrl} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        {formik.touched.imageUrl && formik.errors.imageUrl ? (<div className="errorMes">{formik.errors.imageUrl}</div>) : null}                                   
                                    </div>
                                </div>
                            </div>   
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-light">Image Alt</label>
                                    <div className="col-sm-9">
                                    <input type="text" name='imageAlt' className="form-control text-light" value={formik.values.imageAlt} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        {formik.touched.imageAlt && formik.errors.imageAlt ? (<div className="errorMes">{formik.errors.imageAlt}</div>) : null} 
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
                                <label className="col-sm-3 col-form-label text-light">Description</label>
                                <div className="col-sm-9">
                                   <textarea name='description' className="form-control text-light" id="exampleTextarea1" rows="4" value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange}></textarea>
                                    {formik.touched.description && formik.errors.description ? (<div className="errorMes">{formik.errors.description}</div>) : null} 
                                </div>
                            </div>        
                        </div>                      
                        </div>                             
                        <button type="submit" className="btn btn-primary mr-2 text-dark">Submit</button>
                        <button className="btn btn-warning text-dark" onClick={()=> navigate("/admin/carousel")}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditCarousel