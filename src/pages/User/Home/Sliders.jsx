import React,{useEffect} from 'react'
import '../../../assets/style/swiper.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import {Autoplay, EffectCoverflow, Pagination,  Navigation } from 'swiper/modules';
import {useDispatch, useSelector } from 'react-redux';
import { getCarousels } from '../../../Redux/Actions/CarouselActions';
import { toast } from 'react-toastify';
import Loading from "../../../animation/Loading"
const Sliders = () => {
  const dispatch = useDispatch()
  const {carousels, loading, error} = useSelector(state => state.carouselsState)
  useEffect(()=>{
    if(error){
      toast.error(error)
     return () => {}; 
    }
    dispatch(getCarousels())
  },[error, dispatch])
  return (
    <>
     {loading ? <Loading/>: <div className="container-fluid">
        <Swiper effect={'coverflow'} grabCursor={true}  centeredSlides={true} loop={true} autoplay={{ delay: 1500, disableOnInteraction: false, }} slidesPerView={"auto"} coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, }} 
        pagination={{ el: '.swiper-pagination' , clickable: true }} navigation={{nextEl: '.swiper-button-next' , prevEl: '.swiper-button-prev' , clickable: true, }} modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} className="swiper_container"> 
            {/* Show all Slider images */}
            <SwiperSlide><img src="https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" /></SwiperSlide>
            {carousels && carousels.map( (images, index) =>(<SwiperSlide key={index}><img src={images.imageUrl} alt={images.imageAlt} /></SwiperSlide>))}
            <SwiperSlide><img src="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600" /></SwiperSlide>
          <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                  <ion-icon name="arrow-forward-outline"><i className="fa-solid fa-arrow-left"
                          style={{color: "#000000" }}></i></ion-icon>
                  <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                  <ion-icon name="arrow-forward-outline"><i className="fa-solid fa-arrow-right"
                          style={{color: "#000000" }}></i></ion-icon>
              </div>
              <div className="swiper-pagination"></div>
          </div>
        </Swiper>
    </div>}
    </>
  )
}

export default Sliders