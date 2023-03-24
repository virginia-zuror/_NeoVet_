import React, { useEffect, useState } from 'react';

import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const StaffAgenda = () => {
  const staffLogged = JSON.parse(localStorage.getItem('user'));
  const [staff, setStaff] = useState();
  const [loaded, setLoaded] = useState(false);
  let petWithAppointment = [];
  const [pets, setPets] = useState([]);
  const [arrayPetsAppoint, setArrayPetsAppoint] = useState([]);
  const [submited, setSubmited] = useState(false);

  const getAppointments = () => {
    API.get(`/staff/${staffLogged._id}`).then((res) => {
      setStaff(res.data);
    });
    API.get('/pets').then((res) => {
      setPets(res.data);
      setLoaded(true);
    });
    staff?.appointments.map((appointment) => {
      pets.map((pet) => {
        pet.appoint.map((ap) => {
          if (ap._id === appointment && ap.checked === true && ap.state === 'pending') {
            petWithAppointment.push({
              pet,
              ap,
            });
          }
        });
      });
    });
    setArrayPetsAppoint(petWithAppointment);
  };

  const changeToDone = (id) => {
    let data = {
      state: 'done',
    };
    API.put(`/appointments/${id}`, data).then((res) => {
      console.log('Cambiado', res.data);
      setSubmited(true);
    });
  };

  const cancelAp = (id) => {
    API.delete(`/appointments/${id}`).then((res) => {
      console.log('Eliminada', res.data);
      setSubmited(true);
    });
  };
  const [clkSave, setClkSave] = useState(false);
  const checking = () => {
    setClkSave(false);
  };

  useEffect(() => {
    getAppointments();
  }, [loaded === true, clkSave]);

  return (
    <div className="content">
      <AsideStaff />
      <main>
        {arrayPetsAppoint ? (
          arrayPetsAppoint.map((ap) => (
            <figure key={ap.ap._id}>
              <h2>{ap.ap.date.toString().split('').slice(0, 10)}</h2>
              <h4>{ap.pet.name}</h4>
              <h4>{ap.ap.reason}</h4>
              <div>
                <Button
                  text="Realizada"
                  action={() => {
                    changeToDone(ap.ap._id);
                    setClkSave(true);
                  }}
                />
                <Button
                  text="cancelar"
                  action={() => {
                    cancelAp(ap.ap._id);
                    setClkSave(true);
                  }}
                />
              </div>
              {submited === true && clkSave === true ? (
                <Modal content="Cambio realizado" text="X" action={() => checking()} />
              ) : (
                ''
              )}
            </figure>
          ))
        ) : (
          <h2>No hay citas</h2>
        )}
      </main>
    </div>
  );
};

export default StaffAgenda;
