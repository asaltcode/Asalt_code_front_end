import React, { useEffect } from "react";
import Lottie from "lottie-web";
import animationData from "./json/NotFoundAnimation.json";

const NotFound = () => {
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

  return (
    <>
      <div style={{position: "relative", zIndex: "10", height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        {/* <dotlottie-player src="https://lottie.host/28337e10-c481-41fc-96f1-560f5d64a908/Fm7xbiwwky.json" background="transparent" speed="1" style={{width: "300px", height: "300px"}} loop autoplay></dotlottie-player> */}
        <div id="animation-containe" className="overflow-hidden" style={{ height: "300px", width: "300px" }}></div>
      </div>
    </>
  );
};

export default NotFound;