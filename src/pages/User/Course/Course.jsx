import React from 'react'
import Cards from './Helper/Card'
import { useSelector } from 'react-redux'
// import '../../../style/course.css'

const Course = () => {
  const course = useSelector(state => state.Course)  
  return (
    <>
    <div className="container mt-4 mb-5">
        <div className="course-list-container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
          {
            course.map((e)=>{
              return <Cards datas={e} price={e.price} thumbnail={e.thumbnail} title={e.title} id={e._id} key={e._id}/>
            })
          }
        </div>
        </div>
    </div>
    </>
  )
}

export default Course