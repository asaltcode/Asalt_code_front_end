import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import SyllabusTableList from '../Helper/SyllabusTableList';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SyllabusTable = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [course, setCourse] = useState([])
    const [courseId, setCourseId] = useState("")
    const dateModle = (dateString) =>{
        const dateConvert = new Date(dateString);
        let d = dateConvert.toDateString().split(" ")
        return `${d[2]} ${d[1]} ${d[3]}`
        }
    const [syllabus, setSyllabus] = useState([])

    const findSyllabus = async (id) =>{
        try {
            const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID_ADMIN.path}/${id}`, {authenticate: ApiRoutes.GET_SYLLABUS_BY_COURSE_ID_ADMIN.authenticate})
            if(res.status === 200){
                setSyllabus(res.data.syllabus)
                // navigate('/admin/syllabus')                
            }
        } catch (error) {
            console.log(error)
                toast.error(error.response.data.message || error.message)   
        }
    }
   
    const getAllCourse = async () =>{
        try {
            const res = await AxiosService.post(ApiRoutes.GET_ALL_COURSE.path, {authenticate: ApiRoutes.GET_ALL_COURSE.authenticate})
            setCourse(res.data.courses)
            findSyllabus(res.data.courses[0]._id)            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)   
        }
    }

    useEffect(()=>{
        getAllCourse()
    },[location.pathname === "/admin/syllabus"])
  return (
    <>
    <div className="row">
    <div className="col grid-margin">
        <div className="card" style={{background : "#212529"}}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="card-title">Syllabus</div>
                    <div className="card-title d-flex">
                    <select name='course_id' className="form-control text-light" onChange={(e)=> findSyllabus(e.target.value)}>                       
                           <option>Select Couse</option>
                        {
                            course.map((data, index) =>{
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