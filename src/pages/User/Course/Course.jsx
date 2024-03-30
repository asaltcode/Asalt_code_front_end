import React, { useEffect } from 'react'
import Cards from './Helper/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../../../Redux/Actions/CourseActions'
// import '../../../style/course.css'

const Course = () => {
  const {loading, courses} = useSelector(state => state.coursesState)
  // const course = useSelector(state => state.Courses)  
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getCourses())
  },[dispatch])
  return (
    <>
    <div className="container mt-4 mb-5">
        <div className="course-list-container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
          {courses && courses.map((e)=>{
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