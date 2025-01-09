import React, { useState } from 'react'
import { Login_Form } from '../components/register_login_components'
import { Register_Form } from '../components/register_login_components'
import '../page_styles/register_login.css'

export const LoginRegistrationPage = () => {
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false)

    const RegistrationLoginBox = () => (
        <div className='container'>
            <div className='leftContainer'>
                <div className='formContainer'>
                    <div className='singLabel'>Sign in/up</div>
                    {isAlreadyRegistered ? <Login_Form /> : <Register_Form />}
                    <p
                        onClick={() => setIsAlreadyRegistered(!isAlreadyRegistered)}
                        style={{
                            cursor: 'pointer',
                            marginTop: 20,
                            color: 'rgba(176, 197, 162, 1)',
                        }}
                    >
                        {isAlreadyRegistered
                            ? "Don't have an account? Register"
                            : 'Have an account? Log in'}
                    </p>
                </div>
            </div>
            <div className='rightContainer'>[placeholder]</div>
        </div>
    )

    return <RegistrationLoginBox />
}
