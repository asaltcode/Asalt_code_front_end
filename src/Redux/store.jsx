import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './CartSlicer'
import CourseReducer from './CourseSlicer'
import CrouselReducer from './CrouselSlicer'
import loaderReducer from './loaderSlicer'

export default configureStore({
  devTools: true,
  reducer: {
      loading: loaderReducer,
      Course: CourseReducer,
      Crousel: CrouselReducer,
      Cart: CartReducer,
  },
})