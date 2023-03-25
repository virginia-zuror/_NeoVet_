import './UserClientsAppoint.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const UserClientsAppoint = () => {
  const { handleSubmit, register, reset } = useForm();
  const [clkSave, setClkSave] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [clinic, setClinic] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const checking = () => {
    setClkSave(!clkSave);
  };
  const petInAppoint = JSON.parse(localStorage.getItem('pet'));
  const userLocal = JSON.parse(localStorage.getItem('user'));

  const getAdmins = () => {
    API.get('/admins')
      .then((res) => {
        setAdmins(res.data);
      })
      .then(() => {
        mapAdmins();
      });
  };

  const mapAdmins = () => {
    admins.map((item) => {
      item.clients.map((cl) => {
        if (cl._id.includes(userLocal._id)) {
          setClinic(...clinic, item);
        }
      });
    });
    setLoaded(true);
  };

  const formSubmit = (formData) => {
    const data = {
      date: formData.date,
      staff: formData.staff,
      reason: formData.reason,
      comments: formData.comments,
      pet: petInAppoint._id,
    };

    API.post('/appointments', data).then((res) => {
      console.log(res.data);
      setSubmited(true);
    });
  };

  useEffect(() => {
    getAdmins();
  }, [loaded, refresh]);

  return (
    <main className="appointMain">
      <AsideClient />
      <section className="appointSection">
        <form
          onSubmit={handleSubmit(formSubmit)}
          id="create_appoint"
          className="form-pedir-cita"
        >
          <h2>Solicitud de cita</h2>
          <div className="firstRow">
            <div className="container">
              <h4>Fecha</h4>
              <input
                type="date"
                id="date"
                name="date"
                required="on"
                {...register('date')}
              />
            </div>
          </div>
          <div className="secondRow">
            <div className="container container-staff">
              <select
                name="staff"
                id="staff"
                defaultValue="nothing"
                {...register('staff')}
              >
                <option value="nothing"></option>
                {clinic.staff ? (
                  clinic.staff.map((staffmember) => (
                    <option key={staffmember._id} value={staffmember._id}>
                      {staffmember.name}
                    </option>
                  ))
                ) : (
                  <option value="loading">Loading...</option>
                )}
              </select>
              <label htmlFor="staff">Veterinario/auxiliar</label>
            </div>
            <div className="container container-admins">
              <select
                name="reason"
                id="reason"
                defaultValue="nothing"
                {...register('reason')}
              >
                <option value="nothing"></option>
                <option value="vacuna">Vacuna</option>
                <option value="revisión">Revisión</option>
                <option value="consulta">Consulta</option>
                <option value="gestión">Gestión</option>
              </select>
              <label htmlFor="reason">Motivo</label>
            </div>
          </div>
          <div className="container">
            <h3>Comentarios adicionales</h3>
            <textarea
              className="comments"
              type="text"
              id="comments"
              name="comments"
              required="on"
              {...register('comments')}
            ></textarea>
          </div>
          <Button
            padding="xl"
            type="button"
            action={() => {
              checking();
              formSubmit;
            }}
            text="Solicitar"
          />
        </form>
        {submited && clkSave && (
          <Modal
            content="Cita solicitada, espera nuestra confirmación."
            action={() => {
              checking();
              reset();
            }}
            text="X"
            className="modal_cambios"
            padding="lg"
          />
        )}
      </section>
    </main>
  );
};

export default UserClientsAppoint;
