import './Header.css';

import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';
import Button from '../../UI/Button';

const Header = () => {
  const { logout, user } = useContext(NeovetContext);
  let navigate = useNavigate();
  let selection;
  const typeUser = JSON.parse(localStorage.getItem('user'));
  const loginSelected = () => {
    if (selection == 'loginstaff') {
      navigate('/loginstaff');
    } else if (selection == 'loginclients') {
      navigate('/loginclientes');
    }
  };

  return (
    <div className="header">
      <abbr title="Home">
        <NavLink to="/">
          <img
            className="logo"
            src="https://res.cloudinary.com/depifliz3/image/upload/v1679478181/Neovet_blanco_Mesa_de_trabajo_1_uii63w.png"
            alt="logo-neovet"
          />
        </NavLink>
      </abbr>
      {user && typeUser.rol === 'userClient' && (
        <div className="avatar-staff">
          <h2>{user.name}</h2>
        </div>
      )}
      {user && typeUser.rol === 'userAdmin' && (
        <div className="avatar-staff">
          <h2>{user.name}</h2>
          <img src={user.avatar} alt={user.avatar} />
        </div>
      )}
      <ul className="links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {localStorage.getItem('user') && typeUser.rol === 'userAdmin' && (
          <li>
            <NavLink to="/staff">Staff</NavLink>
          </li>
        )}
        {localStorage.getItem('user') && typeUser.rol === 'userClient' && (
          <>
            <li>
              <NavLink to="/userclients">Cliente</NavLink>
            </li>
          </>
        )}
        {localStorage.getItem('token') ? (
          <li>
            <Button padding="lg" text="Logout" variant="contained" action={logout} />
          </li>
        ) : (
          <>
            <li>
              <select
                defaultValue="default "
                name="loginSelect"
                onChange={(e) => {
                  selection = e.target.value;
                  loginSelected();
                }}
              >
                <option value="default">Loguéate</option>
                <option value="loginstaff">Login Staff</option>
                <option value="loginclients">Login Clientes</option>
              </select>
            </li>
            <li>
              <a href="/#formulario">
                <Button text="Regístrate" padding="lg" variant="contained" />
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
