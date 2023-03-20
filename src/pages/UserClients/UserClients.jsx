import './UserClients.css';

import { useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import PetCard from '../../components/PetCard/PetCard';
import { API } from '../../services/API';

const UserClients = () => {
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);
  const userLoged = JSON.parse(localStorage.getItem('user'));
  const getPets = () => {
    API.get('/userclients').then((res) => {
      const allUsers = res.data;
      allUsers.map((user) => user._id === userLoged._id && setUser(user));
      setPets(user.pets);
    });
  };
  getPets();
  return (
    <div>
      <AsideClient />
      <main>Perfil cliente</main>
    </div>
  );
};

export default UserClients;
