import './Home.css';

import { useContext, useEffect, useState } from 'react';


import { NeovetContext } from '../../context/neovetContext';
import { API } from '../../services/API.js';

const Home = () => {
  const [staff, setStaff] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getStaff = () => {
    API.get('/staff').then((res) => {
      setStaff(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getStaff();
  }, []);

  return <main>Home</main>;
};

export default Home;
