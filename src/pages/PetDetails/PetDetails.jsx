import './PetDetails.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API';
import Button from '../../UI/Button';

const PetDetails = () => {
  const [details, setDetails] = useState('');
  const [appoint, setAppoint] = useState([]);
  const idPet = JSON.parse(localStorage.getItem('pet'));
  const getIdPet = idPet._id;
  const typeUser = JSON.parse(localStorage.getItem('user'));
  const typeOfUser = typeUser.rol;

  const getPets = () => {
    API.get(`/pets/${getIdPet}`).then((res) => {
      setDetails(res.data);
    });
  };

  const getAppointments = () => {
    API.get('/appointments').then((res) => {
      setAppoint(res.data);
    });
  };

  useEffect(() => {
    getPets();
    getAppointments();
  }, []);

  return (
    <main className="editMain patients">
      {typeOfUser === 'userAdmin' ? <AsideStaff /> : <AsideClient />}
      <section className="pet-details">
        <div className="global-date">
          <div className="first-date">
            <img src={details.photo} alt={details.name} />
            <div>
              <h2>Nombre: {details.name}</h2>
              <h3>Especie: {details.specie}</h3>
              <h3>Raza: {details.breed}</h3>
              <h3>Chip: {details.chip}</h3>
              <h3>Nacimiento: {details.birth}</h3>
            </div>
          </div>
          <div className="second-date">
            <div>
              <h2>Consultas</h2>
              <h2>{details.record}</h2>
            </div>
            <div>
              <h2>Citas</h2>
              <h2>{details.appoint}</h2>
            </div>
          </div>
          <Button padding="lg" text="Descargar Historial" type="submit" />
        </div>
      </section>
    </main>
  );
};

export default PetDetails;
