import './Staff.css';

import { useEffect, useState } from 'react';

import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API.js';
import Button from '../../UI/Button';

const Staff = () => {
  const [pets, setPets] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [showAppoints, setShowAppoints] = useState(false);
  let petWithAppointment = [];

  const checkAppointments = () => {
    API.get('/pets').then((res) => {
      setPets(res.data);
    });
  };

  const mapAppoints = () => {
    pets.map((pet) => {
      pet.appoint.map((ap) => {
        if (ap.checked === false) {
          petWithAppointment.push({
            pet,
            ap,
          });
        }
      });
    });
    setShowAppoints(true);
    console.log(showAppoints);
    setLoaded(true);
  };

  /* const putToChecked = () => {
    const data = {
      checked: true,
    };
    API.put(`/appointments/${pendingAp}`, data).then((res) => {
      console.log(res.data);
    });
  }; */
  useEffect(() => {
    checkAppointments();
    mapAppoints();
    console.log(petWithAppointment[1]?.pet.name, petWithAppointment[1]?.ap.reason);
  }, [loaded]);

  return (
    <main className="editMain patients">
      <AsideStaff />
      <section className="staff_overview">
        {loaded ? (
          <>
            <h2>{petWithAppointment[0]?.pet.name}</h2>
            <h2>{petWithAppointment[0]?.ap.reason}</h2>
          </>
        ) : (
          ''
        )}
      </section>
    </main>
  );
};

export default Staff;
