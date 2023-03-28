import './UserClientsStaff.css';

import React, { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import StaffCard from '../../components/StaffCard/StaffCard';
import { API } from '../../services/API';

const UserClientsStaff = () => {
  const [loaded, setLoaded] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [clinic, setClinic] = useState([]);

  const userLocal = JSON.parse(localStorage.getItem('user'));

  const getAdmins = () => {
    API.get('/admins')
      .then((res) => {
        setAdmins(res.data);
      })
      .then(() => {
        mapAdmins();
      });
  };

  const mapAdmins = () => {
    admins.map((item) => {
      item.clients.map((cl) => {
        if (cl._id.includes(userLocal._id)) {
          setClinic(...clinic, item);
        }
      });
    });
    setLoaded(true);
  };
  useEffect(() => {
    getAdmins();
  }, [loaded]);

  return (
    <main className="userClientStaffMain">
      <AsideClient />
      <section className="window">
        <h2>Nuestro equipo:</h2>
        <div className="staff-section">
          {clinic.staff ? (
            clinic.staff.map((st) => <StaffCard key={st._id} st={st} />)
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserClientsStaff;
