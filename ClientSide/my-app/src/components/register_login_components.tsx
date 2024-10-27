import React, { useState } from "react";
import UserClient, { UserInterface } from '../managers/user_client';

const userAPI = new UserClient();

export const Register_Form: React.FC = () => {
<<<<<<< HEAD
    const [user, setUser] = useState<UserInterface>(
        {
            username: "",
            useremail: "",
            userpass: ""
        });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser = await userAPI.PostUser(user);
        console.log("User registered successfully:", newUser);
=======
    const [user, setUser] = useState<UserInterface>({ username: "", useremail: "", userpass: "" });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const newUser = await userAPI.PostUser(user);
            console.log("User registered successfully:", newUser);
        } catch (error) {
            console.error("Error registering user:", error);
        }
>>>>>>> efa3999b138e04fb1ce048be85e0ede7967498cf
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={user.username} onChange={handleChange} type="text" name="username" placeholder="Write your name" />
            <input value={user.useremail} onChange={handleChange} type="email" name="useremail" placeholder="Write your email" />
            <input value={user.userpass} onChange={(e) => setUser({ ...user, userpass: String(e.target.value) })} type="password" name="userpass" placeholder="Write your password" />
            <button style={{ width: "70px", height: "40px" }} type="submit">Submit</button>
        </form>
    );
};

export const Login_Form: React.FC = () => {
<<<<<<< HEAD
    const[user,setUser]=useState({
        userpass:"",
        useremail:""
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser = await userAPI.(user);
        console.log("User registered successfully:", newUser);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    return (<>
        <form action="POST">
            <input type="text" name="username" placeholder="write your name" />
            <input type="password" name="username" placeholder=" your name" />
=======
    const [user, setUser] = useState<UserInterface | null>(null);
    return (<>
        <form action="POST">
            <input type="text" name="username" placeholder="write your name" />
            <input type="text" name="username" placeholder="write your name" />
            <input type="text" name="username" placeholder="write your name" />
>>>>>>> efa3999b138e04fb1ce048be85e0ede7967498cf
            <button style={{ width: "70px", height: "40px" }} type="submit">Submit</button>
        </form>
    </>
    );
<<<<<<< HEAD
};
=======
};
>>>>>>> efa3999b138e04fb1ce048be85e0ede7967498cf
