import React from 'react'
import '../../../assets/style/buy-course.css'
import CourseCart from './CourseCart'

const Buying = () => {
   
  return (
   <>   
<div className="bg-animate">
    <div className="glowing">    
        <span style={{"--i":1}}></span>    
        <span style={{"--i":2}}></span>    
        <span style={{"--i":3}}></span>    
    </div>
    <div className="glowing">    
        <span style={{"--i":1}}></span>    
        <span style={{"--i":2}}></span>    
        <span style={{"--i":3}}></span>
    </div>
    <div className="glowing">    
        <span style={{"--i":1}}></span>    
        <span style={{"--i":2}}></span>    
        <span style={{"--i":3}}></span>
    </div>
    <div className="glowing">    
        <span style={{"--i":1}}></span>    
        <span style={{"--i":2}}></span>    
        <span style={{"--i":3}}></span>
    </div>
</div>

          <CourseCart/>  
          <CourseCart/>  
          <CourseCart/>  
            

   </>
  )
}

export default Buying