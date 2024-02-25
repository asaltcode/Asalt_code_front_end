import React,{useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

const SignupVerify = () => {
  const navigate = useNavigate()
  const [verifyStatus, setVerifyStatus] = useState("")
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const getData = async ()=>{
    try {
      const token = queryParams.get('token');
      const res = await AxiosService.get(`${ApiRoutes.VERIFY.path}?token=${token}`,{authenticate: ApiRoutes.VERIFY.authenticate})
      if(res.status === 200){
        setVerifyStatus(res.data.message)
       await localStorage.setItem("token", res.data.token)
        setTimeout(()=>{
          navigate('/login')
        },3000)
      }
    } catch (error) {
      setVerifyStatus(error.response.data.message)
    }      
  }

  useEffect(()=>{
     getData()
  },[])
  return (
    <>
   <div  style={{height: '100vh', width: "100%"}} className='bg-dark d-flex justify-content-center align-items-center'>
    <div style={{position: "relative", width : '100%'}}>
            <dotlottie-player src="https://lottie.host/daaebf64-a182-463a-a75c-bf01de78b7ba/4MIVhbAxtn.json" background="tranpereant" speed="1" style={{ width: "300px", height: "300px", margin: "auto"}}  loop autoplay></dotlottie-player>
     
         <div className='m-auto' style={{position: "absolute", bottom: '10px', width : "100%",}}>
         <h1 className='text-light'>{verifyStatus}</h1>
          </div>
    </div>
    </div>
    </>
  )
}

export default SignupVerify