import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import RequiredAuthClient from './components/RequiredAuth/RequiredAuthClient';
import RequiredAuthStaff from './components/RequiredAuth/RequiredAuthStaff';
import NeovetContextProvider from './context/neovetContext';
import EditClientProfile from './pages/EditClientProfile/EditClientProfile';
import Home from './pages/Home/Home';
import LoginClient from './pages/LoginClient/LoginClient';
import LoginStaff from './pages/LoginStaff/LoginStaff';
import NotFound from './pages/NotFound/NotFound';
import Pets from './pages/Pets/Pets';
import Staff from './pages/Staff/Staff';
import UserClients from './pages/UserClients/UserClients';

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
              path="/pets"
              element={
                <RequiredAuthClient>
                  <Pets />
                </RequiredAuthClient>
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
            <Route
              path="/userclients"
              element={
                <RequiredAuthClient>
                  <UserClients />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </NeovetContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
