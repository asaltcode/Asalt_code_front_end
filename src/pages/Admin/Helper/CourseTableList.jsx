import React from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { delCourse } from '../../../Redux/AdminActions/AdminCourseActions'

const CourseTableList = ({thumbnail, id , course, price, setCourse, title, category, visibility, createdAt}) => {
  const scrollToElement = id =>  document.getElementById(id) && document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}) 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const findIndex = (array, id) =>{
    for(let i in array){
        if(array[i]._id === id)
        return i
    }
}
const handleEdit = async (id) =>{
   await navigate(`/admin/course/edit/${id}`)
   scrollToElement('edit')
}
const handleDelete = async (id) =>{
  const result = confirm(`Are you sure you want to delete this '${title}' course?`);  
  if(result){
    dispatch(delCourse(id))
  }
}
  return (
    <>
    <tr>
            <td>
                <div className="form-check form-check-muted m-0">
                    <input className=
                    "form-check-input" type="checkbox" />
                </div>
            </td>
            <td>{title}</td>
            <td className='text-center'>
                <img src={thumbnail} alt="carousel image"  style={{height: "50px", width: "50px", objectFit: "cover", borderRadius: "10px"}} />               
            </td>
            <td>₹ {price}</td>
            <td>{category}</td>
            <td>{visibility 
              ? <><div className="badge  border rounded-5 text-success" style={{background: "#00D25B1C"}}>approval</div></> 
              : <><div className="badge  border rounded-5" style={{background: "#ffff0020", color: "yellow"}}>unapproval</div></>}
            </td>
            <td>{visibility 
              ? <><div className="badge  border rounded-5" style={{background: "#00a2ff21", color: "aqua"}}>Public</div></> 
              : <><div className="badge  border rounded-5 text-danger" style={{background: "#FC424A1C"}}>Private</div></>}
            </td>            
            <td>{createdAt}</td>
            <td>        
                <div style={{cursor: "pointer"}} onClick={()=>handleEdit(id)} className="badge bg-dark">
                      <i className="mdi text-primary mdi-pencil"></i>                   
                </div>
                &nbsp; &nbsp;
                <div style={{cursor: "pointer"}} onClick={()=>handleDelete(id)} className="badge bg-white">
                      <i className="mdi text-dark mdi-delete"></i>    
                </div>
            </td>            
        </tr>
    </>
  )
}

export default CourseTableList