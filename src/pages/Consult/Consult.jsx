import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { API } from '../../services/API';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
const Consult = () => {
  const { handleSubmit, register } = useForm();
  const [clkSave, setClkSave] = useState(false);
  const [submited, setSubmited] = useState(false);
  const petInConsult = JSON.parse(localStorage.getItem('pet'));
  const typeUser = JSON.parse(localStorage.getItem('user'));

  const checking = () => {
    setClkSave(!clkSave);
  };

  const formSubmit = (formData) => {
    const data = {
      date: formData.date,
      vet: formData.vet,
      exp: formData.exp,
      diagnose: formData.diagnose,
      treatment: formData.treatment,
      weight: formData.weight,
      pet: petInConsult._id,
    };

    API.post('/consults', data).then((res) => {
      console.log(res.data);
      setSubmited(true);
    });
  };

  return (
    <main>
      <h2>Nueva consulta</h2>
      <form onSubmit={handleSubmit(formSubmit)} id="formulario create_consult">
        <div className="container">
          <input type="text" id="date" name="date" required="on" {...register('date')} />
          <label htmlFor="date">Fecha</label>
        </div>
        <div className="container">
          <input
            type="text"
            id="vet"
            name="vet"
            defaultValue={typeUser.name}
            required="on"
            {...register('vet')}
          />
        </div>
        <div className="container exploracion">
          <input
            type="text"
            id="weight"
            name="weight"
            required="on"
            {...register('weight')}
          />
          <label htmlFor="weight">Peso (Kg)</label>
        </div>
        <div className="container exploracion">
          <input type="text" id="exp" name="exp" required="on" {...register('exp')} />
          <label htmlFor="exp">Exploración</label>
        </div>
        <div className="container">
          <input
            type="text"
            id="diagnose"
            name="diagnose"
            required="on"
            defaultValue=""
            {...register('diagnose')}
          />
          <label htmlFor="diagnose">Diagnóstico</label>
        </div>
        <div className="container exploracion">
          <input
            type="text"
            id="treatment"
            name="treatment"
            required="on"
            defaultValue=""
            {...register('treatment')}
          />
          <label htmlFor="treatment">Tratamiento</label>
        </div>
        <Button
          padding="xl"
          type="button"
          action={() => {
            checking();
          }}
          text="Registrar consulta"
        />
      </form>
      {submited && clkSave && (
        <Modal
          content="Consulta guardada"
          action={() => checking()}
          text="X"
          className="modal_cambios"
          padding="lg"
        />
      )}
    </main>
  );
};

export default Consult;
