import React, {useState, useEffect} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import CourseTableList from '../Helper/CourseTableList';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const CourseTable = () => {
    const location = useLocation()
    const dateModle = (dateString) =>{
      const dateConvert = new Date(dateString);
      let d = dateConvert.toDateString().split(" ")
      return `${d[2]} ${d[1]} ${d[3]}`
      }
    const [course, setCourse] = useState([])
    const getAllCourse = async ()=>{
        try {
            const res = await AxiosService.post(ApiRoutes.GET_ALL_COURSE.path, {authenticate: ApiRoutes.GET_ALL_COURSE.authenticate})
            
            setCourse(res.data.courses)
        } catch (error) {
            console.log(error)
           toast.error(error.response.data.message || error.message)   
        }
    }

    useEffect(()=>{
        getAllCourse()
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
                                    <th>Category</th>
                                    <th>Approval</th>
                                    <th>Visibility</th>
                                    <th>Publisen Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>                           
                                {
                                    course.map((data, index) =>{
                                        return <CourseTableList key={index} thumbnail={data.thumbnail} course={course} setCourse={setCourse} title={data.title} category={data.category} visibility={data.visibility}
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
</div>
  )
}

export default CourseTable