import React from 'react'
const UploadLoading = () => {
  return (
    <div   style={{position: "absolute", zIndex: "10", background: "rgba(0, 0, 0, 0.716)", height: "100vh", width: "100%", display: "flex", justifyContent: "center"  }}>
    <dotlottie-player src="https://lottie.host/b86709f8-52a5-42c4-aca0-f8bc15d9bc49/Easn5PmTTN.json" background="transparent" speed="1" style={{width: "300px", height: "300px"}} loop autoplay></dotlottie-player>
    </div>
  )
}

export default UploadLoading