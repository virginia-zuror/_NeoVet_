import './UserClients.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import AsideClient from '../../components/AsideClient/AsideClient';
import PetCard from '../../components/PetCard/PetCard';
import { API } from '../../services/API';
import Button from '../../UI/Button';

const UserClients = () => {
  const navigate = useNavigate();

  const [mascotas, setMascotas] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [details, setDetails] = useState('');
  const userLoged = JSON.parse(localStorage.getItem('user'));
  //const getIdPet = idPet._id;
  console.log(userLoged.pets);

  /*const getPetsById = () => {
    API.get(`/pets/${getIdPet}`).then((res) => {
      setDetails(res.data);
      console.log(res.data);
    });
  };*/

  const getPets = () => {
    API.get('/userclients').then((res) => {
      setAllUsers(res.data);
      allUsers.map((user) => user._id === userLoged._id && setMascotas(user.pets));

      setLoaded(true);
    });
  };

  useEffect(() => {
    getPets();
    //getPetsById();
  }, [loaded]);

  return (
    <div>
      <main className="clientOverviewMain">
        <AsideClient />
        <section className="clientOverviewSection">
          <h3>Tus mascotas</h3>

          {loaded ? (
            mascotas?.map((mascota) => (
              <div className="grid-userclients" key={mascota._id}>
                <PetCard pet={mascota} />
                <Button
                  text="Pedir Cita"
                  padding="lg"
                  action={() => {
                    localStorage.setItem('pet', JSON.stringify(mascota));
                    navigate('/userclients_appoint');
                  }}
                />
                <Button
                  text="Ver Perfil"
                  padding="lg"
                  action={() => {
                    localStorage.setItem('pet', JSON.stringify(mascota));
                    navigate('/userclients/:id');
                  }}
                />
              </div>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserClients;
