import React, { useEffect } from 'react'
import Cards from '../Course/Helper/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../../../Redux/Actions/CourseActions'
import BgAnimaiton from '../../../components/BgAnimaiton'

// import '../../../style/course.css'

const MyCourses = () => {
  const {loading, myCourses} = useSelector(state => state.paidState)
  // const course = useSelector(state => state.Courses)  
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getCourses())
  },[dispatch])
  return (
    <>
    <BgAnimaiton/>
    <div className="container mt-4 mb-5">
        <div className="course-list-container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
          {myCourses && myCourses.map((e)=>{
              return <Cards datas={e} price={e.price} thumbnail={e.thumbnail} title={e.title} id={e._id} key={e._id}/>
            })
          }
        </div>
        </div>
    </div>
    </>
  )
}

export default MyCourses