import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './CartSlicer'
import CourseReducer from './CourseSlicer'
import CrouselReducer from './CrouselSlicer'

export default configureStore({
  devTools: true,
  reducer: {
      Course: CourseReducer,
      Crousel: CrouselReducer,
      Cart: CartReducer,
  },
})