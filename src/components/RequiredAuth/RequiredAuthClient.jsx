import { Navigate, useLocation } from 'react-router-dom';

import UserClients from '../../pages/UserClients/UserClients';

const RequiredAuthClient = ({ children }) => {
  let location = useLocation();

  const typeUser = JSON.parse(localStorage.getItem('user'));
  if (!localStorage.getItem('token') || typeUser.rol === 'userAdmin') {
    return <Navigate to="/loginclientes" state={{ from: location }} replace />;
  } else if (!typeUser) {
    return <Navigate to="/loginclientes" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default RequiredAuthClient;
