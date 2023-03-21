import './Home.css';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { API } from '../../services/API.js';
import Button from '../../UI/Button';
import StaffCard from '../../components/StaffCard/StaffCard'

const Home = () => {
  const { register, handleSubmit } = useForm();

  const formSubmit = (formData) => {
    API.post('/userclients', formData).then((res) => {
      console.log(res.data);
    });
  };

  const [admins, setAdmins] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getAdmins = () => {
    API.get('/admins').then((res) => {
      setAdmins(res.data);
      setLoaded(true);
    });
  };

  const [staff, setStaff] = useState([]);

  const getStaff = () => {
    API.get('/staff').then((res) => {
      setStaff(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getAdmins();
    getStaff();
  }, []);

  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => currentTarget.value;

  return (
    <main id="home">
      <section className="hero-section">
        <div className="hero-text-container">
          <h1 className="hero-text-head">
            Lorem fistrum 
          </h1>
          <h3 className="hero-text-description">
          Pecador pecador está la cosa muy malar hasta luego Lucas pecador pecador está la cosa muy malar hasta luego Lucas
          </h3>
          <div className="bar"></div>
          <a href="#formulario">
            <Button
                text="Haz click aquí y regístrate ya"
                type="submit"
                padding="xl"
              />
            </a>
        </div>
        <div className="hero-illustration-container">
          <img src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1679339852/neovetdrawing_d2if02.png" alt="Chica con perro y gato"></img>
        </div>
      </section>
      <section className="staff-section">
          { loaded ? (
            staff.map((st) => (
                <StaffCard key={ st._id } st={ st }/>
            )) 
            ) : (
            <p>Loading...</p>
            )};
      </section>
      <section className="register-section">
          <h2>Solicitud de registro</h2>
          <form onSubmit={handleSubmit(formSubmit)} id="formulario">
            <div className="container container-name">
              <input
                type="text"
                id="name"
                name="name"
                required
                {...register('name')}
              />
              <label htmlFor="name">Nombre</label>
            </div>
            <div className="container container-street">
              <input
                type="text"
                id="street"
                name="street"
                required
                {...register('address.street')}
              />
              <label htmlFor="street">Calle</label>
            </div>
            <div className="container container-city">
              <input
                type="text"
                id="city"
                name="city"
                required
                {...register('address.city')}
              />
              <label htmlFor="city">Ciudad</label>
            </div>
            <div className="container container-region">
              <input
                type="text"
                id="region"
                name="region"
                required
                {...register('address.region')}
              />
              <label htmlFor="region">C.Autónoma</label>
            </div>
            <div className="container container-postalcode">
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                required
                {...register('address.postalCode')}
              />
              <label htmlFor="postalCode">Código Postal</label>
            </div>
            <div className="container container-phone">
              <input
                type="text"
                id="telephone"
                name="telephone"
                required
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
                required
                {...register('email')}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="container container-admins">
              <select name="admins" id="admins" defaultValue="nothing">
                <option value="nothing"></option>
                {loaded ? (
                  admins.map((admin) => (
                    <option key={admin._id} value={admin.business}>
                      {admin.business}
                    </option>
                  ))
                ) : (
                  <option value="loading">Loading...</option>
                )}
              </select>
              <label htmlFor="admins">Clínicas</label>
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
              size="lg"
            />
          </form>
      </section>
    </main>
  );
};

export default Home;
