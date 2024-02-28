import React, {useState, useEffect, useRef} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../../assets/style/syllabus.css'
import SyllabusCard from './Helper/SyllabusCard';
import SyllabusTopic from './Helper/SyllabusTopic';

const CourseDisclosure = () => {
    const navigator = useNavigate()
    const [course, setCourse] = useState({});
    const [syllabus, setSyllabus] =useState([])
    const [show, setShow] = useState(0)
    const params = useParams()
    const [styles, setStyles] =useState(0)
    const getCourse = async () =>{ // Get course datas
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
    const getSyllabus = async () =>{  //Get all syllabus and topic by course id
        try {
            const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID.path}/${params.id}`)
            setSyllabus(res.data.syllabus)         
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)   
        }
    }

    const formatTime = (duration) => {  //Video duration converter
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return  hours > 0 ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        :`${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`;
      }

      const handlDropDown = (i) =>{
         setShow(100)
      }

    const handleToggleAccordion = ({syllabusId, totalTopics}) => {
       
    setStyles((prevStyles) => ({
        ...prevStyles,
        [syllabusId]: prevStyles[syllabusId] ? 0 : 100 * totalTopics
    }));
    };
     
useEffect(()=>{
    getCourse()
    getSyllabus()
},[])
   
  return (
    <>
    <div className="container">
            <div className='course-title'>
                <h1 className='course-header'>{course.title}</h1>
                <div className="buy-btn m-auto">
                    <button className='btn text-light bg-primary p-3 rounded-pill mb-4'>Buy course for ₹{course.price}</button>
                    <button className='btn text-light bg-primary p-3 rounded-pill mb-4'
                        onClick={()=>navigator(`/video/${params.id}`)}>Continue</button>
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
                    <div className="syllabus container " id="container">
                        <div className="accordion-syllabus-item ">
                            {
                            syllabus.map((data, index) =>{
                            return (
                            <div key={index}>
                                <SyllabusCard onClick={()=> console.log("hi")} totalTopics={data.items.length} title={data.title} syllabusId={index} setStyles={handleToggleAccordion}
                                    isActive={styles[index]> 0} styles={styles}
                                    duration={formatTime(data.items.reduce((acc, cur)=> acc + cur.duration, 0))} />
                                <SyllabusTopic syllabusId={index} datas={data.items} styles={styles} />
                            </div> )})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CourseDisclosure