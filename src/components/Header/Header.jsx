import { NavLink } from "react-router-dom";
import "./Header.css"

const Header = () => {
  return (
    <div className="header">
      <h2>Logo</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <a href="" to="/">Login Staff</a>
        </li>
        <li>
          <button to="/">Logout</button>
        </li>
        <li>
        <NavLink to="/editprofile">Profile</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
