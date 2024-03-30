import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import '../assets/style/navBar.css'
import { useLogout } from '../hook/useLogout'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/Actions/UserActions'


const Navication = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, isAuthenticated, error, user} = useSelector((state) => state.authState);
  const {carts} = useSelector(state => state.cartsState)
  const location = useLocation();
  const [toggle, setToggle] = useState("");
  const [toggleMenu, setToggleMenu] = useState("");
  const [profileShow, setProfileShow] = useState("");
  const PofileView = () => profileShow === "" ? setProfileShow("show") : setProfileShow("");

  const handleLogout = async () =>{
    await dispatch(logout)
    navigate("/login")
  }
  const handleAdmin = () =>{
    navigate("/admin")
  }
  return (
   <>
      <header className='header-nav'>
        <nav className='user_nav'>
            <h1 className="titleName">Asalt code</h1>
            <div id="line-box" onClick={()=>{toggle === ""? `${setToggle("navBarToggle")}${setToggleMenu('open')}` :
                `${setToggle("")} ${setToggleMenu("")}`}}>
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
                <div className="item">
                    <Link className={location.pathname==="/" ? 'link active-tab' : `link`} to="/">Home</Link>
                </div>
                <div className="item">
                    <Link className={location.pathname.includes('/course') ? 'link active-tab' : `link`}
                        to="/course">Courses</Link>
                </div>
                {isAuthenticated && isAuthenticated ?
                <div className="item">
                    <Link className={location.pathname.includes('/my-courses') ? 'link active-tab' : `link`}
                        to="/my-courses">My <i className="mdi mdi-laptop"></i></Link>
                </div>
                :null}
                <div className="item">
                    <Link className={location.pathname.includes("/buy-course") ? 'link active-tab' : `link`}
                        to="/buy-course">Buy <i className={`mdi mdi-cart-outline
                        ${location.pathname==="/buy-course" ? 'text-light' : ``} `}></i>{carts && carts.length === 0 ? null :
                    <span style={{background: "white" , color: "black" , fontSize: "13px" , padding: "1px 5px" ,
                        borderRadius: "50%" }}>{carts && carts.length}</span>}</Link>
                </div>


                {isAuthenticated && isAuthenticated ?
                <div className={`nav-item dropdown ${profileShow}`} onClick={PofileView}>
                    <a className="nav-link" id="profileDropdown" aria-expanded={"profileShow"==='show' ? true :
                        false} data-toggle="dropdown">
                        <div className="navbar-profile">
                            <img className="img-xs user-profile-image rounded-circle"
                                src={user.avatar??"../../public/defaultProfile.png"}
                                alt="" />
                        </div>
                    </a>
                    <div  className={`dropdown-menu dropdown-menu-right bg-dark text-light navbar-dropdown preview-list ${profileShow}`} aria-labelledby="profileDropdown">
                        <h6 className="p-2">Profile</h6>
                        <div className="dropdown-divider bg-secondary"></div>
                            <a onClick={()=>navigate("/profile/edit")} className="dropdown-item Cpointer preview-item bg-dark text-light list-group-item list-group-item-action ">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-dark rounded-circle">
                                        <i className="mdi mdi-account-circle text-success"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <p className="preview-subject mt-2">Profile</p>
                                </div>
                            </a>
                        <div className="dropdown-divider bg-secondary"></div>
                            <a onClick={handleLogout}
                                className="dropdown-item preview-item Cpointer bg-dark text-light list-group-item list-group-item-action">
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
                            {
                                user && user.role !== "admin" ? <></> : <>
                                    <a onClick={handleAdmin} className="dropdown-item Cpointer preview-item bg-dark text-light list-group-item list-group-item-action">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-dark rounded-circle">
                                                <i className="mdi mdi-view-dashboard text-warning"></i>
                                            </div>
                                        </div>
                                        <div className="preview-item-content ">
                                            <p className="preview-subject mt-2">DashBoard</p>
                                        </div>
                                    </a>
                                <div className="dropdown-divider bg-secondary"></div>
                             </>
                                
                            }
                        <p className="p-2 mb-0 text-center">Advanced settings</p>
                    </div>
                </div>
                :
                <div className="item">
                    <Link className={location.pathname==="/login" ? 'link active-tab' : `link`} to="/login">Log in</Link>
                </div>
                }
            </div>
        </nav>
      </header>
   </>
  )
}

export default Navication