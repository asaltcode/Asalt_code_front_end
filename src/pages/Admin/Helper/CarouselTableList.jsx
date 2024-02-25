import React from 'react'

const CarouselTableList = ({imgUrl, imgCreate, id , carousel, setCarousel}) => {
    const findIndex = (array, id) =>{
        for(let i in array){
            if(array[i]._id === id)
            return i
        }
    }
    const handleEdit = async () =>{

    }
    const handleDelete = async (id) =>{
        try {
            const index = findIndex(carousel, id)
            let newArray = [...carousel];
            newArray.splice(index, 1)
            setCarousel(newArray)
            
        } catch (error) {
            
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
            <td>{imgCreate}</td>
            <td>

            <div style={{cursor: "pointer"}} onClick={()=>handleEdit()} className="badge bg-dark">
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