import './Footer.css';

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { API } from '../../services/API';

const Footer = () => {
  const [clinics, setClinics] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getClinics = () => {
    API.get('/admins').then((res) => {
      setClinics(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getClinics();
  }, []);
  return (
    <div className="footer">
      <div className="footerBody">
        <ul className="pages">
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
            <NavLink href="#formulario" to="/">
              Registro
            </NavLink>
          </li>
        </ul>
        {loaded ? (
          clinics.map((clinic) => (
            <div key={clinic._id}>
              <h2>{clinic.business}</h2>
              <p>
                {clinic.address.street}. {clinic.address.city}. CP:{' '}
                {clinic.address.postalCode}
              </p>
              <p>Teléfono: {clinic.telephone}</p>
              <p>Email: {clinic.email}</p>
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      <div className="corporative">
        <p>© 2023 Neovet, Inc.</p>
        <p>
          Designed by:{' '}
          <a href="https://es.linkedin.com/in/laura-villarreal-llesta-983990267">
            Laura Villareal Llesta,{' '}
          </a>
          <a href="https://www.linkedin.com/in/pablo-teijeiro-lopez-55a483191/">
            Pablo Teijeiro Lopez,{' '}
          </a>
          <a href="https://www.linkedin.com/in/sergiosantiagocarmona/">
            Sergio Santiago Carmona{' '}
          </a>{' '}
          y
          <a href="https://www.linkedin.com/in/virginia-zurita-ortiz/">
            {' '}
            Virginia Zurita Ortiz
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
