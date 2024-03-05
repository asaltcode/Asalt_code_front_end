import axios from "axios"
const AxiosService = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "https://asalt-code-back-end-2.onrender.com",
    headers: {"Content-Type" : "application/json"},
    // withCredentials: true
})

AxiosService.interceptors.request.use(
    config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token?`Bearer ${token}`: null
    if(config.authonticate && token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}),(error)=>{
    return Promise.reject(error)
}
export default AxiosService