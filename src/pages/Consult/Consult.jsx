import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import('./Consult.css');
import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
const Consult = () => {
  const { handleSubmit, register, reset } = useForm();
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
    <main className="consultMain">
      <AsideStaff />
      <section className="consultSection">
        <form onSubmit={handleSubmit(formSubmit)} id="create_consult">
          <h2>Nueva consulta</h2>
          <div className="filasup">
            <div>
              <h3>Fecha</h3>
              <input
                type="date"
                id="date"
                name="date"
                required="on"
                {...register('date')}
              />
            </div>
            <div className="container"></div>
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
            <div className="container">
              <input
                type="text"
                id="weight"
                name="weight"
                required="on"
                {...register('weight')}
              />
              <label htmlFor="weight">Peso (Kg)</label>
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
          </div>
          <div className="filamed">
            <div className="container">
              <h3>Exploración</h3>
              <textarea
                type="text"
                id="exp"
                name="exp"
                required
                {...register('exp')}
              ></textarea>
            </div>
            <div className="container">
              <h3>Tratamiento</h3>
              <textarea
                type="text"
                id="treatment"
                name="treatment"
                required="on"
                defaultValue=""
                {...register('treatment')}
              ></textarea>
            </div>
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

export default Consult;
