import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

import { useNavigate, redirect } from "react-router-dom";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

export const Login = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form

  let login = false;
  const onSubmit = (data, e) => {
    e.preventDefault();
    const url = "/api/login";
    const method = "POST";
    const head = { "Content-Type": "application/json" };
    //console.log(email, password)
    login = actions.solicitudesAPI(url, method, head, data);
    if (login) {
      navigate("/islogin");
    }
  };

  return (
    <div className="login-body">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Hola Viajero!!</h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })} //crear el name del input y requerido react-hook-form
          />
        </div>
        <p></p>
        <div>
          <input
            autoComplete="off" //no permitir autocompletado del input
            type="text"
            placeholder="Password"
            {...register("password", { required: true })} //crear el name del input y requerido react-hook-form
          />
        </div>
        <p></p>
        <button type="submit">Login</button>
      </form>
      <p></p>
      <p>
        Si no estás registrado pincha
        <Link to="/signup/">
          <span className="link_signup"> aquí</span>
        </Link>
      </p>
    </div>
  );
};
