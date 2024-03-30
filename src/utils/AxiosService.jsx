import axios from "axios"
const AxiosService = axios.create({
    baseURL: "/api/v1/api",
    // baseURL: "https://asalt-code-back-end-2.onrender.com/api",
    // baseURL: "https://asalt-code-back-end-d9ge.vercel.app/api",
    // baseURL: "https://asalt-code-back-end-2.onrender.com",
    // headers: {"Content-Type" : "application/json"},

})

export default AxiosService