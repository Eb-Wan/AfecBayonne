import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { Link } from "react-router-dom";
import FormInput from "../../components/Form/FormInput";

const API_URL = process.env.REACT_APP_API_URL;

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmit = async (e) => {
    e.preventDefault();
    console.log();

    try {
      console.log(API_URL);

      const response = await axios.post(`${API_URL}/api/users/create`, {
        name,
        email,
        password,
      });
      alert("Bien inscrit!");
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Mauvaise infos");
    }
  };

  return (
    <>
      <div className="background-register">
        <h1 className="title">Inscription</h1>
        <form onSubmit={registerSubmit}>
          <FormInput
            label={"Nom"}
            type={"text"}
            placeholder={"Entrez votre nom"}
            value={name}
            function={setName}
          />
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
              <button className="button-register" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
        <div>
          <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
