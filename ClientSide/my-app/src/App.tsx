import React from 'react';
import { Register_Form, Login_Form } from './components/register_login_components'
import { MainPage } from './pages/main_page'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>  
          <Route path='/' element={<></>}/>
          <Route path='/profile_page:id'/>
          <Route path='/login_registration_page'/>
          <Route/>
        </Routes>
      </BrowserRouter>
      <div>
        <MainPage></MainPage>
        <Register_Form></Register_Form>
        <Login_Form></Login_Form>
      </div>
    </>
  );
}

export default App;
