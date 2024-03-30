import React, {useState, useEffect, useRef} from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../../assets/style/syllabus.css'
import SyllabusCard from './Helper/SyllabusCard';
import SyllabusTopic from './Helper/SyllabusTopic';
import Loading from '../../../animation/Loading';
import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../../Redux/Slices/CartsSlicer';
import BgAnimaiton from '../../../components/BgAnimaiton';
import {endLoading, onLoading} from "../../../Redux/loaderSlicer"
import { getCourse } from '../../../Redux/Actions/CourseActions';
import NotFound from '../../../animation/NotFound';
import { addCart } from '../../../Redux/Actions/CartsActions';
import MetaData from '../../../common/MetaData';
import { getSyllabus } from '../../../Redux/Actions/SyllabusActions';

const CourseDisclosure = () => {
    
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, error, course} = useSelector(state => state.courseState)
    const {syllabus} = useSelector(state => state.syllabusState)
    const {myCourses} = useSelector(state => state.paidState)
    const {carts} = useSelector(state => state.cartsState)
    const [paid, setPaid] = useState(false)

    const handleAddToCart = () =>{
        dispatch(addCart(params.id, carts))
       navigate("/purchase")
    }
//     const courses = useSelector(state => state.Course).filter(course => course._id === params.id)

//     const course = courses[0];
//     const user = useSelector(state => state.user)
    // const [syllabus, setSyllabus] =useState([{
    //     "_id": "65dd8384cfd089b46f341836",
    //     "title": "03). Xss bug",
    //     "course_id": "65d5c47f15c827cd3e062b91",
    //     "visibility": true,
    //     "createdAt": "2024-02-27T05:29:06.182Z",
    //     "items": [
    //         {
    //             "title": "1.) ( URL ) Uniform Resous Lo",
    //             "syllabus_id": "65dd8384cfd089b46f341836",
    //             "duration": 148.236133,
    //             "public_id": "courseVideo/topic-1709483317823"
    //         },
    //         {
    //             "title": "Https Interceapt",
    //             "syllabus_id": "65dd8384cfd089b46f341836",
    //             "duration": 763.239909,
    //             "public_id": "courseVideo/topic-1709553861859"
    //         },
    //         {
    //             "title": "Motivation",
    //             "syllabus_id": "65dd8384cfd089b46f341836",
    //             "duration": 17.966667,
    //             "public_id": "courseVideo/topic-1709554522946"
    //         }
    //     ]
    // }])
//     const [paid, setPaid] = useState(false)
    const [styles, setStyles] =useState(0)
//     const [loading, setLoading] = useState(null)
//     const getSyllabus = async () =>{  //Get all syllabus and topic by course id
//         setLoading(true)
//         try {
//             const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID_NORMAL.path}/${params.id}`, {authenticate: ApiRoutes.GET_SYLLABUS_BY_COURSE_ID_NORMAL.authenticate})
//             setSyllabus(res.data.syllabus)         
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response.data.message || error.message)   
//         }
//         finally{
//             setLoading(false)
//         }
//     }

    const formatTime = (duration) => {  //Video duration converter
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return  hours > 0 ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        :`${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`;
      }

    const handleToggleAccordion = ({syllabusId, totalTopics}) => {
       
    setStyles((prevStyles) => ({
        ...prevStyles,
        [syllabusId]: prevStyles[syllabusId] ? 0 : 100 * totalTopics
    }));
    };



const handlePaidStatus = (id) => {
   let status = myCourses &&  myCourses.filter(data => data._id === id)
   if( myCourses && status.length !== 0){
       setPaid(true)
    return
   }
   setPaid(false)
}

useEffect(()=>{
    dispatch(getCourse(params.id))
    dispatch(getSyllabus(params.id))
    handlePaidStatus(params.id)
},[])

useEffect(()=>{
   console.log()
},[error])
   
  return (
    <>
    {loading && <Loading/>}
    <div className="container">        
    <BgAnimaiton/>
   
    {!error ? <>
    {course &&   <div>
        <MetaData title={course.title}/>
                    <div className='course-title'>
                        <h1 className='course-header'>{course.title}</h1>
                        <div className="buy-btn m-auto">
                            {paid ? (
                                <button className='btn text-light bg-primary p-3 rounded-pill mb-4' onClick={() => navigate(`/video/${params.id}`)}>Continue</button>
                            ) : (
                                <button onClick={() => handleAddToCart("course._id")} className='btn btn-primary p-3 rounded-pill mb-4'>Buy course for ₹{course.price}</button>
                            )}
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
                </div>
            }
            <hr className='text-light' />
            <div className='syllabus'>
                <h1 className='py-4'>Syllabus</h1>
                <div className="syllabus-container">
                    <div className="syllabus container " id="container">
                        <div className="accordion-syllabus-item ">
                            {
                           syllabus && syllabus.map((data, index) =>{
                            return (
                            <div key={index}>
                                <SyllabusCard totalTopics={data.items.length} title={data.title} syllabusId={index} setStyles={handleToggleAccordion}
                                    isActive={styles[index]> 0} styles={styles}
                                    duration={formatTime(data.items.reduce((acc, cur)=> acc + cur.duration, 0))} />
                                <SyllabusTopic syllabusId={index} datas={data.items} styles={styles} />
                            </div> )})}
                        </div>
                    </div>
                </div>
            </div>
            </> : <NotFound/>}
        </div>
    </>
  )
}

export default CourseDisclosure