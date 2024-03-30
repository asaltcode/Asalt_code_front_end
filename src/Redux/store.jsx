// store.js
import { combineReducers, configureStore} from '@reduxjs/toolkit';
  // Import thunk as a named export
import CartsReducer from './Slices/CartsSlicer';
import CoursesReducer from './Slices/CoursesSlicer';
import CourseReducer from "./Slices/CourseSlicer"
import CarouselsReducer from './Slices/CarouselsSlicer';
import CarouselReducer from './Slices/CarouselSlicer';
import loaderReducer from './loaderSlicer';
import UserReducer from './Slices/UserSlicer';
import AuthReducer from "./Slices/AuthSlicer"
import UsersReducer from "./Slices/UsersSlicer"
import PaymentReducer from "./Slices/PaymentSlicer"
import SyllabusReducer from "./Slices/SyllabusSlicer"
import PaidReducer from "./Slices/MyCoursesSlicer"
import TopicsReducer from "./Slices/TopicsSlicer"

// Admin Reducer imports
import AdminCoursesReducer from "./Slices/AdminCourseSlicer"


const rootReducer = combineReducers({
  authState: AuthReducer,
  usersState: UsersReducer,
  userState: UserReducer,
  loading: loaderReducer,
  coursesState: CoursesReducer,
  courseState: CourseReducer,
  carouselsState: CarouselsReducer,
  carouselState: CarouselReducer,
  cartsState: CartsReducer,   
  paymentState: PaymentReducer,
  syllabusState: SyllabusReducer,
  paidState: PaidReducer,
  topicsState: TopicsReducer,
    // Admin Reducers
  adminCoursesState: AdminCoursesReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
