import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './CartSlicer'
import CourseReducer from './CourseSlicer'
import CrouselReducer from './CrouselSlicer'
import loaderReducer from './loaderSlicer'
import UserReducer from './UserSlicer'

export default configureStore({
  devTools: true,
  reducer: {
      loading: loaderReducer,
      user: UserReducer,
      Course: CourseReducer,
      Crousel: CrouselReducer,
      Cart: CartReducer,      
  },
})