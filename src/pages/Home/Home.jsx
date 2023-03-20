import './Home.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { API } from '../../services/API.js';
import Button from '../../UI/Button';

const Home = () => {
  const { register, handleSubmit } = useForm();

  const formSubmit = (formData) => {
    API.post('/userclients', formData).then((res) => {
      console.log(res.data);
    });
  };

  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => currentTarget.value;

  return (
    <main id="home">
      <h2>Formulario de registro</h2>
      <form onSubmit={handleSubmit(formSubmit)} id="register-form">
        <div className="container container-name">
          <input type="text" id="name" name="name" required="on" {...register('name')} />
          <label htmlFor="name">Nombre</label>
        </div>
        <div className="container container-street">
          <input
            type="text"
            id="street"
            name="street"
            required="on"
            {...register('address.street')}
          />
          <label htmlFor="street">Calle</label>
        </div>
        <div className="container container-city">
          <input
            type="text"
            id="city"
            name="city"
            required="on"
            {...register('address.city')}
          />
          <label htmlFor="city">Ciudad</label>
        </div>
        <div className="container container-region">
          <input
            type="text"
            id="region"
            name="region"
            required="on"
            {...register('address.region')}
          />
          <label htmlFor="region">C.Autónoma</label>
        </div>
        <div className="container container-postalcode">
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required="on"
            {...register('address.postalCode')}
          />
          <label htmlFor="postalCode">Código Postal</label>
        </div>
        <div className="container container-phone">
          <input
            type="text"
            id="telephone"
            name="telephone"
            required="on"
            {...register('telephone')}
          />
          <label htmlFor="telephone">Teléfono</label>
        </div>
        <div className="container container-dni">
          <input type="text" id="dni" name="dni" required="on" {...register('dni')} />
          <label htmlFor="dni">DNI</label>
        </div>
        <div className="container container-email">
          <input
            type="text"
            id="email"
            name="email"
            required="on"
            {...register('email')}
          />
          <label htmlFor="email">E-mail</label>
        </div>
        <div className="container container-pwd">
          <input
            type={shown ? 'text' : 'password'}
            onChange={onChange}
            id="pwd"
            name="pwd"
            required="on"
            {...register('password')}
          />
          <label htmlFor="pwd">Contraseña</label>
          <button type="button" onClick={switchShown} className="pass_visual">
            {!shown ? (
              <img
                src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1679167363/9206607_zqbsmv.png"
                alt="Ocultar"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1679167348/3495857_pc77ht.png"
                alt="Mostrar"
              />
            )}
          </button>
        </div>
        <Button
          text="Regístrate"
          type="submit"
          onClick={formSubmit}
          padding="lg"
          variant="contained"
        />
      </form>
    </main>
  );
};

export default Home;
