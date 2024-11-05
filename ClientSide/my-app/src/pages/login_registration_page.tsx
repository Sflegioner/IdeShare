import React, { useState } from "react";
import { Login_Form } from "../components/register_login_components";
import { Register_Form } from "../components/register_login_components";

export const LoginRegistrationPage = () => {
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

    const RegistrationLoginBox = () => (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <div
                style={{
                    height: 550,
                    width: 750,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 4px 12px rgba(176, 197, 162, 1)",
                    borderRadius: 8,
                    padding: 20,
                }}
            >
                {isAlreadyRegistered ? <Login_Form /> : <Register_Form />}
                <p onClick={() => setIsAlreadyRegistered(!isAlreadyRegistered)} style={{ cursor: "pointer", marginTop: 20, color: "rgba(176, 197, 162, 1)" }}>
                    {isAlreadyRegistered ? "Don't have an account? Register" : "Have an account? Log in"}
                </p>
            </div>
        </div>
    );

    return <RegistrationLoginBox />;
};
