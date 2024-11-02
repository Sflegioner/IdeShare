import React, { useState } from "react";
import UserClient, { UserInterface } from "../managers/user_client";

const userAPI = new UserClient();

interface InputDivProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  placeholder: string;
}

const InputDiv: React.FC<InputDivProps> = ({
  value,
  onChange,
  name,
  type = "text",
  placeholder,
}) => (
  <div style={{ position: "relative", height: "40px", width: "400px" }}>
    <div
      style={{
        position: "absolute",
        top: "-4px",
        left: "2px",
        width: "400px",
        height: "36px",
        backgroundColor: "#F3F2F2",
        zIndex: 2,
      }}
    />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        position: "relative",
        width: "100%",
        height: "36px",
        padding: "8px",
        border: "none",
        outline: "none",
        top: -10,
        left: 5,
        zIndex: 3,
        fontSize: 20,
        color: "#9BBB85",
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
        zIndex: 1,
      }}
    />
  </div>
);

export const Register_Form: React.FC = () => {
  const [user, setUser] = useState<UserInterface>({
    username: "",
    useremail: "",
    userpass: "",
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
    <form onSubmit={handleSubmit}>
      <InputDiv
        value={user.username}
        onChange={handleChange}
        name="username"
        placeholder="Write your name"
      />
      <InputDiv
        value={user.useremail}
        onChange={handleChange}
        name="useremail"
        type="email"
        placeholder="Write your email"
      />
      <InputDiv
        value={user.userpass}
        onChange={handleChange}
        name="userpass"
        type="password"
        placeholder="Write your password"
      />
      <button style={{ width: "70px", height: "40px" }} type="submit">
        Submit
      </button>
    </form>
  );
};

// Форма входу з кастомним InputDiv
export const Login_Form: React.FC = () => {
  const [user, setUser] = useState({
    useremail: "",
    userpass: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const verification = await userAPI.VerefyPassword(
      user.userpass,
      user.useremail
    );
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
      <InputDiv
        value={user.useremail}
        onChange={handleChange}
        name="useremail"
        type="text"
        placeholder="Write your email"
      />
      <InputDiv
        value={user.userpass}
        onChange={handleChange}
        name="userpass"
        type="password"
        placeholder="Your password"
      />
      <button style={{ width: "70px", height: "40px" }} type="submit">
        Submit
      </button>
    </form>
  );
};
