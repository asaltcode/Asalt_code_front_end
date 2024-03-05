import React from "react";
import { useNavigate } from "react-router-dom";
import '../../../../assets/style/course.css'

const Cards = ({title, thumbnail, id, price}) => {
  const navigate = useNavigate()
 const handleSyllabus = (id) =>{
    navigate(`/course/disclosure/${id}`)
 }
  return (
    <>
      <div onClick={() => handleSyllabus(id)} className="col">
        <div className="card bg-light course-card">
          <img  src={thumbnail} className="card-img-top cart-image course-thumbnail" alt="..."
          />
          <div className="card-body pb-0">
            <h5  className="card-titl course-card-title text-dark">{title}</h5>  
            <p className="text-primary">₹ {price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;