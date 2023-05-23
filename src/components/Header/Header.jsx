import './Header.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';
import Button from '../../UI/Button';

const Header = () => {
  const { logout, user } = useContext(NeovetContext);

  const typeUser = JSON.parse(localStorage.getItem('user'));

  return (
    <nav>
      <NavLink to="/">
        <img
          src="https://res.cloudinary.com/depifliz3/image/upload/v1679840080/samples/animals/Logo_final_Mesa_de_trabajo_1_sfvvbb.png"
          alt="logo Neovet"
        />
      </NavLink>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {localStorage.getItem('user') && typeUser.rol === 'userAdmin' && (
          <li>
            <NavLink to="/staff">Staff</NavLink>
          </li>
        )}
        {localStorage.getItem('user') && typeUser.rol === 'userClient' && (
          <li>
            <NavLink to="/userclients">Cliente</NavLink>
          </li>
        )}
        {localStorage.getItem('token') ? (
          <li className="logout-li">
            <Button padding="lg" text="Logout" variant="contained" action={logout} />
          </li>
        ) : (
          <>
            <li>
              <h4>Login</h4>
              <ul>
                <li className="dropdown-li">
                  <NavLink to="/loginstaff">Login Staff</NavLink>
                </li>
                <li className="dropdown-li">
                  <NavLink to="/loginclientes">Login Clientes</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a href="/#formulario">
                <Button text="Regístrate" padding="lg" variant="contained" />
              </a>
            </li>
          </>
        )}
        <li className="user">
          {user && typeUser.rol === 'userClient' && (
            <div className="avatar-staff">
              <h5>{user.name}</h5>
            </div>
          )}
          {user && typeUser.rol === 'userAdmin' && (
            <div className="avatar-staff">
              <div>
                <h5>{user.name}</h5>
                <p>{user.position}</p>
              </div>
              <img src={user.avatar} alt={user.avatar} />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
