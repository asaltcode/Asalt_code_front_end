import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteCarousel } from '../../../Redux/Actions/CarouselActions'
import { useDispatch } from 'react-redux'

const CarouselTableList = ({imgUrl, imgCreate, id, visibility}) => {
    const dispatch = useDispatch()
    const scrollToElement = id =>  document.getElementById(id) && document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}) 
    const navigate = useNavigate()

    const handleEdit = async (id) =>{
       await navigate(`/admin/carousel/edit/${id}`)
       scrollToElement('edit')
    }
    const handleDelete = (id) => dispatch(deleteCarousel(id))

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