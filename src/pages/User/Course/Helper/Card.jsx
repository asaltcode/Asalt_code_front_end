import React from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({title, thumbnail, id}) => {
  const navigate = useNavigate()
 const handleSyllabus = (id) =>{
    navigate(`/course/disclosure/${id}`)
    console.log(id)
 }
  return (
    <>
      <div onClick={() => handleSyllabus(id)} className="col">
        <div className="card">
          <img
            src={thumbnail}
            className="card-img-top cart-image"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;