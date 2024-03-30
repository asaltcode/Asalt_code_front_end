const AdminApi = {
    //users
    USERS: { // get
        path : "/admin/users",
        authenticate: true,
      },
    USER_BY_ID: { // get, put, delete
        path : "/admin/user",
        authenticate: true,
      },
    //Courses 
    GET_COURSES: {
        path: "/admin/courses"
    },
    ADD_COURSE: {
        path: "/admin/course/new"
    },
    COURSE_BY_ID: { //put, delete
        path: "/admin/course"
    },
    //Syllabus
    SYLLABUS_BY_ID: { // put, get, delete - /admin/syllabus/:id
        path: "/admin/syllabus"
    },
    SYLLABUS_WITH_TOPIC: { //get syllabus by course id
        path: "/admin/syllabus/course"
    },
    ADD_SYLLABUS: {
        path: "/admin/syllabus/new"
    },
    //Topics
    ADD_TOPIC: {
        path: "/admin/topic/new"
    },
    TOPIC_BY_ID: { //get, put, delete - /admin/topic/:id
        path: "/admin/topic"
    },
    TOPIC_BY_SYLLABUS_ID: {
        path: "/admin/topic/syllabus"
    },
    //Carousels
    GET_CAROUSELS: {
        path: "/admin/carousels"
    },
    CAROUSEL_BY_ID: { //put, delete, get, post
        path: "/admin/carousel"
    },

}
export default AdminApi

