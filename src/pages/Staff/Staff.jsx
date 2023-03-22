import './Staff.css';

import { useEffect, useState } from 'react';

import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API.js';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const Staff = () => {
  const [pets, setPets] = useState([]);
  let pendingAp = null;
  let pendingCl = null;
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState([]);
  const [loadedClients, setLoadedClients] = useState(false);
  const [newClients, setNewClients] = useState([]);
  let clientNotChecked = [];
  let petWithAppointment = [];
  const [arrayPetsAppoint, setArrayPetsAppoint] = useState([]);
  const [clkSave, setClkSave] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const checkAppointments = () => {
    API.get('/pets').then((res) => {
      setPets(res.data);
      setLoaded(true);
    });
  };
  const checkNewClients = () => {
    API.get('/userclients').then((res) => {
      setClients(res.data);
      setLoadedClients(true);
    });
  };

  const mapAppoints = () => {
    pets.map((pet) => {
      pet.appoint.map((ap) => {
        if (ap.checked === false) {
          petWithAppointment.push({
            pet,
            ap,
          });
        }
      });
    });
    setArrayPetsAppoint(petWithAppointment);
  };
  const mapRegister = () => {
    clients.map((client) => {
      if (client.checked === false) {
        clientNotChecked.push({
          client,
        });
      }
    });
    setNewClients(clientNotChecked);
    console.log(newClients);
  };

  const putToChecked = () => {
    const data = {
      checked: true,
    };
    API.put(`/appointments/${pendingAp}`, data).then((res) => {
      console.log(res.data);
      setSubmited(true);
    });
  };
  const putToAccepted = () => {
    const data = {
      checked: true,
    };
    API.patch(`/userclients/${pendingCl}`, data).then((res) => {
      console.log(res.data);
      setAccepted(true);
    });
  };

  /* const checkingAccept = () => {
    setClkSave(false);
  }; */

  /*   const formSubmit = (formData, pendingAp) => {
    const data = {
      date: formData.date,
    };
    API.put(`/appointments/${pendingAp}`, data).then((res) => {
      console.log(res.data);
      setSubmited(true);
    });
  };

  const deleteAp = () => {
    API.delete(`/appointments/${pendingAp}`).then((res) => {
      console.log(res.data);
    });
  }; */

  useEffect(() => {
    checkAppointments();
    mapAppoints();
    checkNewClients();
    mapRegister();
    console.log(arrayPetsAppoint);
  }, [loaded, clkSave === false, loadedClients, accepted]);

  return (
    <main className="editMain appoints">
      <AsideStaff />
      <section className="staff_overview">
        <div>
          {loaded ? (
            arrayPetsAppoint.map((item, i) => (
              <figure key={i} className="cita_pend">
                <h4>{item.pet.name}</h4>
                <h5>{item.pet.specie}</h5>
                <div>
                  <h5>{item.ap.date.toString().split('').slice(0, 10)}</h5>
                  <h5>{item.ap.date.toString().split('').slice(11, 16)}</h5>
                </div>
                <div>
                  <h5>Motivo: </h5>
                  <p>{item.ap.reason}</p>
                  <h5>Comentario del cliente: </h5>
                  <p>{item.ap.comments}</p>
                </div>
                <div>
                  <Button
                    text="Aceptar"
                    action={() => {
                      pendingAp = item.ap._id;
                      setClkSave(true);
                      putToChecked();
                    }}
                    padding="lg"
                  />
                </div>
                {submited && clkSave ? (
                  <Modal
                    content="Cambios realizados"
                    action={() => {
                      setClkSave(false);
                    }}
                    text="X"
                    className="modal_cambios"
                    padding="lg"
                  />
                ) : (
                  ''
                )}
              </figure>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
        <div>
          {newClients.length ? (
            newClients.map((client, i) => (
              <figure key={i}>
                <h4>{client.client.name}</h4>
                <h5>{client.client.telephone}</h5>
                <h5>{client.client.address.street}</h5>
                <h5>{client.client.address.city}</h5>
                <Button
                  text="Aceptar registro"
                  padding="xl"
                  action={() => {
                    pendingCl = client.client._id;
                    putToAccepted();
                    setClkSave(true);
                  }}
                />
                {accepted && clkSave && (
                  <Modal
                    content="Cambios realizados"
                    action={() => {
                      setClkSave(false);
                    }}
                    text="X"
                    className="modal_cambios"
                    padding="lg"
                  />
                )}
              </figure>
            ))
          ) : (
            <h2>No existen solicitudes de registro pendientes</h2>
          )}
        </div>
      </section>
    </main>
  );
};

export default Staff;
