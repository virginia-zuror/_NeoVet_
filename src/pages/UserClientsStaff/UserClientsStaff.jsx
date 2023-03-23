import React, { useEffect, useState } from 'react';

import AsideClient from '../../components/AsideClient/AsideClient';
import { API } from '../../services/API';
import Button from '../../UI/Button';

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
    console.log(clinic);
    setLoaded(true);
  };
  useEffect(() => {
    getAdmins();
  }, [loaded]);

  return (
    <main className="uCStaffMain">
      <AsideClient />
      <section className="uCStaffSection">
        userClientsStaff
        {clinic.staff ? (
          clinic.staff.map((staffmember) => <h3>{staffmember.name}</h3>)
        ) : (
          <h3>Loading...</h3>
        )}
      </section>
    </main>
  );
};

export default UserClientsStaff;
