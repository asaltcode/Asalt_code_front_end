import React from 'react'
import '../assets/style/loading.css'

const Loading = () => {
  return (
    // <div className='d-flex justify-content-center align-items-center' style={{height: "100vh", width : "100%", position: "absolute", zIndex: "100", background : "rgba(0, 0, 0, 0.216)", filter: ""}} >
    //     <dotlottie-player src="https://lottie.host/ee725ede-a3b3-4fb6-bf6c-65a6ef6b8a66/QC0H0mLGm7.json" background="transparent" speed="1" style={{width: "300px", height: "300px", filter: "drop-shadow(0 0 10px pink)"}} loop autoplay></dotlottie-player>
    // </div>
    <div className="loading">
    <div className="loader"></div>
  </div>
  )
}

export default Loading


