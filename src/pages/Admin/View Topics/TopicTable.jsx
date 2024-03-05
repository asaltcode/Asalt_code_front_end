import React, {useState, useEffect} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { Outlet, useLocation, useParams} from 'react-router-dom';
import TopicTableList from '../Helper/TopicTableList';
import { toast } from 'react-toastify';

const TopicTable = ({id}) => {
    const params = useParams()
    const [topic, setTopic] = useState([])
    const location = useLocation()
    const formatTime = (duration) => {  //Video duration converter
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return  hours > 0 ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        :`${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`;
      }
    const dateModle = (dateString) =>{
        const dateConvert = new Date(dateString);
        let d = dateConvert.toDateString().split(" ")
        return `${d[2]} ${d[1]} ${d[3]}`
        }
    const getAllTopics = async () =>{
        try {
            const res = await AxiosService.post(`${ApiRoutes.GET_TOPIC_BY_SYLLABUS_ID.path}/${params.id}`, {authenticate : ApiRoutes.GET_TOPIC_BY_SYLLABUS_ID.authenticate})
            if(res.status === 200){
                setTopic(res.data.topic)
            }
        } catch (error) {
            console.log(error)
            toast.error("Not Found")
        }
    }
    useEffect(()=>{
        getAllTopics()
    },[params])
    return (
        <>
        {/* <div  className="row"> */}
        <div id='topic' className="col grid-margin">
            <div className="card" style={{background : "#212529"}}>
                <div className="card-body">
                    <h4 className="card-title">Topics</h4>
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
                                        <th>Duration</th>                                      
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>             
                                    {/* <SyllabusTableList/> */}
                                   
                                    {
                                        topic.map((data, index) =>{
                                            return  <TopicTableList key={index} topic={topic} setTopic={setTopic} id={data._id} title={data.title} visibility={data.visibility} createdAt={dateModle(data.createdAt)} duration={formatTime(data.duration)} />
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
    {/* </div> */}
        </>
      )
}

export default TopicTable