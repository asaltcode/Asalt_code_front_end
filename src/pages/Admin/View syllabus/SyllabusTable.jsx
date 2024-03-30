import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import AxiosService from '../../../utils/AxiosService';
import AdminApi from '../../../utils/ApiRouters/AdminApis';
import SyllabusTableList from '../Helper/SyllabusTableList';
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminCourses } from '../../../Redux/AdminActions/AdminCourseActions';

const SyllabusTable = () => {
    const dispatch = useDispatch()
    const {courses} = useSelector(state => state.adminCoursesState)
    const location = useLocation()
    const [syllabus, setSyllabus] = useState([])
    const dateModle = (dateString) =>{
        const dateConvert = new Date(dateString);
        let d = dateConvert.toDateString().split(" ")
        return `${d[2]} ${d[1]} ${d[3]}`
        }

    const findSyllabus = async (id) =>{    
        try {
           if(id === ""){
            findSyllabus(courses[0]._id)
            return
           }
            const {data} = await AxiosService.get(`${AdminApi.SYLLABUS_WITH_TOPIC.path}/${id}`)
            if(data){
                setSyllabus(data.syllabus)
            }
        } catch (error) {
            console.log(error)
                toast.error(error.response.data.message || error.message)   
        }
    }

    useEffect(()=>{
        dispatch(getAdminCourses)
    },[location.pathname === "/admin/syllabus"])
    useEffect(()=>{
        if(courses){
          findSyllabus(courses[0]._id)
        }
    },[courses])
  return (
    <>
    <div className="row">
    <div className="col grid-margin">
        <div className="card" style={{background : "#212529"}}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="card-title">Syllabus</div>
                    <div className="card-title d-flex">
                    <select name='course_id' className="form-control text-light" title="By default, it will choose the first one" onChange={(e)=> findSyllabus(e.target.value)}>                       
                           <option value="">Select Couse</option>
                        {
                            courses && courses.map((data, index) =>{
                                return <option key={index} value={data._id}>{data.title}</option>
                            })
                        }
                    </select>
                    </div>
                    <div className="card-title"></div>
                </div>
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
                                    <th>Approval</th>
                                    <th>Visibility</th>
                                    <th>Publisen Date</th>
                                    <th>Action</th>
                                    <th>View Topic</th>
                                </tr>
                            </thead>
                            <tbody>             
                               {/* Show all Table List */}
                                {
                                    syllabus.map((data, index) =>{
                                        return <SyllabusTableList key={index} syllabus={syllabus} setSyllabus={setSyllabus} id={data._id} title={data.title} visibility={data.visibility} createdAt={dateModle(data.createdAt)} />
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
</>
  )
}

export default SyllabusTable