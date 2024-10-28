import React, { useState } from "react";
import UserClient, { UserInterface } from "../managers/user_client";
import styled from 'styled-components'

const userAPI = new UserClient();

const InputDiv = () => (
  <div style={{ position: "relative", height: "40px", width: "400px" }}>
    <div
      style={{
        position: "absolute",
        top: "-4px",
        left: "2px",
        width: "400px",
        height: "36px",
        backgroundColor: "#F3F2F2",
        zIndex: 2
      }}
    />
    <input
      type="text"
      name="username"
      placeholder="Write your name"
      style={{
        position: "relative",
        width: "100%",
        height: "36px",
        padding: "8px",
        border: "none",
        outline: "none",
        top:-10 ,
        left:+5,
        zIndex: 3,
        fontSize:20,
        color:"#9BBB85",
        backgroundColor: "transparent",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "404px",
        height: "36px",
        backgroundColor: "#B0C5A2",
        zIndex: 1
      }}
    />
  </div>
);

export const Register_Form: React.FC = () => {
  const [user, setUser] = useState<UserInterface>({
    username: "",
    useremail: "",
    userpass: ""
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = await userAPI.PostUser(user);
    console.log("User registered successfully:", newUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <InputDiv />
      <form onSubmit={handleSubmit}>
        <input
          value={user.username}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Write your name"
        />
        <input
          value={user.useremail}
          onChange={handleChange}
          type="email"
          name="useremail"
          placeholder="Write your email"
        />
        <input
          value={user.userpass}
          onChange={(e) => setUser({ ...user, userpass: String(e.target.value) })}
          type="password"
          name="userpass"
          placeholder="Write your password"
        />
        <button style={{ width: "70px", height: "40px" }} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export const Login_Form: React.FC = () => {
  const [user, setUser] = useState({
    useremail: "",
    userpass: ""
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const verification = await userAPI.VerefyPassword(user.userpass, user.useremail);
    console.log("Verification result:", verification);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="useremail"
        placeholder="Write your email"
        value={user.useremail}
        onChange={handleChange}
      />
      <input
        type="password"
        name="userpass"
        placeholder="Your password"
        value={user.userpass}
        onChange={handleChange}
      />
      <button style={{ width: "70px", height: "40px" }} type="submit">Submit</button>
    </form>
  );
};

const StyledForm = styled.form``;
