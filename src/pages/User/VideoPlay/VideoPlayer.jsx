import React, { useEffect, useRef, useState } from 'react';
import '../../../assets/style/videoPlayer.css'
import CloudinaryVideoPlayer from "./CloudinaryVideoPlayer";
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { toast } from 'react-toastify';

const VideoPlayer = () => {
    let count = true
   const navigate = useNavigate()
   const [video, setVideo] = useState("")    
   const [syllabus, setSyllabus] = useState([])
   const params = useParams()
   const VideoUrlRef = useRef(null)

   const getPublic = (url) =>{
    const parts = url.split('upload/');
    const secondPart = parts[1];
    return secondPart.split('.mp4')[0];
   }
   
   const getSyllabus = async () =>{
    try {
        const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID.path}/${params.id}`)
        await setSyllabus(res.data.syllabus)
        setVideo(getPublic(res.data.syllabus[0].items[0].topic_video))
        console.log(res.data)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)   
    }
}

const getTopicVideo = async () =>{ 
    try {
   
    } catch (error) {
        
    }
   }
   const handleVideoClick = (topic_video) => {
    const publicId = getPublic(topic_video);
    setVideo(publicId);
};

//    ()=> VideoUrlRef.current = getPublic(topic.topic_video)
   useEffect(()=>{
    getSyllabus()
   },[])
  return (
    // <div className="container-fluid">
        <div className="container">
        <div className="row">
            <div className="col-md-8">
                <div className="form-group row">                               
                    <div className="col-sm-12"> 
                        <div className="video-box">
                            {/* <CloudinaryVideoPlayer publicId={video} cloudName={"dgnysns9a"} /> */}
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
                                            <div key={index} className="all_syllabus_topic">
                                                <div className="card-header">
                                                    {data.title}
                                                </div>
                                                <div className="card-topic-body">
                                                    {
                                                        data.items.map((topicVideo, i)=>{
                                                            return <h5 key={i} onClick={()=> handleVideoClick(topicVideo.topic_video)} style={{cursor: "pointer"}} className="card-title-topic">{topicVideo.title}</h5>
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
    </div>            
    // </div>
  );
};

export default VideoPlayer;
