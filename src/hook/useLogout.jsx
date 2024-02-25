import React from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useLogout = () => {
  let navigate = useNavigate()
  return ()=>{
    toast.error("Logout Successfully")
    localStorage.clear()
    navigate('/login')
  }
}

