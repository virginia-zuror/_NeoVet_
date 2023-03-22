import './UserClientsAppoint.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const UserClientsAppoint = () => {
  const { handleSubmit, register } = useForm();
  const [submited, setSubmited] = useState(false);
  const [staff, setStaff] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [client, setClient] = useState([]);
  const [clinic, setClinic] = useState([]);

  const petInAppoint = JSON.parse(localStorage.getItem('pet'));
  const userLocal = JSON.parse(localStorage.getItem('user'));
  let arrayClinic = [];



  const getAdmins = () => {
    API.get('/admins').then((res) => {
      setAdmins(res.data);
    });
  };
  
  const mapAdmins = () => {
    console.log("iniciando función")
    admins.map((item)=>{
      item.clients.map((cl)=>{
        cl._id === userLocal._id && arrayClinic.push(item)
      })
    }) 
    console.log(clinic)
    setClinic(arrayClinic)
    setLoaded(true);
  };


  const formSubmit = (formData) => {
    const data = {
      date: formData.date,
      vet: formData.vet,
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
    mapAdmins();
  }, [loaded]);

  return (
    <main className="appointMain">
      <AsideClient />
      <section>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h2>Solicitud de cita</h2>
          <div className="container">
            <input
              type="date"
              id="date"
              name="date"
              required="on"
              {...register('date')}
            />
            <label htmlFor="date">Fecha</label>
          </div>
          <div className="container container-staff">
            <select name="staff" id="staff" defaultValue="nothing">
              <option value="nothing"></option>
              {loaded ? (
                clinic.staff.map((staffmember) => (
                  <option key={staffmember._id} value={staffmember.name}>
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
            <select name="staff" id="admins" defaultValue="none">
              <option value={null}></option>
              <option value="vacuna">Vacuna</option>
              <option value="revisión">Revisión</option>
              <option value="consulta">Consulta</option>
              <option value="gestión">Gestión</option>
            </select>
            <label htmlFor="staff">Motivo</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="comments"
              name="comments"
              required="on"
              {...register('comments')}
            />
            <label htmlFor="comments">Comentarios adicionales</label>
          </div>
          <Button
            padding="xl"
            type="button"
            action={() => {
              checking();
            }}
            text="Solicitar"
          />
        </form>
      </section>
    </main>
  );
};

export default UserClientsAppoint;
