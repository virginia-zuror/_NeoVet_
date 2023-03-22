import './userClientsAgenda.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API';

const UserClientsAgenda = () => {
  const [petsFound, setPetsFound] = useState([]);
  const userInLocal = JSON.parse(localStorage.getItem('user'));
  const allPets = userInLocal.pets;
  const [loaded, setLoaded] = useState(false);
  const [petByUser, setPetByUser] = useState();

  let pets = [];
  const getAllPets = () => {
    API.get('/pets')
      .then((res) => {
        setPetsFound(res.data);
        console.log(res.data);
        petsFound.map((petFound) => {
          if (allPets.includes(petFound._id)) {
            pets.push(petFound);
          }
        });
        setPetByUser(pets);
        setLoaded(true);
      })
      .catch(console.log('error'));
  };

  useEffect(() => {
    getAllPets();

    console.log(petByUser);
  }, [loaded === true]);

  return (
    <div className="content">
      <AsideClient />
      <main>
        {loaded === true ? (
          petByUser.map((pet) =>
            pet.appoint.map((ap) =>
              ap.checked === true ? (
                <figure key={ap._id}>
                  <h4>{pet.name}</h4>
                  <h5>{ap.date.toString().split('').slice(0, 10)}</h5>
                  <h5>{ap.date.toString().split('').slice(11, 16)}</h5>
                  <h4>Motivo:</h4>
                  <p>{ap.reason}</p>
                  <h4>Comentarios:</h4>
                  <p>{ap.comments}</p>
                </figure>
              ) : (
                <h4 key={pet._id}>{pet.name}: No tiene citas</h4>
              ),
            ),
          )
        ) : (
          <h2>Loading...</h2>
        )}
      </main>
    </div>
  );
};

export default UserClientsAgenda;
