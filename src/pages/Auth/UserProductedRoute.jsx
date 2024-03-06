import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { useLogout } from "../../hook/useLogout";
import Loading from '../../animation/Loading'

const UserProductedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  

  useEffect(() => {
    const compareHash = async (data, hash) => {
      try {
        const res = await AxiosService.post(ApiRoutes.USER_PRODUCT_ROUTES.path, {authenticate: ApiRoutes.USER_PRODUCT_ROUTES.authenticate})
        if(res.status === 200)
        return true;
        
      } catch (error) {
        console.error('Error comparing tokens:', error);
        return false;
      }
    };

    const checkRole = async () => {
      const tokens = localStorage.getItem('tokens');
      try {
        const roles = await compareHash('user', tokens);
        setIsAuthorized(roles);
      } catch (error) {
        console.error('Error checking role:', error);
        logout(); // or handle logout if compare fails
      } finally {
        setIsLoading(false);
      }
    };

    checkRole();
  }, [navigate, logout]);

  if (isLoading) {
    return <Loading/>;
  }

  if (!isAuthorized) {
    navigate('/login');
    localStorage.clear();
    return null;
  }

  return <>{children}</>
};

export default UserProductedRoute;
