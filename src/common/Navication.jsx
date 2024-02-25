import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../assets/style/navBar.css'
import { useLogout } from '../hook/useLogout'

const Navication = () => {
  const logout = useLogout()
  const location = useLocation()
    let [toggle, setToggle] = useState("")
    let [toggleMenu, setToggleMenu] = useState("")
  return (
   <>
   <header>
   <nav className='user_nav'>                
               <h1 className="titleName">Asalt code</h1>
               <div id="line-box" onClick={()=>{toggle === ""? `${setToggle("navBarToggle")}${setToggleMenu('open')}` : `${setToggle("")} ${setToggleMenu("")}`}}>
                <div id="nav-icon2" className={`${toggleMenu}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
               </div>
                <div className={`nav-bar ${toggle}`}>
                    <div className="item"><Link className={location.pathname === "/home" ? 'link active-tab' : `link`} to="/home">Home</Link></div>
                    <div className="item"><Link className={location.pathname === "/course" ? 'link active-tab' : `link`} to="/course">Courses</Link></div>
                    <div className="item"><Link className={location.pathname === "/buy-course" ? 'link active-tab' : `link`} to="/buy-course">Buy Course</Link></div>
                    {localStorage.getItem('token') ? 
                    <div className="item"><Link className= 'link' onClick={()=> logout()} to="/login">Logout</Link></div>:
                    <div className="item"><Link className={location.pathname === "/login" ? 'link active-tab' : `link`} to="/login">Log in</Link></div>
                  }
                </div>
            </nav>
   </header>
   </>
  )
}

export default Navication