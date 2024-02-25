import React, { useEffect, useRef, useState } from 'react';
import '../../../assets/style/videoPlayer.css'
import CloudinaryVideoPlayer from "./CloudinaryVideoPlayer";
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { toast } from 'react-toastify';

const VideoPlayer = () => {
   const navigate = useNavigate()
   const [video, setVideo] = useState("")    
   const [syllabus, setSyllabus] = useState([])
   const [topic, setTopic] = useState([])
   const params = useParams()
   const getTopicVideo = async () =>{

   

    try {
        
    } catch (error) {
        
    }
   }
   const getSyllabus = async () =>{
    try {
        const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID.path}/${params.id}`)
        console.log(res.data)
        setSyllabus(res.data.syllabus)
        setTopic(res.data.topic)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)   
    }
}
   useEffect(()=>{
    getTopicVideo()
    getSyllabus()
   },[])
  return (
    <div className="container-fluid">
        <div className="row">
                        <div className="col-md-8">
                            <div className="form-group row">                               
                                <div className="col-sm-12"> 
                                    <div className="video-box">
                                        <CloudinaryVideoPlayer publicId={video} cloudName={"dgnysns9a"} />
                                    </div>                                                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group row">                               
                                <div className="col-sm-12">  
                                    <div className="syllabus-container">
                                        <div className="card syllabus-card">
                                            {
                                                syllabus.map((data, index)=>{
                                                    return (
                                                       <div className="all_syllabus_topic">
                                                            <div className="card-header">
                                                                {data.title}
                                                            </div>
                                                            <div className="card-topic-body">
                                                                {
                                                                    topic.map((topic, i) =>{
                                                                            const getPublic = (url) =>{
                                                                            const parts = url.split('upload/');
                                                                            const secondPart = parts[1];
                                                                            return secondPart.split('.mp4')[0];
                                                                           }
                                                                        if(topic.syllabus_id === data._id){
                                                                      return <h5 onClick={()=>setVideo(getPublic(topic.topic_video))} style={{cursor: "pointer"}} className="card-title-topic">{topic.title}</h5>
                                                                        }
                                                                    })
                                                                }                                                                                                                   
                                                            </div>
                                                       </div>
                                                    )
                                                })
                                            }                                          
                                        </div>
                                    </div>                                  
                                </div>
                            </div>
                        </div>
                    </div>
        <div className="col">
            <div className="row">
            </div>
        </div>
    </div>
  );
};

export default VideoPlayer;
