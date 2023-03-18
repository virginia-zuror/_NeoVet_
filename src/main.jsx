import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home"
import Pets from "./pages/Pets/Pets"
import Staff from "./pages/Staff/Staff"
import UserClients from "./pages/UserClients/UserClients"
import NotFound from "./pages/NotFound/NotFound"
import EditClientProfile from "./pages/EditClientProfile/EditClientProfile"

import App from './App';
import NeovetContextProvider from './context/neovetContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter basename="/">
   <NeovetContextProvider>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path="/pets" element={<Pets/>}/>
        <Route path="/staff" element={<Staff/>}/>
        <Route path="/userclients" element={<UserClients/>}/>
        <Route path="/editprofile" element={<EditClientProfile/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    </NeovetContextProvider>
   </BrowserRouter>
  </React.StrictMode>,
);
