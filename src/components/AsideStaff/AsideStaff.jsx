import './AsideStaff.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

const AsideStaff = () => {
  return (
    <div className="aside">
      <ul className="asideLinks">
        <li>
          <NavLink to="/staff">
            Vista General{' '}
            <img
              className="icon"
              src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1679307394/Neovet/person-circle-outline_yyfflv.svg"
              alt="icono agenda"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/staff/agenda">
            Agenda{' '}
            <img
              className="icon"
              src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1679305138/Neovet/calendar-outline_vzwcnd.svg"
              alt="icono agenda"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/staff/pets">
            Pacientes{' '}
            <img
              className="icon"
              src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1679307594/Neovet/pets_FILL0_wght400_GRAD0_opsz48_opqexq.svg"
              alt="icono pacientes"
            />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AsideStaff;
