import './Pets.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AsideStaff from '../../components/AsideStaff/AsideStaff';
import PetCard from '../../components/PetCard/PetCard';
import { API } from '../../services/API';
import Button from '../../UI/Button';

const Pets = () => {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getPets = () => {
    API.get('/pets').then((res) => {
      setPets(res.data);
      setFilter(res.data);
      setLoaded(true);
    });
  };

  const filterFunction = (value) => {
    const petFilter = pets.filter((pet) => pet.name.toLowerCase().includes(value));
    setFilter(petFilter);
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <main className="editMain patients">
      <AsideStaff />
      <section className="editSection">
        <h2>Pacientes</h2>
        <input
          type="text"
          placeholder="Buscar"
          onChange={(ev) => {
            filterFunction(ev.target.value.toLowerCase());
          }}
        />
        <div className="grid-patients">
          {loaded ? (
            filter.length ? (
              filter.map((pet, index) => (
                <figure key={index} className="pet_figure">
                  <PetCard pet={pet} />
                  <div className="pet-buttons">
                    <Button
                      text="Nueva Consulta"
                      padding="lg"
                      action={() => {
                        localStorage.setItem('pet', JSON.stringify(pet));
                        navigate('/consult');
                      }}
                    />
                    <Button
                      text="Ver Perfil"
                      padding="lg"
                      action={() => {
                        localStorage.setItem('pet', JSON.stringify(pet));
                        navigate('/staff_pets/:id');
                      }}
                    />
                  </div>
                </figure>
              ))
            ) : (
              <h3>No se han encontrado coincidencias de búsqueda</h3>
            )
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </section>
    </main>
  );
};

export default Pets;
