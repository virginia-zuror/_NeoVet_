import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import RequiredAuthClient from './components/RequiredAuth/RequiredAuthClient';
import RequiredAuthStaff from './components/RequiredAuth/RequiredAuthStaff';
import NeovetContextProvider from './context/neovetContext';
import Consult from './pages/Consult/Consult';
import CreatePet from './pages/CreatePet/CreatePet';
import EditClientProfile from './pages/EditClientProfile/EditClientProfile';
import Home from './pages/Home/Home';
import LoginClient from './pages/LoginClient/LoginClient';
import LoginStaff from './pages/LoginStaff/LoginStaff';
import NotFound from './pages/NotFound/NotFound';
import PetDetails from './pages/PetDetails/PetDetails';
import Pets from './pages/Pets/Pets';
import Staff from './pages/Staff/Staff';
import StaffAgenda from './pages/StaffAgenda/StaffAgenda';
import UserClients from './pages/UserClients/UserClients';
import UserClientsAgenda from './pages/userClientsAgenda/userClientsAgenda';
import UserClientsAppoint from './pages/UserClientsAppoint/UserClientsAppoint';
import UserClientsStaff from './pages/UserClientsStaff/UserClientsStaff';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <NeovetContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/loginstaff" element={<LoginStaff />} />
            <Route path="/loginclientes" element={<LoginClient />} />
            <Route
              path="/staff_pets"
              element={
                <RequiredAuthStaff>
                  <Pets />
                </RequiredAuthStaff>
              }
            />
            <Route
              path="/staff"
              element={
                <RequiredAuthStaff>
                  <Staff />
                </RequiredAuthStaff>
              }
            />
            <Route path="/staff_pets/:id" element={<PetDetails />} />
            <Route path="/userclients/:id" element={<PetDetails />} />
            <Route
              path="/staff_agenda"
              element={
                <RequiredAuthStaff>
                  <StaffAgenda />
                </RequiredAuthStaff>
              }
            />

            <Route
              path="/userclients"
              element={
                <RequiredAuthClient>
                  <UserClients />
                </RequiredAuthClient>
              }
            />
            <Route
              path="/userclients_appoint"
              element={
                <RequiredAuthClient>
                  <UserClientsAppoint />
                </RequiredAuthClient>
              }
            />
            <Route
              path="/userclients_createpet"
              element={
                <RequiredAuthClient>
                  <CreatePet />
                </RequiredAuthClient>
              }
            />
            <Route
              path="/userclients_agenda"
              element={
                <RequiredAuthClient>
                  <UserClientsAgenda />
                </RequiredAuthClient>
              }
            />
            <Route
              path="/userclients_staff"
              element={
                <RequiredAuthClient>
                  <UserClientsStaff />
                </RequiredAuthClient>
              }
            />
            <Route
              path="/editprofile"
              element={
                <RequiredAuthClient>
                  <EditClientProfile />
                </RequiredAuthClient>
              }
            />
            <Route
              path="/consult"
              element={
                <RequiredAuthStaff>
                  <Consult />
                </RequiredAuthStaff>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </NeovetContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
