import React, {useEffect} from 'react'
import Lottie from 'lottie-web'
import animationData from './json/Forgotanimation.json'

const ForgotAnim = () => {
         // Specify the container and load the animation
         useEffect(() => {
            const container = document.getElementById("animation-container");
            Lottie.loadAnimation({
              container,
              animationData,
              renderer: "svg", //or 'canvas'
              loop: true,
              autoplay: true,
            });
          }, []); // Run the effect once when the component mounts
  return (

<div className="d-flex">
<div id='animation-container' className='overflow-hidden forgot-anim' ></div>
</div>
    //  style={{height: "90px", borderRadius: "50%", width: '90px', objectFit: "cover"}}

  )
}

export default ForgotAnim