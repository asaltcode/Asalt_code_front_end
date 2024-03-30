import React,{useState, useEffect} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const EditCourse = () => {
    const navigate = useNavigate()
    const params = useParams()
    let [initialValues, setInitialValues] = useState(
        {
            title: "",
            author: "",
            price: "",
            category: "",
            visibility: "",
            description: "",
            thumbnail: "",
          }
    )
   
    const getUser = async () =>{
        try {
            const res =  await AxiosService.get(`${ApiRoutes.GET_COURSE_BY_ID.path}/${params.id}`,{authenticate: ApiRoutes.GET_COURSE_BY_ID.authenticate})
            if(res.status === 200){
                const {title, author, price, category, visibility, description, thumbnail} = res.data.course
                 setInitialValues({title, author, price, category, description, visibility, thumbnail})             }
        } catch (error) {
           console.log(error)
           toast.error(error.response.data.message || error.message)           
        }
    }




let formik = useFormik({ //Formik Validations
initialValues: initialValues,
validationSchema: Yup.object({
    title: Yup.string().required('Title is required').max(30,'Title can not exceed 30 characters').min(5,'Title can not be shorter than 5 leters'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required').max(1000,'Description can not exceed 1000 characters').min(20,'Description can not be shorter than 20 leters'),
    visibility: Yup.string().required("Visibility is required"),
    author: Yup.string().required("Author is required").max(20,'Author name can not exceed 20 characters').min(3,'Author name can not be shorter than 3 leters'),
    thumbnail: Yup.string().required("Thubnail is required").url('Invalid URL')
    .test('is-image-url', 'Must be a valid image URL', (value) => {
      if (!value) {
        return true; // Allow empty value
      }
      return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value);
    }),
}),

author:Yup.string().required("Role is required"),
enableReinitialize:true,
onSubmit: async (values) =>{
    const {id} = params;
    try {        
        const res = await AxiosService.put(`${ApiRoutes.EDIT_COURSE_BY_ID.path}/${id}`,values, {authenticate: ApiRoutes.EDIT_COURSE_BY_ID.authenticate})
        if(res.status === 200){
           toast.success(res.data.message)
           navigate('/admin/course')
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
                <h4 className="card-title">Edit The Course</h4>
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
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Author</label>
                                <div className="col-sm-9">
                                <input type='text' name='author' className="form-control text-light" value={formik.values.author} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.author && formik.errors.author ? (<div className="errorMes">{formik.errors.author}</div>) : null} 
                           </div>
                        </div>
                        </div>                        
                    </div>
                    <div className="row">
                         <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Price</label>
                                <div className="col-sm-9">
                                    <input type="text" name='price' className="form-control text-light" value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.price && formik.errors.price ? (<div className="errorMes">{formik.errors.price}</div>) : null}
                                </div>
                            </div>
                        </div>                       
                         <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Category</label>
                                <div className="col-sm-9">
                                    <input type="text" name='category' className="form-control text-light" value={formik.values.category} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.category && formik.errors.category ? (<div className="errorMes">{formik.errors.category}</div>) : null}
                                </div>
                            </div>
                        </div>                       
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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Description</label>
                                <div className="col-sm-9">
                                   <textarea name='description' className="form-control text-light" id="exampleTextarea1" rows="4" value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange}></textarea>
                                    {formik.touched.description && formik.errors.description ? (<div className="errorMes">{formik.errors.description}</div>) : null} 
                                </div>
                            </div>        
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Thumbnail</label>
                                <div className="col-sm-9">
                                    <input type='text' name='thumbnail' className="form-control text-light" placeholder="https://image.jpg" value={formik.values.thumbnail} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.thumbnail && formik.errors.thumbnail ? (<div className="errorMes">{formik.errors.thumbnail}</div>) : null} 
                                </div>
                            </div>
                        </div>
                    </div>
                
                     <button type="submit" className="btn btn-primary mr-2 text-dark">Submit</button>
                      <button className="btn btn-warning text-dark" onClick={()=> navigate("/admin/course")}>Cancel</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default EditCourse