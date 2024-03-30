import axios from "axios"
const AxiosService = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "/api",
    // baseURL: "https://asalt-code-back-end-2.onrender.com",
    // headers: {"Content-Type" : "application/json"},

})

export default AxiosService