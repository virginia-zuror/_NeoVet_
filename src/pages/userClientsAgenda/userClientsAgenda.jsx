import './userClientsAgenda.css';

import React from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';


const UserClientsAgenda = () => {
  return (
    <div>
      <AsideClient />
      <main id="calendar-client">
      </main>
    </div>
  );
};

export default UserClientsAgenda;
