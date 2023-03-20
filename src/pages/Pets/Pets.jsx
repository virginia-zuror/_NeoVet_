import './Pets.css';

import { useEffect, useState } from 'react';

import AsideStaff from '../../components/AsideStaff/AsideStaff';
import PetCard from '../../components/PetCard/PetCard';
import { API } from '../../services/API';

const Pets = () => {
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
    const petFilter = pets.filter((pet) => pet.name.toLowerCase().includes(value))
    setFilter(petFilter);
  }

  useEffect(() => {
    getPets();
  }, []);

  return (
    <main>
      <AsideStaff />
      <h2>Pets</h2>
      <input
      type="text"
      placeholder="Buscar"
      onChange={(ev) => {
        filterFunction(ev.target.value.toLowerCase());
      }}/>
      <div className="grid-pets">
        {loaded ? (
          filter.map((pet) => <PetCard pet={pet} key={pet.chip} />)
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </main>
  );
};

export default Pets;
