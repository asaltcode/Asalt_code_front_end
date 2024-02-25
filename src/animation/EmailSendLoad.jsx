import React, { useEffect } from "react";
import animationData from "./json/EmailSendLoad.json";
import Lottie from "lottie-web";

const EmailSendLoad = () => {
  useEffect(() => {
    const container = document.getElementById("animation-containe");
    Lottie.loadAnimation({
      container,
      animationData,
      renderer: "svg", //or 'canvas'
      loop: true,
      autoplay: true,
    });
  }, []);

  return <>
   <div className="email-send-load d-flex justify-content-center align-items-center">
   <div id="animation-containe" className='overflow-hidden' style={{height: '400px', width: '400px', position: "fixed"}}></div>
   </div>
  </>
};

export default EmailSendLoad;
