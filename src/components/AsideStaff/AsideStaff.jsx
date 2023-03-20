import './AsideStaff.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

const AsideStaff = () => {
  return (
    <div>
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
            <NavLink to="/staff_agenda">
              Agenda{' '}
              <img
                className="icon"
                src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1679305138/Neovet/calendar-outline_vzwcnd.svg"
                alt="icono agenda"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff_pets">
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
      <div className="asideMobile">
        <ul className="asideMobileLinks">
          <li>
            <NavLink to="/staff">
              <img
                className="icon"
                src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1679307394/Neovet/person-circle-outline_yyfflv.svg"
                alt="icono agenda"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff_agenda">
              <img
                className="icon"
                src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1679305138/Neovet/calendar-outline_vzwcnd.svg"
                alt="icono agenda"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff_pets">
              <img
                className="icon"
                src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1679307594/Neovet/pets_FILL0_wght400_GRAD0_opsz48_opqexq.svg"
                alt="icono pacientes"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AsideStaff;
