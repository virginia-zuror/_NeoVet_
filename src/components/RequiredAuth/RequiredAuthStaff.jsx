import { Navigate, useLocation } from 'react-router-dom';

const RequiredAuthStaff = ({ children }) => {
  let location = useLocation();

  const typeUser = JSON.parse(localStorage.getItem('user'));
  if (!localStorage.getItem('token') || typeUser.rol === 'userClient') {
    return <Navigate to="/loginstaff" state={{ from: location }} replace />;
  } else if (!typeUser) {
    return <Navigate to="/loginstaff" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default RequiredAuthStaff;
