import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthAPI } from '../requests/AuthApi';
import Loading from './Loading';
import { useEffect, useState } from 'react';

const PrivateRoutes = () => {
  const location = useLocation();
  const [login, setLogin] = useState(null);

  useEffect(() => {
    AuthAPI.validateToken(localStorage.getItem('token'), (response) => {
      if(!response){
        localStorage.clear();
      }
      
      setLogin(response);
    });
  }, [])

  if(login === null) {
    return <Loading />;
  } else {
    if(login){
      if(location.pathname === "/"){
        return <Navigate to="/projects" replace state={{ from: location }} />;
      } else {
        return <Outlet />
      }
    } else {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  }

}

export default PrivateRoutes;