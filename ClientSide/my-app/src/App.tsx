import React from 'react';
import { Register_Form, Login_Form } from './components/register_login_components'
import { MainPage } from './pages/main_page'
import {LoginRegistrationPage} from './pages/login_registration_page'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Nav_Bar } from './components/nav_bar_components';
import './App.css';
import { ProtectedRoute } from './managers/user_session_checker';
import { ProfilePage } from './pages/profile_page';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav_Bar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login_registration_page' element={<LoginRegistrationPage />} />
          <Route path='/profile_page' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
