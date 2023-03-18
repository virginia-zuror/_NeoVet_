import './Header.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';

const Header = () => {
  const { login, user } = useContext(NeovetContext);
  return (
    <div className="header">
      <h2>Logo</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <a href="" to="/">
            Login Staff
          </a>
        </li>
        <li>
          <button to="/">Logout</button>
        </li>
        <li>
          <NavLink to="/editprofile">Profile</NavLink>
        </li>
        <li>{user ? <h2>{user.name}</h2> : <h2>Anonimo</h2>}</li>
      </ul>
    </div>
  );
};

export default Header;
