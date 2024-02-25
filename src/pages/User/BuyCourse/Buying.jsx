import React from 'react'
import '../../../assets/style/buy-course.css'

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


<div className='course-title'>
        <h1 className='course-header'>Learn About Bug Bounty in Tamil</h1>
        <div className="buy-btn m-auto">
            <button className='btn text-light bg-primary p-3 rounded-pill mb-4'>Buy course for$ 4000</button>
        </div>
        <h6 className='text-center'>Instructor: Elangovan - Asalt Code Language: TAMIL</h6>
    </div>
    <hr className='text-light' />
    <div className='course-about'>
        <div className="about-box  px-sm-5 px-md-5">
            <h1 className='pt-4 pb-4'>About the course</h1>
            <p className='px-sm-5 px-md-5 text-start c-description'>In this course we have explained the following
                details clearly. You do not need to have any pre-requisites since every concepts are explained from the
                basic level.</p>
        </div>
    </div>
    <hr className='text-light' />
    <div className='syllabus'>
        <h1 className='py-4'>Syllabus</h1>
        <div className="syllabus-container">
            <div className="syllabus-box">
                <div className='syllabus-cart d-flex bg-dark justify-content-between flex-wrap'>
                    <div>Intrudction</div>
                    <div>Time</div>
                </div>

                <div className="syllabus-content-container ">
                    <div className='syllabus-content d-flex justify-content-between flex-wrap'>
                        <div>Intrudction</div>
                        <div>Time</div>
                    </div>
                    {/*
                    <hr className='text-light mx-5' /> */}
                    <div className='syllabus-content d-flex justify-content-between flex-wrap'>
                        <div>Intrudction</div>
                        <div>Time</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </>
  )
}

export default Buying