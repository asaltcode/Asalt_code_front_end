import React, { useState, useEffect} from 'react'
import '../assets/style/scrollProgress.css'

const Progress = () => {
    const [scrollPercentage, setScrollPercentage] = useState(1)
    useEffect(()=>{
        const handleScroll = () =>{
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;
            const scrollPrecent = (scrollY / (documentHeight - windowHeight)* 100)
            setScrollPercentage(scrollPrecent)
        }
        window.addEventListener("scroll", handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll)
        }
        
    },[])
  return (
    <>
    <div id='scrollPath'></div>
    <div id='progressbar' style={{height: `${scrollPercentage}%` }}></div>
    </>
  )
}

export default Progress