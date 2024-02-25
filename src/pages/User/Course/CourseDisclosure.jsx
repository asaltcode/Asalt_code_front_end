import React, {useState, useEffect} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SyllabusCard from './Helper/SyllabusCard';

const CourseDisclosure = () => {
    const navigator = useNavigate()
    const [course, setCourse] = useState({});
    const [syllabus, setSyllabus] =useState([])
    const [topic, setTopic] = useState([])
    const params = useParams()
    const getCourse = async () =>{
        try {
            const res = await AxiosService.post(`${ApiRoutes.GET_COURSE_BY_ID.path}/${params.id}`, {authenticate: ApiRoutes.GET_COURSE_BY_ID.authenticate})
            if(res.status === 200){
                setCourse(res.data.course)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)   
        }
    }
    const getSyllabus = async () =>{
        try {
            const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID.path}/${params.id}`)
            setSyllabus(res.data.syllabus)
            setTopic(res.data.topic)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)   
        }
    }
    useEffect(()=>{
        getCourse()
        getSyllabus()
    },[])
  return (
    <>
    <div className='course-title'>
            <h1 className='course-header'>{course.title}</h1>
            <div className="buy-btn m-auto">
                <button className='btn text-light bg-primary p-3 rounded-pill mb-4'>Buy course for$ 4000</button>
                <button className='btn text-light bg-primary p-3 rounded-pill mb-4' onClick={()=>navigator(`/video/${params.id}`)}>Continue</button>
            </div>
            <h6 className='text-center'>Instructor: {course.author} - Asalt Code Language: TAMIL</h6>
        </div>
        <hr className='text-light' />
        <div className='course-about'>
            <div className="about-box  px-sm-5 px-md-5">
                <h1 className='pt-4 pb-4'>About the course</h1>
                <p className='px-sm-5 px-md-5 text-start c-description'>{course.description}</p>
            </div>
        </div>
        <hr className='text-light' />
        <div className='syllabus'>
            <h1 className='py-4'>Syllabus</h1>
            <div className="syllabus-container">
                {
                    syllabus.map((data, index) =>{
                        return <div key={index} className="syllabus-box">
    {/* Show All Syllabus */}
                    <div className='syllabus-cart d-flex bg-warning justify-content-between flex-wrap'>
                        <div>{data.title}</div>
                        <div>Time</div>
                    </div>
    {/* Show All Topics */}
                <div className="syllabus-content-container ">
                        {
                            topic.map((topic, i)=>{
                            if(topic.syllabus_id === data._id){
                                return (
                                <div key={i}>
                                    <div className='syllabus-content d-flex justify-content-between flex-wrap'>
                                        <div>{topic.title}</div>
                                        <div>Time</div>
                                    </div>                    
                                    <hr className='text-light bg-dark mx-5' /> 
                                </div>)
                            }
                            })
                        }          
                    </div>
                </div>})
                }            
            </div>
        </div>
    </>
  )
}

export default CourseDisclosure