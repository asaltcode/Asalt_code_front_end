import axios from "axios"
const AxiosService = axios.create({
    baseURL: "/api/v1/api", //Produciton
    // baseURL: "/api",
    // baseURL: "https://asalt-code-back-end-2.onrender.com/api",
    // headers: {"Content-Type" : "application/json"},

})

export default AxiosService