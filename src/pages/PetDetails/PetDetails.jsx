import './PetDetails.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import AsideStaff from '../../components/AsideStaff/AsideStaff';
import GenericPdfDownloader from '../../components/PdfGenerator/PdfGenerator';
import { API } from '../../services/API';

const PetDetails = () => {
  const [details, setDetails] = useState([]);
  const [petInView, setPetInView] = useState('');

  const idPet = JSON.parse(localStorage.getItem('pet'));
  const getIdPet = idPet._id;
  const typeUser = JSON.parse(localStorage.getItem('user'));
  const typeOfUser = typeUser.rol;
  const [loaded, setLoaded] = useState(false);
  let arrayApDone = [];
  const [doneAp, setDoneAp] = useState('');
  useEffect(() => {
    const getPets = () => {
      API.get('/pets').then((res) => {
        setDetails(res.data);
        setLoaded(true);
      });
      details.forEach((pet) => {
        if (pet._id === getIdPet) {
          setPetInView({
            name: pet.name,
            specie: pet.specie,
            breed: pet.breed,
            gender: pet.gender === 'male' ? 'Macho' : 'Hembra',
            chip: pet.chip,
            birth: pet.birth.toString().split('').slice(0, 10),
            photo: pet.photo,
            appoint: pet.appoint,
            record: pet.record,
          });
        }
      });
      petInView.appoint?.map((ap) => {
        ap.checked === true && ap.state === 'done' && arrayApDone.push(ap);
        setDoneAp(arrayApDone);
      });
    };

    getPets();
    console.log(doneAp);
  }, [loaded, petInView.length >= 0, doneAp.length >= 0]);

  return (
    <main className="patients">
      {typeOfUser === 'userAdmin' ? <AsideStaff /> : <AsideClient />}
      <section className="pet-details" id="pet-details">
        <div className="global-date">
          <div className="first-date">
            <img src={petInView.photo} alt={petInView.name} />
            <div>
              <h2>{petInView.name}</h2>
              <h3>{petInView.gender}</h3>
              <h3>Especie: {petInView.specie}</h3>
              <h3>Raza: {petInView.breed}</h3>
              <h3>Chip: {petInView.chip}</h3>
              <h3>Nacimiento: {petInView.birth}</h3>
            </div>
          </div>
          <div className="second-date">
            <div className="pet-details-appoints">
              <h2>Citas</h2>
              {doneAp.length ? (
                doneAp.map((ap) => (
                  <div key={ap._id}>
                    <p>{ap.date.toString().split('').slice(0, 10)}</p>
                    <p>{ap.reason}</p>
                  </div>
                ))
              ) : (
                <h3>No hay citas realizadas</h3>
              )}
            </div>
            <GenericPdfDownloader
              downloadFileName="CustomPdf"
              rootElementId="pet_details_consults"
            />
            <div className="pet-details-consults" id="pet_details_consults">
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
