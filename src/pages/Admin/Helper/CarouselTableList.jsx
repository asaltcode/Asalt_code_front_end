import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CarouselTableList = ({imgUrl, imgCreate, id , carousel, setCarousel, visibility}) => {
    const scrollToElement = id =>  document.getElementById(id) && document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}) 

    const navigate = useNavigate()
    const findIndex = (array, id) =>{
        for(let i in array){
            if(array[i]._id === id)
            return i
        }
    }
    const handleEdit = async (id) =>{
       await navigate(`/admin/carousel/edit/${id}`)
       scrollToElement('edit')
    }
    const handleDelete = async (id) =>{
        try {
            const index = findIndex(carousel, id)
            let newArray = [...carousel];
            newArray.splice(index, 1)
            setCarousel(newArray)
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)    
        }
    }

  return (
   <>
          <tr>
            <td>
                <div className="form-check form-check-muted m-0">
                    <input className="form-check-input" type="checkbox" />
                </div>
            </td>
            <td>
                <img src={imgUrl} alt="carousel image"  style={{height: "50px", width: "50px", objectFit: "cover", borderRadius: "10px"}} />               
            </td>
            <td>{visibility 
                ? <><div className="badge  border rounded-5 text-success" style={{background: "#00D25B1C"}}>approval</div></> 
                : <><div className="badge  border rounded-5" style={{background: "#ffff0020", color: "yellow"}}>unapproval</div></>}
            </td>
            <td>{visibility 
                ? <><div className="badge  border rounded-5" style={{background: "#00a2ff21", color: "aqua"}}>Public</div></> 
                : <><div className="badge  border rounded-5 text-danger" style={{background: "#FC424A1C"}}>Private</div></>}
              </td>   
            <td>{imgCreate}</td>
            <td>

            <div style={{cursor: "pointer"}} onClick={()=>handleEdit(id)} className="badge bg-dark">
                    <i className="mdi text-primary mdi-pencil"></i>                   
                </div>&nbsp; &nbsp;
                <div style={{cursor: "pointer"}} onClick={()=>handleDelete(id)} className="badge bg-white">
                  <i className="mdi text-dark mdi-delete"></i>    
                </div>
            </td>
            <td style={{textWrap: "wrap"}}><a href={imgUrl} target='_blank'>Image Link</a></td>
        </tr>
   </>
  )
}

export default CarouselTableList