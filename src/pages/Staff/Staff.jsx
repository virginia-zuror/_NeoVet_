import './Staff.css';

import { useEffect, useState } from 'react';

import AsideStaff from '../../components/AsideStaff/AsideStaff';
import { API } from '../../services/API.js';

const Staff = () => {
  const [newAppointments, setNewAppointments] = useState([]);
  const [pendingAp, setPendingAp] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const checkAppointments = () => {
    API.get('/appointments').then((res) => {
      setNewAppointments(res.data);
      const appointFilter = newAppointments.filter(
        (appointment) => appointment.checked === false,
      );
      setPendingAp(appointFilter);
      setLoaded(true);
    });
  };

  useEffect(() => {
    checkAppointments();

    console.log(pendingAp);
  }, [loaded]);

  return (
    <main className="editMain patients">
      <AsideStaff />
      <section className="staff_overview">
        {pendingAp.map((ap) => (
          <h3 key={ap._id}>{ap.reason}</h3>
        ))}
      </section>
    </main>
  );
};

export default Staff;
