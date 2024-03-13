import React from 'react'

const CourseCart = () => {
    const handleDelete = () =>{

    }
  return (
    <div>
        <div className="row">
            <div className="col-3 fw-light">
                <img style={{borderRadius: "20px" , boxShadow: "0 0 10px" , objectFit: 'cover' }}
                    src={"data.thumbnail"} height={"60px"} width={'80px'} alt="image" />
            </div>
            <div className="col-7 fw-light ">
                <p className='text-start'>{"data.title"}</p>
                <p className='text-start text-muted'>Life Time </p>
            </div>
            <div className="col-2 fw-light text-end">
                <p> ₹ {"data.price"}</p>
                <p><i onClick={()=> handleDelete(index, data.course_id, data.user_id)} style={{cursor:
                        "pointer"}} className='mdi mdi-delete-forever fs-6 text-danger'></i></p>
            </div>
        </div>
        <hr className='bg-light' />
    </div>
  )
}

export default CourseCart