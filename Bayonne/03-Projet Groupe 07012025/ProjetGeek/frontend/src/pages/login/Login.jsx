import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import FormInput from "../../components/Form/FormInput";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });
      alert("Bien connecté");
      localStorage.setItem("token", response.data.token);
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Essayez encore");
    }
  };

  return (
    <>
      <div class="background-login">
        <h1 class="title">Login</h1>
        <form onSubmit={loginSubmit}>
          <FormInput
            label={"Email"}
            type={"email"}
            placeholder={"Entrez mail"}
            value={email}
            function={setEmail}
          />
          <FormInput
            label={"Password"}
            type={"password"}
            placeholder={"Entrez password"}
            value={password}
            function={setPassword}
          />
          <div className="field">
            <div className="control">
              <button className="button-login" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
