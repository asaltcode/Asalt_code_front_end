import axios from "axios"
const AxiosService = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "https://asalt-code-back-end-d9ge.vercel.app/api",
    // baseURL: "https://asalt-code-back-end-2.onrender.com",
    // headers: {"Content-Type" : "application/json"},
    withCredentials: true
})

export default AxiosService