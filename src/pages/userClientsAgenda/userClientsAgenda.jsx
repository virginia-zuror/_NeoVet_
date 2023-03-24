import './userClientsAgenda.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import Button from '../../UI/Button'
import { API } from '../../services/API';

const UserClientsAgenda = () => {
  const [petsFound, setPetsFound] = useState([]);
  const userInLocal = JSON.parse(localStorage.getItem('user'));
  const allPets = userInLocal.pets;
  let pendingAppointByPet = null;
  const [loaded, setLoaded] = useState(false);
  const [petByUser, setPetByUser] = useState();
  const [deletedAppointment, setDeletedAppointment] = useState("");
  

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

  const deleteAppointment = (pendingAppointByPet) => {
    API.delete(`/appointments/${pendingAppointByPet}`).then((res) => {
      console.log(res.data);
      setDeletedAppointment(pendingAppointByPet);
    });
  };

  useEffect(() => {
    getAllPets();
    console.log(pendingAppointByPet);
    console.log(petByUser);
  }, [loaded === true], [deletedAppointment]);

  return (
    <div className="content">
      <AsideClient />
      <main>
        {loaded === true ? (
          petByUser.map((pet) =>
            pet.appoint.map((ap) =>
              ap.state === 'pending' && (
                <figure key={ap._id}>
                  <h4>{pet.name}</h4>
                  <h5>{ap.date.toString().split('').slice(0, 10)}</h5>
                  <h5>{ap.date.toString().split('').slice(11, 16)}</h5>
                  <h4>Motivo:</h4>
                  <p>{ap.reason}</p>
                  <h4>Comentarios:</h4>
                  <p>{ap.comments}</p>
                  <p>{ap._id}</p>
                  <Button text="Eliminar cita" action={ () => {
                    pendingAppointByPet = ap._id;
                    deleteAppointment(pendingAppointByPet);
                  }} />
                </figure>
              ),
              //: (
                //<h4 key={pet._id}>{pet.name}: No tiene citas</h4>
              //),
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
