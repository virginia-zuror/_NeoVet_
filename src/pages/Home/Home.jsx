import './Home.css';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';
import { API } from '../../services/API.js';

const Home = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { login, user } = useContext(NeovetContext);

  const formSubmit = (formData) => {
    API.post('/staff/login', formData).then((res) => {
      console.log(res.data);
      login(res.data.staff, res.data.token);
    });
  };

  const [staff, setStaff] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getStaff = () => {
    API.get('/staff').then((res) => {
      setStaff(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="email" {...register('email')} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" {...register('password')} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Home;
