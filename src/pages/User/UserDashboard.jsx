import React, { useEffect } from "react";
import Navication from "../../common/Navication";
import Footer from "../../common/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLoading, endLoading } from "../../Redux/loaderSlicer";
import { loadUser } from "../../Redux/Actions/UserActions";
import { getCarts } from "../../Redux/Actions/CartsActions";
import { getMyCourses } from "../../Redux/Actions/MyCouseActions";


const UserDashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.authState);
  // const {carts} = useSelector((state) => state.cartsState)

  // const Loader = useSelector((state) => state.loading);

  useEffect(() => {    
    if(isAuthenticated){
      dispatch(getCarts);
      dispatch(getMyCourses);
      return ()=>{}
    }
  }, [isAuthenticated]);
  // const dispatch = useDispatch()
  // const location = useLocation()
  // const getUser = async () =>{
  //   try {
  //     dispatch(onLoading)
  //     const res = await AxiosService.get(ApiRoutes.GET_USER.path, {authenticate: ApiRoutes.GET_USER.authenticate})
  //     if(res.status === 200){
  //       dispatch(saveUser(res.data.user))
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }finally{
  //     dispatch(endLoading())
  //   }
  // }
  // const getCarousel = async () =>{
  //   dispatch(onLoading())
  //   try {
  //     const res = await AxiosService.get(ApiRoutes.GET_CAROUSEL.path, {authenticate: ApiRoutes.GET_CAROUSEL.authenticate})
  //   if(res.status === 200){
  //     dispatch(saveCrousel(res.data.image))
  //   }
  //   } catch (error) {
  //     console.log(error)
  //   }finally{
  //     dispatch(endLoading())
  //   }
  // }
  // const getAllCart = async () =>{
  //   try {
  //       const res = await AxiosService.get(ApiRoutes.GET_ALL_CART.path, { authenticate: ApiRoutes.GET_ALL_CART.authenticate });
  //           if (res.status === 200) {
  //               dispatch(saveAllCart(res.data.cartList));
  //           }
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }
  // const getCourse = async () =>{
  //   try {
  //     dispatch(onLoading())
  //     const res = await AxiosService.get(ApiRoutes.GET_COURSE.path)
  //     if(res.status === 200){
  //        dispatch(setAllCourse(res.data.course))
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error.response.data.message || error.message)   
  //   }finally{
  //     dispatch(endLoading())
  //   }
  // }
  // useEffect(()=>{
  //   getUser()
  //   getCarousel()
  //   getAllCart()
  //   getCourse()
  // },[])
  return (
    <>
      <div className="user-container">
        {/* {location.pathname.includes("/purchase") ? <></> : <Navication /> } */}
        <Navication />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
