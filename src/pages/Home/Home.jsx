import './Home.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { NeovetContext } from '../../context/neovetContext';
import { API } from '../../services/API.js';

const Home = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const formSubmit = (formData) => {
      
  }

  return (
    <main>
      <h2>Formulario de registro</h2>
      <form onSubmit={handleSubmit(register)}>
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
      </form>
    </main>
  );
};

export default Home;
