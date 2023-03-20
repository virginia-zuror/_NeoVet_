import './Pets.css';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AsideStaff from '../../components/AsideStaff/AsideStaff';
import PetCard from '../../components/PetCard/PetCard';
import { API } from '../../services/API';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const Pets = () => {
  const { handleSubmit, register } = useForm();
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [showModalConsult, setShowModalConsult] = useState(false);
  const [petChosen, setPetChosen] = useState(null);
  const typeUser = JSON.parse(localStorage.getItem('user'));
  const clickConsult = (value) => {
    setPetChosen(pets[value]);
  };

  const getPets = () => {
    API.get('/pets').then((res) => {
      setPets(res.data);
      setFilter(res.data);
      setLoaded(true);
    });
  };

  const formSubmit = (formData) => {
    try {
      API.post('/consults', formData).then((res) => {
        console.log(res.data);
        setShowModalConsult(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filterFunction = (value) => {
    const petFilter = pets.filter((pet) => pet.name.toLowerCase().includes(value));
    setFilter(petFilter);
  };

  useEffect(() => {
    getPets();
    console.log(petChosen);
  }, [petChosen]);

  return (
    <div>
      <AsideStaff />
      <main>
        <h2>Pets</h2>
        <input
          type="text"
          placeholder="Buscar"
          onChange={(ev) => {
            filterFunction(ev.target.value.toLowerCase());
          }}
        />
        <div className="grid-pets">
          {loaded ? (
            filter.map((pet, index) => (
              <figure key={index} className="pet_figure">
                <PetCard pet={pet} />
                <div className="pet-buttons">
                  <Button
                    text="Nueva Consulta"
                    padding="lg"
                    action={() => {
                      setShowModalConsult(true);
                      clickConsult(index);
                    }}
                  />
                  <Button text="Ver Perfil" padding="lg" />
                  <Button text="Hitorial" padding="lg" />
                </div>
                {showModalConsult && (
                  <Modal
                    text="Registrar consulta"
                    action={formSubmit}
                    content={
                      <div className="modal_consult">
                        <h2>Nueva consulta</h2>
                        <form onSubmit={handleSubmit(formSubmit)} id="formulario">
                          <div className="container">
                            <input
                              type="text"
                              id="date"
                              name="date"
                              required="on"
                              {...register('date')}
                            />
                            <label htmlFor="date">Fecha</label>
                          </div>
                          <div className="container">
                            <input
                              type="text"
                              id="vet"
                              name="vet"
                              value={typeUser.name}
                              required="on"
                              {...register('vet')}
                            />
                          </div>
                          <div className="container exploracion">
                            <input
                              type="text"
                              id="exp"
                              name="exp"
                              required="on"
                              {...register('exp')}
                            />
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
                        </form>
                      </div>
                    }
                  />
                )}
              </figure>
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </main>
    </div>
  );
};

export default Pets;
