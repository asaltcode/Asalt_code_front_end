import React from 'react'
import AxiosService from '../../../../utils/AxiosService'
import ApiRoutes from '../../../../utils/ApiRoutes'

const SyllabusCard = ({title, id, topic}) => {
    let list = topic
  return (
    <div className="syllabus-box">{/* Show All Syllabus */}
                <div className='syllabus-cart d-flex bg-warning justify-content-between flex-wrap'>
                    <div>{title}</div>
                    <div>Time</div>
                </div>
                      {/* Show All Topics */}
                <div className="syllabus-content-container ">                      
                    <div className='syllabus-content d-flex justify-content-between flex-wrap'>
                        <div>Intrudction</div>
                        <div>Time</div>
                    </div>                    
                    <hr className='text-light bg-dark mx-5' />           
                </div>
            </div>
  )
}

export default SyllabusCard