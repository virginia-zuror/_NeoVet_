import './PetDetails.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API';
import Button from '../../UI/Button';

const PetDetails = () => {
  const [details, setDetails] = useState('');
  const [appoints, setAppoints] = useState([]);
  const [consults, setConsults] = useState([]);
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
    API.get(`/appointments`).then((res) => {
      setAppoints(res.data);
    });
  };

  const getConsults = () => {
    API.get(`/consults`).then((res) => {
      setConsults(res.data);
    });
  };

  useEffect(() => {
    getPets();
    getAppointments();
    getConsults();
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
            <div className='pet-details-appoints'>
              <h2>Citas</h2>
              {idPet.appoint.map((ap) => (
                <div key={ap._id}>
                  <h3>Fecha cita: {ap.date.toString().split('').slice(0, 10)}</h3>
                  <h3>Razón: {ap.reason}</h3>
                  <h3>Diagnóstico: {ap.state}</h3>
                </div>
              ))}
            </div>
            <Button padding="lg" text="Descargar Historial" type="submit" />
            <div className='pet-details-consults'>
              <h2>Consultas</h2>
              {idPet.record.map((re) => (
                <div key={re._id}>
                  <h3>Fecha consulta: {re.date.toString().split('').slice(0, 10)}</h3>
                  <h3>Exploración: {re.exp}</h3>
                  <h3>Diagnóstico: {re.diagnose}</h3>
                  <h3>Tratamiento: {re.treatment}</h3>
                  <h3>Peso: {re.weight} kg</h3>
                  <h3>Veterinario: {re.vet}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PetDetails;
