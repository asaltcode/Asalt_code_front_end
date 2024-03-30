import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthRouter = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Return null after navigating to prevent further rendering
  }

  return <>{children}</>;
};

export default AuthRouter;
