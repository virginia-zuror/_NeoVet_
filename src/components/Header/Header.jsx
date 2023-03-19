import './Header.css';

import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';

const Header = () => {
  const { logout, user } = useContext(NeovetContext);
  let navigate = useNavigate();
  let selection;

  const loginSelected = () => {
    console.log(selection);
    if (selection == 'loginstaff') {
      navigate('/loginstaff');
    } else if (selection == 'loginclients') {
      navigate('/loginclientes');
    }
  };

  return (
    <div className="header">
      <abbr title="Home">
        <h2>Logo</h2>
      </abbr>
      <ul className="links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
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
        <li>
          <NavLink to="/staff">Staff</NavLink>
        </li>
        <li>
          <NavLink to="/userclients">Cliente</NavLink>
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
