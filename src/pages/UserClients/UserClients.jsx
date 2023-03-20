import './UserClients.css';


import { useEffect, useState } from 'react';


import AsideClient from '../../components/AsideClient/AsideClient';
import PetCard from '../../components/PetCard/PetCard';
import { API } from '../../services/API';

const UserClients = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const userLoged = JSON.parse(localStorage.getItem('user'));

  const getPets = () => {
    API.get('/userclients').then((res) => {
      setAllUsers(res.data);
      allUsers.map((user) => user._id === userLoged._id && setMascotas(user.pets));

      setLoaded(true);
    });
  };

  useEffect(() => {
    getPets();
  }, [loaded]);

  return (
    <div>
      <AsideClient />
      <main>
        <h3>Tus mascotas</h3>
        {loaded ? (
          mascotas?.map((mascota) => <PetCard pet={mascota} key={mascota._id} />)
        ) : (
          <h2>Loading...</h2>
        )}
      </main>

  getPets();
  return (
    <div>
      <AsideClient />
      <main>Perfil cliente</main>
    </div>
  );
};

export default UserClients;
