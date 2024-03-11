import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../assets/style/navBar.css'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useLogout } from '../hook/useLogout'
import { jwtDecode } from 'jwt-decode'

const Navication = () => {
  const logout = useLogout()
  const navigate = useNavigate()
  const location = useLocation()
    let [toggle, setToggle] = useState("")
    let [toggleMenu, setToggleMenu] = useState("")
    const [cartCount, setCartCount] = useState(0)
    const [profileShow, setProfileShow] = useState("")
    const PofileView = () => profileShow === "" ? setProfileShow('show') : setProfileShow("")
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
                    <div className="item"><a className={location.pathname === "/" ? 'link active-tab' : `link`} onClick={()=>navigate("/")}>Home</a></div>
                    <div className="item"><Link className={location.pathname === "/course" ? 'link active-tab' : `link`} to="/course">Courses</Link></div>
                    <div className="item"><Link className={location.pathname === "/buy-course" ? 'link active-tab' : `link`} to="/buy-course">Buy Course  <i className={`mdi mdi-cart-outline ${location.pathname === "/buy-course" ? 'text-light' : ``} `}></i>{cartCount === 0 ? null : <span style={{background: "white", color: "black", fontSize: "13px", padding: "1px 5px", borderRadius: "50%"}}>{cartCount}</span>}</Link></div>


                    {localStorage.getItem('token') ?         
                      <div className={`nav-item dropdown  ${profileShow}`}  onClick={PofileView} >
                        <a className="nav-link" id="profileDropdown" aria-expanded={"profileShow" === 'show'? true : false} data-toggle="dropdown">
                          <div className="navbar-profile">
                            <img className="img-xs user-profile-image rounded-circle" src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt=""/>            
                          </div>
                        </a>
                        <div className={`dropdown-menu dropdown-menu-right bg-dark text-light navbar-dropdown preview-list ${profileShow}`} aria-labelledby="profileDropdown">
                          <h6 className="p-2">Profile</h6>
                          <div className="dropdown-divider bg-secondary"></div>
                          <a className="dropdown-item preview-item bg-dark text-light list-group-item list-group-item-action ">
                            <div className="preview-thumbnail">
                              <div className="preview-icon bg-dark rounded-circle">
                                <i className="mdi mdi-settings text-success"></i>
                              </div>
                            </div>
                            <div className="preview-item-content">
                              <p className="preview-subject mt-2">Settings</p>
                            </div>
                          </a>
                          <div className="dropdown-divider bg-secondary"></div>
                          <a onClick={useLogout()} className="dropdown-item preview-item bg-dark text-light list-group-item list-group-item-action">
                            <div className="preview-thumbnail">
                              <div className="preview-icon bg-dark rounded-circle">
                                <i className="mdi mdi-logout text-danger"></i>
                              </div>
                            </div>
                            <div className="preview-item-content ">
                              <p className="preview-subject mt-2">Log out</p>
                            </div>
                          </a>
                          <div className="dropdown-divider bg-secondary"></div>
                          <p className="p-2 mb-0 text-center">Advanced settings</p>
                        </div>
                      </div>                    
                   :
                    <div className="item"><Link className={location.pathname === "/login" ? 'link active-tab' : `link`} to="/login">Log in</Link></div>
                  }
                </div>
            </nav>
   </header>
   </>
  )
}

export default Navication