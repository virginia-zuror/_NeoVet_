import './EditClientProfile.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API.js';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const EditClientProfile = () => {
  const { register, handleSubmit } = useForm();
  const userLoged = JSON.parse(localStorage.getItem('user'));
  const [clkSave, setClkSave] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [result, setResult] = useState([]);

  const checking = () => {
    setClkSave(!clkSave);
  };

  const formSubmit = (formData) => {
    API.patch(`/userclients/${userLoged._id}`, formData).then((res) => {
      console.log(res.data);
      setResult(res.data);
      setSubmited(true);
    });
  };

  return (
    <main className="editMain">
      <AsideClient />
      <section className="editsection">
        <h2>Edita tu perfil</h2>
        <form onSubmit={handleSubmit(formSubmit)} id="formulario_edit">
          <div className="container">
            <input
              type="text"
              id="name"
              defaultValue={userLoged.name}
              required
              autoFocus
              {...register('name')}
            />
            <label htmlFor="name">Nombre</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="telephone"
              defaultValue={userLoged.telephone}
              required
              autoFocus
              {...register('telephone')}
            />
            <label htmlFor="telefono">Teléfono</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="street"
              name="street"
              defaultValue={userLoged.address.street}
              required
              autoFocus
              {...register('address.street')}
            />
            <label htmlFor="street">Calle</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={userLoged.address.city}
              required
              autoFocus
              {...register('address.city')}
            />
            <label htmlFor="city">Ciudad</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="region"
              name="region"
              defaultValue={userLoged.address.region}
              required
              autoFocus
              {...register('address.region')}
            />
            <label htmlFor="region">Provincia</label>
          </div>
          <div className="container">
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              defaultValue={userLoged.address.postalCode}
              required
              autoFocus
              {...register('address.postalCode')}
            />
            <label htmlFor="postalCode">Código Postal</label>
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
            content="Cambios realizados, podrás visualizarlos volviendo a loguearte"
            action={() => checking()}
            text="X"
            className="modal_cambios"
            padding="lg"
          />
        )}
      </section>

      {submited === true ? (
        <section className="resultsection">
          <h3>Tus Cambios:</h3>
          <p>{result.name}</p>
          <p>{result.telephone}</p>
          <h5>Dirección:</h5>
          <p>{result.address.street}</p>
          <p>{result.address.city}</p>
          <div>
            <p>({result.address.postalCode}) - </p>
            <p>{result.address.region}</p>
          </div>
        </section>
      ) : (
        ''
      )}
    </main>
  );
};

export default EditClientProfile;
