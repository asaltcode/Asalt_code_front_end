import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../../animation/Loading'

const ProtectedRoute = ({children, isAdmin}) => {
  const {isAuthenticated, loading, user, error} = useSelector(state => state.authState)

  if(!isAuthenticated && !loading) {
    return <Navigate to="/login"/>
  }

  if(isAuthenticated){
    if(isAdmin === true && user.role !== "admin"){
        return <Navigate to="/" />
    }
    return children;
  }

  if(loading){
    return <Loading/>
  }
  console.log(error)

}

export default ProtectedRoute