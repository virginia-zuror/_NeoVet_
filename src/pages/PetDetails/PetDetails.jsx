import './PetDetails.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API';
import Button from '../../UI/Button';

const PetDetails = () => {
  const [details, setDetails] = useState([]);
  const [petInView, setPetInView] = useState('');
  const [consults, setConsults] = useState([]);
  const [citas, setCitas] = useState([]);
  const idPet = JSON.parse(localStorage.getItem('pet'));
  const getIdPet = idPet._id;
  const typeUser = JSON.parse(localStorage.getItem('user'));
  const typeOfUser = typeUser.rol;
  const [loaded, setLoaded] = useState(false);
  /* console.log(idPet); */
  let arrayCitas = [];
  const [arrayTotalCitas, setArrayTotalCitas] = useState([]);

  useEffect(() => {
    const getPets = () => {
      API.get('/pets').then((res) => {
        setDetails(res.data);
        setLoaded(true);
      });
      details.forEach((pet) => {
        if (pet._id === getIdPet) {
          setPetInView(pet);
        }
      });
    };

    getPets();
    console.log(petInView.appoint);
  }, [loaded, petInView.length >= 0]);

  return (
    <main className="editMain patients">
      {typeOfUser === 'userAdmin' ? <AsideStaff /> : <AsideClient />}
      <section className="pet-details">
        <div className="global-date">
          <div className="first-date">
            <img src={petInView.photo} alt={petInView.name} />
            <div>
              <h2>Nombre: {petInView.name}</h2>
              <h3>Especie: {petInView.specie}</h3>
              <h3>Raza: {petInView.breed}</h3>
              <h3>Chip: {petInView.chip}</h3>
              <h3>Nacimiento: {petInView.birth}</h3>
            </div>
          </div>
          <div className="second-date">
            <div className="pet-details-appoints">
              <h2>Citas</h2>
              {petInView.appoint?.length ? (
                petInView.appoint.map((ap) => (
                  <div key={ap._id}>
                    <h3>{ap.date.toString().split('').slice(0, 10)}</h3>
                    <p>{ap.reason}</p>
                  </div>
                ))
              ) : (
                <h3>No hay citas confirmadas</h3>
              )}
            </div>
            <Button padding="lg" text="Descargar Historial" type="submit" />
            <div className="pet-details-consults">
              <h2>Consultas</h2>
              {petInView.record?.length ? (
                petInView.record.map((re) => (
                  <div className="appointmentss" key={re._id}>
                    <div className="firstLine">
                      <div className="dato">
                        <h3>Fecha:</h3>
                        <p>{re.date.toString().split('').slice(0, 10)}</p>
                      </div>
                      <div className="dato">
                        <h3>Peso: </h3>
                        <p>{re.weight} kg</p>
                      </div>
                    </div>
                    <h3>Exploración:</h3>
                    <p>{re.exp}</p>
                    <h3>Diagnóstico:</h3>
                    <p>{re.diagnose}</p>
                    <h3>Tratamiento:</h3>
                    <p>{re.treatment}</p>
                    <h3>Veterinario/a:</h3>
                    <p>{re.vet}</p>
                  </div>
                ))
              ) : (
                <h2>No hay consultas</h2>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PetDetails;
