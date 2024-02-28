import React,{useEffect, useState} from 'react'
import AxiosService from '../../../../utils/AxiosService'
import ApiRoutes from '../../../../utils/ApiRoutes'
import { toast } from 'react-toastify'

const SyllabusCard = ( {title, styles, setStyles, duration, syllabusId, totalTopics}) => {
  const [active, setActive] = useState(false)
 const  handleShow = () =>{
    setActive(!active);
    setStyles({syllabusId, totalTopics: totalTopics}, active ? 0 : 200);
  }
    
  return (
   <>
   <header  onClick={handleShow} className={`accordion-syllabus-header mt-4 ${active ? 'active' : ''}`}>
        <h4 className="accordion-syllabus-header__title">
            <span></span>
            <p className='text-dark'>{title}<span className="text-primary show-sm" style={{fontSize: "14px"}}>{}</span></p>
        </h4>
        <div className="accordion-syllabus-header__info">
            <p className="text-primary hide-sm">{totalTopics} attachment(s) {duration}</p>
            <div style={{transform: `${active ? 'rotate(-90deg)' : 'rotate(0deg)'}`}} className="accordion-syllabus-header__icon text-primary">
                <i className='mdi mdi-arrow-left-drop-circle-outline text-dark'></i>
            </div>
        </div>
    </header>
   </>
  )
}

export default SyllabusCard