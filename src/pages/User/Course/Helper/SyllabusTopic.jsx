import React from 'react'

const SyllabusTopic = ({datas, styles, syllabusId}) => {
   
  return (
    <>
     <div className="accordion-content mb-5" style={{maxHeight: `${styles[syllabusId]}px`}} >
        <div className="accordion-content-block">
            <ul className="accordian-list">
                    {
                    datas.map((topics, id)=>{
                      return (
                            <li key={id} className="accordian-list__item">
                                <div className="accordian-content-card">
                                    <div className="accordian-content-card__info">
                                        <div className="accordian-content-card__icon"><i className='display-4 mdi mdi-presentation-play text-dark'></i></div>
                                        <div className="accordian-content-card__title text-dark">{topics.title}</div>
                                    </div>
                                    <div className="accordian-content-crd__link text-dark"></div>
                                </div>
                            </li>                     
                       )
                      })
                    }
             </ul>
        </div> 
        </div>    
    </>
  )
}

export default SyllabusTopic