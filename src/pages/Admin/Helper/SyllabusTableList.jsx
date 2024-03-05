import React from 'react'
import { useNavigate } from 'react-router-dom'

const SyllabusTableList = ({syllabus, setSyllabus, title, visibility, createdAt, id}) => {
    const scrollToElement = id =>  document.getElementById(id) && document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}) 

    const navigate = useNavigate()
    const findIndex = (array, id) =>{
      for(let i in array){
          if(array[i]._id === id)
          return i
      }
  }
  const handleEdit = async (id) =>{
     await navigate(`/admin/syllabus/edit/${id}`)
     scrollToElement('edit')
  }
  const handleDelete = async (id) =>{
      try {
          const index = findIndex(syllabus, id)
          let newArray = [...syllabus];
          newArray.splice(index, 1)
          const result = confirm(`Are you sure you want to delete this '${title}' syllabus?`);  
          if(result){
          setSyllabus(newArray)  
        //   const res = await AxiosService.delete(`${ApiRoutes.DEL_COURSE.path}/${id}`,{authenticate: ApiRoutes.DEL_COURSE.authenticate})
        //   if(res.status === 200)
        //     toast.error("User Delete successfully")      
          }
      } catch (error) {
          console.log(error)
      }
  }

  const handleTopic = async () =>{
    await navigate(`/admin/syllabus/topic/${id}`)
     scrollToElement('topic')
  }
    return (
      <>
      <tr>
              <td>
                  <div className="form-check form-check-muted m-0">
                      <input className="form-check-input" type="checkbox" />
                  </div>
              </td>
              <td>{title}</td>
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
              <td className='text-center'>        
                  <div style={{cursor: "pointer"}} onClick={()=>handleTopic(id)} className="badge bg-danger">
                        <i className="text-dark mdi mdi-vlc"></i> Topic              
                  </div>
              </td>    
                     
          </tr>
      </>
    )
}

export default SyllabusTableList