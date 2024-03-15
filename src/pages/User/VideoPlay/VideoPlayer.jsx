import React, { useEffect, useRef, useState } from 'react';
import '../../../assets/style/videoPlayer.css'
import CloudinaryVideoPlayer from "./CloudinaryVideoPlayer";
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { toast } from 'react-toastify';
import Progress from '../../../common/ScrollProgress';
import { useDispatch } from 'react-redux';
import { endLoading, onLoading } from '../../../Redux/loaderSlicer';

const VideoPlayer = () => {
    let count = true
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [video, setVideo] = useState("")    
   const [videoTitle, setVideoTitle] = useState("")
   const [syllabus, setSyllabus] = useState([])
   const params = useParams()
   const [playList, setPlayList] = useState([])
   
   const getSyllabus = async () =>{
    try {
        dispatch(onLoading())
        const res = await AxiosService.post(`${ApiRoutes.GET_SYLLABUS_BY_COURSE_ID.path}/${params.id}`);
        setSyllabus(res.data.syllabus);
        const playlist = res.data.syllabus.reduce((acc, curr) => {
          curr.items.forEach(item => {
            acc.push({ public_id: item.public_id, title: item.title });
          });
          return acc;
        }, []);
        setPlayList(playlist);
        setVideo(playlist[0].public_id);
        setVideoTitle(playlist[0].title);
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)   
    }finally{
        dispatch(endLoading())
    }
}

const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

const handleVideoEnded = () => {
  if (currentVideoIndex < playList.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      console.log(currentVideoIndex)
  } else {
    // End of playlist, reset to first video
    setCurrentVideoIndex(0);
  }
};

   const handleVideoClick = (public_id, title) => {
    setVideo(public_id);
    setVideoTitle(title)
};


   useEffect(()=>{
    getSyllabus()
   },[])
  return (
    
    <div className="videoPlayer-main-container">
         <button className='button' onClick={()=>navigate("/course")} style={{marginTop: '10px', marginLeft: "10px", width: "50px" ,position: 'fixed'} }>
            <i className="fa-solid fa-arrow-left"></i>
        </button>
         <Progress/>
        {/* <div className="container"> */}
        <div className="row">       
            <div className="col-md-8">
                <div className="form-group row">                               
                    <div className="col-12"> 
                       <div className="video-box-wraper">
                       <div className="video-box">                          
                            {console.log(playList[currentVideoIndex])}
                            <CloudinaryVideoPlayer publicId={video} cloudName={"dgnysns9a"} onEnded={handleVideoEnded} />                   
                        </div>
                          <div className="video-header">
                             <h1>{videoTitle}</h1>
                          </div>
                       </div>
                           
                    </div>
                </div>
            </div>
            <div className="col-md-4 mt-md-5">
                <div className="form-group row">                               
                    <div className="col-sm-12">  
                        <div className="syllabus-container">
                            <div className="card rounded-3 syllabus-card">
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
                                                            return (
                                                                <div key={i} className='d-flex justify-content-between '>
                                                                    <div className="syllabus-topic-header col-11">
                                                                    <h5  onClick={()=> handleVideoClick(topicVideo.public_id, topicVideo.title)} style={{cursor: "pointer"}} className={`card-title-topic ${topicVideo.title === videoTitle ? "playing" : ""}`}>{topicVideo.title}</h5>
                                                                    </div>
                                                                    {topicVideo.title === videoTitle ? 
                                                                     <div id='play-wave-container' className='col-1'>  
                                                                        <span></span> <span></span>  
                                                                        <span></span> <span></span>                                                   
                                                                     </div>
                                                                    : ""}
                                                                </div>
                                                            )
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
