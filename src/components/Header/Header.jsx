import './Header.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';

const Header = () => {
  const { logout, user } = useContext(NeovetContext);
  return (
    <div className="header">
      <h2>Logo</h2>
      <ul className="links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/loginstaff">Login Staff</NavLink>
        </li>
        <li>
          <NavLink to="/loginclientes">Login Clientes</NavLink>
        </li>
        <li>
          <button to="/" onClick={logout}>
            Logout
          </button>
        </li>
        <li>
          <NavLink to="/editprofile">Profile</NavLink>
        </li>
        <li>{user ? <h2>{user.name}</h2> : <h2>Invitado</h2>}</li>
      </ul>
    </div>
  );
};

export default Header;
