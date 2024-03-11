import React, { useState, useEffect, useRef } from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import UploadLoading from '../../../animation/UploadLoading'

const AddTopic = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(null)
    const [file, setFile] = useState(null);
    const [courseUrl, setCourseUrl] = useState("")
    // const [duration, setDuration] = useState("")
    // const [courseId, setCourseId] = useState("")
    // const [public_id, setPublic_id] = useState("")
    const [syllabus, setSyllabus] = useState([])
    const [course, setCourse] = useState([])
    const urlRef = useRef({duration: "", topic_video_id: "", public_id: "", video_url: ""})

    let initialValues ={
        title: "",
        visibility: true,
        syllabus_id: "",
        topic_video: "",
      }

// const getSyllabus = async() =>{
//     try {
//       const res = await AxiosService.post(ApiRoutes.GET_ALL_SYLLABUS.path, {authenticate: ApiRoutes.GET_ALL_SYLLABUS.authenticate})
//       if(res.status === 200){
//         setSyllabus(res.data.syllabus)
//       }
//     } catch (error) {
//         console.log(error)
//     }
//     }
    
const onChange = (e) => {
setFile(e.target.files[0]);
};
const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
    },
    };


let handleUpload = async (e) =>{ // handle video upload
    setLoading(true)
  try {
    const file = e.target.files[0]
    const formData = new FormData();
          formData.append('topic', file);
          console.log(formData)
          if(file){
            const res = await AxiosService.post(ApiRoutes.VIDEO_UPLOAD.path, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            if(res.status === 200){
                toast.success("file upload successfully")
                console.log(res.data)
                // setCourseUrl(res.data.url)
                urlRef.current = {
                     duration: res.data.duration,
                     topic_video_id: res.data.id,
                     public_id: res.data.public_id}
                // setCourseId(res.data.id)
                // setDuration(res.data.duration)
                // setPublic_id(res.data.public_id)
               }
          }else{
            toast.error("Select file")
          }      
      
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message || error.message)     
  }finally{
    setLoading(false)
  }
}

const  getCourse = async () =>{
    try {
     const res = await AxiosService.post(ApiRoutes.GET_ALL_COURSE.path, {authenticate: ApiRoutes.GET_ALL_COURSE.authenticate})            
         setCourse(res.data.courses)
         } catch (error) {
             console.log(error)
            toast.error(error.response.data.message || error.message)   
         }
 }

const findSyllabus = async (id) =>{
    console.log(id)
    try {
        const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID_ADMIN.path}/${id}`, {authenticate: ApiRoutes.GET_SYLLABUS_BY_COURSE_ID_ADMIN.authenticate})
        console.log(res.data)
        if(res.status === 200){
            setSyllabus(res.data.syllabus)
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
    visibility: Yup.bool().required("Visibility is required"),
    topic_video: Yup.string().required("File is required")    
}),

author:Yup.string().required("Role is required"),
enableReinitialize:true,
onSubmit: async (values,  { resetForm }) =>{
   try {
     values.topic_video = urlRef.current.video_url
     const res = await AxiosService.post(ApiRoutes.ADD_TOPIC.path, {...values,  topic_video_id: courseId, duration, public_id}, {authenticate: ApiRoutes.ADD_TOPIC.authenticate})
     if(res.status === 200){
         toast.success("Topic Added Successufully")
         resetForm(initialValues)
     }
   } catch (error) {
    console.log(error)
    toast.error(error.response.data.message || error.message)     
   }
}
})

useEffect(()=>{
    getCourse()   
},[])
  return (
    <>
     {loading && <UploadLoading/>}
     {`hit ${urlRef.current}`}
     {console.log(urlRef.current)}
    <div id='edit' className="col-12 grid-margin">
        <div  className="card">
            <div className="card-body">
                <h4 className="card-title">Add Topics</h4>
                <form onSubmit={formik.handleSubmit} className="form-sample" encType='multipart/form-data'>
                    <p className="card-description">Topic info </p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Topic</label>
                                <div className="col-sm-9">
                                    <input type="text" name='title' className="form-control text-light" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.title && formik.errors.title ? (<div className="errorMes">{formik.errors.title}</div>) : null}                                   
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
                                <label className="col-sm-3 col-form-label text-light">Courses</label>
                                <div className="col-sm-9">
                                    <select className="form-control text-light" onChange={(e)=>findSyllabus(e.target.value)}>
                                        <option value="">Select Course</option>   
                                        {
                                            course.map((data, index)=>{
                                                return <option key={index} value={data._id}>{data.title}</option>   
                                            })
                                        }                                    
                                    </select>
                                </div>
                            </div>
                        </div>      
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-light">Syllabus</label>
                                <div className="col-sm-9">
                                    <select name='syllabus_id' className="form-control text-light" onChange={formik.handleChange} value={formik.values.syllabus_id}>
                                        <option value="">Select Syllabus</option>   
                                        {
                                            syllabus.map((data, index)=>{
                                                return <option key={index} value={data._id}>{data.title}</option>   
                                            })
                                        }                                    
                                    </select>
                                    {formik.touched.syllabus_id && formik.errors.syllabus_id ? (<div className="errorMes">{formik.errors.syllabus_id}</div>) : null} 
                                </div>
                            </div>
                        </div>     
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label htmlFor="file" className="col-sm-3 col-form-label text-light">File upload</label>
                                <div className="col-sm-9">
                                    {/* <input type="file" id="video" name="video" onChange={(event) => formik.setFieldValue(field.name, event.currentTarget.files[0])} className="form-control-file"/> */}
                                    {/* <input type="file" id="video" name="video" onChange={(e)=> formik.setFieldValue( "video" , e.currentTarget.files[0])} className="form-control-file"/>
                                    <div className="input-group mt-2">
                                        <input type="text" className="form-control"  disabled placeholder="Upload Image"/>
                                        <button className="btn btn-primary" type="button">Upload</button>
                                    </div> */}

                               <input id="file" name="topic_video" type="file" accept="video/mp4" onChange={handleUpload} className="form-control" />
                               {/* <button className='btn btn-warning text-dark rounded-3 p-2' type='button' onClick={handleUpload}>Upload</button> */}
                               {courseUrl !== "" || formik.errors.topic_video ? (<div className="errorMes">{formik.errors.topic_video}</div>) : null} 
                                </div>
                            </div>
                        </div>
                    </div>
                      <button type="submit" className="btn btn-success mr-2 rounded-3 p-2 text-black">Add Topic</button>
                      <button className="btn btn-primary rounded-3 p-2" onClick={()=> navigate("/admin/course")}>Cancel</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default AddTopic
