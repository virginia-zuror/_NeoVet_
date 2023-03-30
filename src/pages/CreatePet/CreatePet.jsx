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
    const data = {
      name: formData.name,
      specie: formData.specie,
      breed: formData.breed,
      birth: formData.birth,
      chip: formData.chip,
      gender: formData.gender === 'Macho' ? 'male' : 'female',
      photo: formData.photo[0],
      client: userLoged._id,
    };
    API.post('/pets', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => {
      console.log(res.data);
      setSubmited(true);
    });
  };

  return (
    <main className="createpet-page">
      <AsideClient />
      <div className="createpet-section">
        <h2>Añade una mascota</h2>
        <form onSubmit={handleSubmit(formSubmit)} id="formulario_edit">
          <div className="container">
            <input type="text" id="name" required="on" {...register('name')} />
            <label htmlFor="name">Nombre</label>
          </div>
          <div className="container">
            <input type="text" id="specie" required="on" {...register('specie')} />
            <label htmlFor="specie">Especie</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="breed"
              name="breed"
              required="on"
              {...register('breed')}
            />
            <label htmlFor="breed">Raza</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="chip"
              name="chip"
              required="on"
              {...register('chip')}
            />
            <label htmlFor="chip">Chip</label>
          </div>
          <div className="container">
            <select
              type="text"
              id="gender"
              name="gender"
              required
              {...register('gender')}
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            <label htmlFor="gender">Género</label>
          </div>
          <div className="container">
            <h3>Fecha nacimiento</h3>
            <input
              type="date"
              id="birth"
              name="birth"
              required="on"
              {...register('birth')}
            />
          </div>
          <div className="container">
            <input type="file" id="photo" name="photo" {...register('photo')} />
            <label htmlFor="photo">Foto</label>
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
            action={checking}
            text="X"
            className="modal_cambios"
            padding="lg"
          />
        )}
      </div>
    </main>
  );
};

export default CreatePet;
