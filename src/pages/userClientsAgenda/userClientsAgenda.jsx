import './userClientsAgenda.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const UserClientsAgenda = () => {
  const [petsFound, setPetsFound] = useState([]);
  const userInLocal = JSON.parse(localStorage.getItem('user'));
  const allPets = userInLocal.pets;
  let pendingAppointByPet = null;
  const [loaded, setLoaded] = useState(false);
  const [petByUser, setPetByUser] = useState();
  const [deletedAppointment, setDeletedAppointment] = useState('');
  const [clkSave, setClkSave] = useState(false);

  let pets = [];
  const getAllPets = () => {
    API.get('/pets')
      .then((res) => {
        setPetsFound(res.data);
        petsFound.map((petFound) => {
          if (allPets.includes(petFound._id)) {
            pets.push(petFound);
          }
        });
        setPetByUser(pets);
        setLoaded(true);
      })
      .catch(console.log('error'));
  };

  const deleteAppointment = (pendingAppointByPet) => {
    API.delete(`/appointments/${pendingAppointByPet}`).then((res) => {
      setDeletedAppointment(pendingAppointByPet);
    });
  };

  const checking = () => {
    setClkSave(!clkSave);
  };

  useEffect(() => {
    getAllPets();
  }, [loaded === true, clkSave === false]);

  return (
    <main className="content">
      <AsideClient />
      <section className="staff_ap_agenda">
        <h2>Citas programadas: </h2>
        <div className="appoints_agenda">
          {loaded === true ? (
            petByUser.map((pet) =>
              pet.appoint.map(
                (ap) =>
                  ap.state === 'pending' && ap.checked === true && (
                    <figure className="cita_pend_agenda" key={ap._id}>
                      <h4>{pet.name}</h4>
                      <h5>{pet.specie}</h5>
                      <div>
                        <h5>{ap.date.toString().split('').slice(0, 10)}</h5>
                        <h5>{ap.date.toString().split('').slice(11, 16)}</h5>
                      </div>
                      <div>
                        <h4>Motivo:</h4>
                        <p>{ap.reason}</p>
                        <h4>Comentarios:</h4>
                        <p>{ap.comments}</p>
                      </div>
                      <div>
                        <Button
                          text="Eliminar cita"
                          padding="lg"
                          action={() => {
                            pendingAppointByPet = ap._id;
                            deleteAppointment(pendingAppointByPet);
                            checking();
                          }}
                        />
                      </div>
                      {clkSave && (
                        <Modal
                          content="Cita eliminada"
                          text="x"
                          className="modal_cambios"
                          action={() => {
                            checking();
                          }}
                        />
                      )}
                    </figure>
                  ),
                //: (
                //<h4 key={pet._id}>{pet.name}: No tiene citas</h4>
                //),
              ),
            )
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserClientsAgenda;
