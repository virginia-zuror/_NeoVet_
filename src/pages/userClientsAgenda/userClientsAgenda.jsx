import './userClientsAgenda.css';

import { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API';

const UserClientsAgenda = () => {
  const [clients, setClients] = useState([]);
  const userInLocal = JSON.parse(localStorage.getItem('user'));
  const [clientLogged, setClientLogged] = useState();
  const [userLoaded, setUserLoaded] = useState(false);

  const getClients = () => {
    API.get('/userClients').then((res) => {
      setClients(res.data);
      setUserLoaded(true);
    });
  };

  const mapClients = () => {
    clients.map((client) => 
    {if(client._id == userInLocal._id){
      setClientLogged(client);
    }});
    console.log(clientLogged);
  };

  useEffect(() => {
    getClients();
    mapClients();
  }, []);

  return (
    <div className="content">
      <AsideClient />
      <main>
        <p>{clientLogged?.name}</p>
      </main>
    </div>
  );
};

export default UserClientsAgenda;
