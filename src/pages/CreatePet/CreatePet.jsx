import './CreatePet.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API.js';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const CreatePet = () => {
  const { register, handleSubmit } = useForm();
  const userLoged = JSON.parse(localStorage.getItem('user'));
  const [clkSave, setClkSave] = useState(false);
  const [submited, setSubmited] = useState(false);

  const checking = () => {
    setClkSave(!clkSave);
  };

  const formSubmit = (formData) => {
    API.post('/pets', formData).then((res) => {
      console.log(res.data);
      setSubmited(true);
    });
  };

  return (
    <div>
      <AsideClient />
      <main>
        <h2>Añade una mascota</h2>
        <form onSubmit={handleSubmit(formSubmit)} id="formulario_edit">
          <div className="container">
            <input type="text" id="name" required {...register('name')} />
            <label htmlFor="name">Nombre</label>
          </div>
          <div className="container">
            <input type="text" id="specie" required {...register('specie')} />
            <label htmlFor="specie">Especie</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="breed"
              name="breed"
              required
              {...register('breed')}
            />
            <label htmlFor="breed">Raza</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="birth"
              name="birth"
              required
              {...register('birth')}
            />
            <label htmlFor="birth">Fecha nacimiento</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="chip"
              name="chip"
              required
              {...register('chip')}
            />
            <label htmlFor="chip">Chip</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="gender"
              name="gender"
              required
              {...register('gender')}
            />
            <label htmlFor="gender">Género</label>
          </div>
          <div className="container">
            <input
              type="file"
              id="photo"
              name="photo"
              required
              {...register('photo')}
            />
            <label htmlFor="photo"></label>
          </div>
          <Button
            text="Guardar cambios"
            type="button"
            action={() => {
              checking();
            }}
            padding="xl"
            className="btn_edit"
          />
        </form>
        {submited && clkSave && (
          <Modal
            content="Mascota añadida"
            action={() => checking()}
            text="X"
            className="modal_cambios"
            padding="lg"
          />
        )}
      </main>
    </div>
  );
};

export default CreatePet;
