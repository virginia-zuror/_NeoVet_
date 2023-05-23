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
      <main className="clientOverviewMain">
        <AsideClient />

        <section className="clientOverviewSection">
          <h2>Tus mascotas</h2>
          <div className="grid-userclients">
            {loaded ? (
              mascotas?.map((mascota) => (
                <div key={mascota._id}>
                  <PetCard pet={mascota} />
                  <div className="buts_pets">
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
                </div>
              ))
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserClients;
