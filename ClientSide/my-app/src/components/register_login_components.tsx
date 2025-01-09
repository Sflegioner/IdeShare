import React, { useState } from 'react'
import UserClient, { UserInterface } from '../managers/user_client'
import Cookies, { useCookies } from 'react-cookie'
import { timeEnd } from 'console'
import { useNavigate } from 'react-router-dom'
import '../page_styles/register_login.css'

const userAPI = new UserClient()

interface InputDivProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    type?: string
    placeholder: string
}

interface ButtonSubmitProps {
    text: string
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ text }) => (
    <button className='myButton' type='submit'>
        {text}
    </button>
)
const InputDiv: React.FC<InputDivProps> = ({
    value,
    onChange,
    name,
    type = 'text',
    placeholder,
}) => (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='myInput'
    />
)

export const Register_Form: React.FC = () => {
    const [cookies, setCookie] = useCookies()
    const [user, setUser] = useState<UserInterface>({
        username: '',
        useremail: '',
        userpass: '',
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newUser = await userAPI.PostUser(user)
        console.log('User registered successfully:', newUser)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form className='myForm' onSubmit={handleSubmit}>
            <label className='inputLabel'>Name</label>
            <InputDiv
                value={user.username}
                onChange={handleChange}
                name='username'
                placeholder='Write your name'
            />
            <label className='inputLabel'>Email</label>

            <InputDiv
                value={user.useremail}
                onChange={handleChange}
                name='useremail'
                type='email'
                placeholder='Write your email'
            />
            <label className='inputLabel'>Password</label>

            <InputDiv
                value={user.userpass}
                onChange={handleChange}
                name='userpass'
                type='password'
                placeholder='Write your password'
            />
            <ButtonSubmit text='Register' />
        </form>
    )
}

export const Login_Form: React.FC = () => {
    const [cookies, setCookie] = useCookies()
    const [user, setUser] = useState({
        useremail: '',
        userpass: '',
    })
    const redirect = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const verification = await userAPI.VerefyPassword(user.userpass, user.useremail)
        console.log('Verification result:', verification)
        //Змінити цю хуйню на нормалій реквест з булом
        if (verification == 'Password verification successful') {
            setCookie('IsAuth', true, { maxAge: 30000 })
            redirect('/')
        } else {
            console.log('Wrong')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputDiv
                value={user.useremail}
                onChange={handleChange}
                name='useremail'
                type='text'
                placeholder='Write your email'
            />
            <InputDiv
                value={user.userpass}
                onChange={handleChange}
                name='userpass'
                type='password'
                placeholder='Your password'
            />
            <ButtonSubmit text='Login' />
        </form>
    )
}
