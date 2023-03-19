import './Header.css';

import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';

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
          <h2>Logo</h2>
        </NavLink>
      </abbr>
      {user ? (
        <>
          <h2>Hola {user.name}</h2>
        </>
      ) : (
        <>
          <h2>Hola Invitado</h2>
        </>
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
            <li>
              <NavLink to="/editprofile">Profile</NavLink>
            </li>
          </>
        )}
        {localStorage.getItem('token') ? (
          <li>
            <button to="/" onClick={logout}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <select
              defaultValue="default "
              name="loginSelect"
              onChange={(e) => {
                selection = e.target.value;
                loginSelected();
              }}
            >
              <option value="default">Logéate</option>
              <option value="loginstaff">Login Staff</option>
              <option value="loginclients">Login Clientes</option>
            </select>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
