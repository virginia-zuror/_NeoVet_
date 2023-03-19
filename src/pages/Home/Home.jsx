import './Home.css';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';
import { API } from '../../services/API.js';

const Home = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();


  const formSubmit = (formData) => {
     API.post("/userclients", formData)
     .then((res) => {
      console.log(res.data)
     })
  };
  const formSubmit = (formData) => {};

  return (
    <main>
      <h2>Formulario de registro</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="container-name">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            {...register('name')}
          />
        </div>
        <div className="container-address">
          <label htmlFor="address">Dirección</label>

            <input 
              type="text" 
              id="address" 
              name="street"
              placeholder="Calle"
              {...register('address.street')}
            /> 
            <input 
              type="text" 
              id="address" 
              name="city"
              placeholder="Ciudad"
              {...register('address.city')}
            />
            <input 
              type="text" 
              id="address" 
              name="region"
              placeholder="C. Autónoma"
              {...register('address.region')}
            /> 
            <input 
            type="text" 
            id="address" 
            name="postalCode"
            placeholder="Código Postal"
            {...register('address.postalCode')}
            /> 
        </div>
        <div className="container-phone">
          <label htmlFor="telephone">Teléfono</label>
          <input 
            type="text" 
            id="telephone" 
            name="telephone"
            placeholder="Teléfono"
            {...register('telephone')}
            /> 
        </div>
        <div className="container-dni">
          <label htmlFor="dni">DNI</label>
          <input 
            type="text" 
            id="dni" 
            name="dni"
            placeholder="DNI"
            {...register('dni')}
            /> 
        </div>
        <div className="container-email">
          <label htmlFor="email">E-mail</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            placeholder="E-mail"
            {...register('email')}
            /> 
        </div>
        <div className="container-pwd">
          <label htmlFor="pwd">Contraseña</label>
          <input 
            type="password" 
            id="pwd" 
            name="pwd"
            placeholder="Contraseña"
            {...register('password')}
            /> 
          <input
            type="text"
            id="adress"
            name="street"
            placeholder="Calle"
            {...register('street')}
          />
          <input
            type="text"
            id="adress"
            name="city"
            placeholder="Ciudad"
            {...register('city')}
          />
          <input
            type="text"
            id="adress"
            name="region"
            placeholder="C. Autónoma"
            {...register('region')}
          />
          <input
            type="text"
            id="adress"
            name="postalCode"
            placeholder="Código Postal"
            {...register('postalCode')}
          />
        </div>
        <div className="container-phone">
          <label htmlFor="telephone">Teléfono</label>
          <input
            type="text"
            id="adress"
            name="postalCode"
            placeholder="Código Postal"
            {...register('postalCode')}
          />
        </div>
        <button type="submit" onClick={formSubmit}>Registrar</button>
      </form>
    </main>
  );
};

export default Home;
