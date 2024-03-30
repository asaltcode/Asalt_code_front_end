import React, {useState, useEffect} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import CourseTableList from '../Helper/CourseTableList';
import { toast } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminCourses } from '../../../Redux/AdminActions/AdminCourseActions';

const CourseTable = () => {
    const  dispatch = useDispatch()
    const {courses, error} = useSelector(state => state.adminCoursesState)
    const location = useLocation()
    const dateModle = (dateString) =>{
      const dateConvert = new Date(dateString);
      let d = dateConvert.toDateString().split(" ")
      return `${d[2]} ${d[1]} ${d[3]}`
      }
    const [course, setCourse] = useState([])

    useEffect(()=>{
        if(error){
            toast.error(error) 
        }  
    }, [error])
    useEffect(()=>{
        dispatch(getAdminCourses)
    },[location.pathname === "/admin/course"])
  return (
    <div className="row">
    <div className="col grid-margin">
        <div className="card" style={{background : "#212529"}}>
            <div className="card-body">
                <h4 className="card-title">Courses</h4>
                <div className="table-responsive">
                    <ScrollContainer horizontal className="scroll-container">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="form-check form-check-muted m-0">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </th>
                                    <th>Title</th>
                                    <th>Thumbnail</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Approval</th>
                                    <th>Visibility</th>
                                    <th>Publisen Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>                           
                                {
                                   courses && courses.map((data, index) =>{
                                        return <CourseTableList key={index} thumbnail={data.thumbnail} price={data.price} course={course} setCourse={setCourse} title={data.title} category={data.category} visibility={data.visibility}
                                        id={data._id} createdAt={dateModle(data.createdAt)} />
                                    })
                                }                               
                            </tbody>
                        </table>
                    </ScrollContainer>
                </div>
            </div>
        </div>
    </div>
    <Outlet/>
</div>
  )
}

export default CourseTable