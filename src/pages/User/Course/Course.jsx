import React, { useState , useEffect} from 'react'
import Cards from './Helper/Card'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { toast } from 'react-toastify';
import Loading from '../../../animation/Loading';
// import '../../../style/course.css'

const Course = () => {
  const [courseData, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const getCourse = async () =>{
    try {
      setLoading(true)
      const res = await AxiosService.post(ApiRoutes.GET_COURSE.path)
      if(res.status === 200){
         setCourse(res.data.course)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || error.message)   
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getCourse()
  },[])
  return (
    <>
   {loading && <Loading/>}
    <div className="container mt-4 mb-5">
        <div className="course-list-container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
          {
            courseData.map((e)=>{
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