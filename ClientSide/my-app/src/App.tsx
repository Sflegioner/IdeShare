import React from 'react';
import { Register_Form, Login_Form } from './components/register_login_components'
import { MainPage } from './pages/main_page'
import {LoginRegistrationPage} from './pages/login_registration_page'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Nav_Bar } from './components/nav_bar_components';
import './App.css';
import { ProtectedRoute } from './managers/user_session_checker';
import { ProfilePage } from './pages/profile_page';
import { CreatePostPage } from './pages/create_post_page';
import {AllPostPage} from './pages/all_post'
import { Logout } from './components/logout_component';
import { ApplyPage } from './pages/apply';


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav_Bar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login_registration_page' element={<LoginRegistrationPage />} />
          <Route path='/profile_page' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path='/create_post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
          <Route path='/apply' element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
          <Route path='/all_posts' element={<ProtectedRoute><AllPostPage /></ProtectedRoute>} />
          <Route path='/logout' element={<ProtectedRoute><Logout></Logout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
