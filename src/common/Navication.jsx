import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../assets/style/navBar.css'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useLogout } from '../hook/useLogout'
import { jwtDecode } from 'jwt-decode'

const Navication = () => {
  const logout = useLogout()
  const location = useLocation()
    let [toggle, setToggle] = useState("")
    let [toggleMenu, setToggleMenu] = useState("")
    const [cartCount, setCartCount] = useState(0)
    const handleCart = async() =>{
      const token = localStorage.getItem('token')
      const decode = jwtDecode(token)
      // try {
      //   const res = await AxiosService.post(`${ApiRoutes.GET_ALL_CART.path}`, {user_id: `${decode.id}`}, {authenticate: ApiRoutes.GET_ALL_CART.authenticate})
      //   setCartCount(res.data.cartList.length)
      // } catch (error) {
        
      // }
    }
useEffect(()=>{
  handleCart()
},[])
  return (
   <>
   <header className='header-nav'>
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
                <div className={`nav-bar nav-menu-list ${toggle}`}>
                    <div className="item"><Link className={location.pathname === "/home" ? 'link active-tab' : `link`} to="/home">Home</Link></div>
                    <div className="item"><Link className={location.pathname === "/course" ? 'link active-tab' : `link`} to="/course">Courses</Link></div>
                    <div className="item"><Link className={location.pathname === "/buy-course" ? 'link active-tab' : `link`} to="/buy-course">Buy Course  <i className='mdi mdi-cart-outline'></i>{cartCount === 0 ? null : <span style={{background: "white", color: "black", fontSize: "13px", padding: "1px 5px", borderRadius: "50%"}}>{cartCount}</span>}</Link></div>
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