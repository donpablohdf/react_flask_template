import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

import fondo2 from "../../img/fondo2.jpg";
import { FaUserCircle } from "react-icons/fa";

import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

export const Login = () => {
  const { actions, store } = useContext(Context);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form

  let login = false;
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const url = "/api/login";
    const method = "POST";
    const head = { "Content-Type": "application/json" };
    //console.log(email, password)
    actions
      .solicitudesAPI(url, method, head, data)
      .then((el) => console.log("El resultado es;", el));
    
  };

  return (
    <div className="login-body" style={{ backgroundImage: `url(${fondo2})` }}>
      <div
        className="container login_espacio border border-white rounded px-0"
        style={{
          height: "400px",
          maxWidth: "400px",
          backgroundImage: `url(${fondo2})`,
        }}
      >
        
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login_icon">
            <FaUserCircle color="white" fontSize="2.5em" />
          </h1>
          <div className="login_email">{store.message}</div>
          <div className="login_email">
            <i className="fa fa-user login_icono_email"></i>
            <input
              className="login_input"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })} //crear el name del input y requerido react-hook-form
            />
          </div>
          <p></p>
          <div>
            <i className="fa fa-solid fa-lock login_icono_password"></i>
            <input
              className="login_input"
              autoComplete="off" //no permitir autocompletado del input
              type="text"
              placeholder="Password"
              {...register("password", { required: true })} //crear el name del input y requerido react-hook-form
            />
          </div>
          <p></p>
          <div className="container login_button_body px-0">
            <button className="login_button px-0" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
      <p></p>
      <div className="login_registro">
        <p>
          Si no estás registrado pincha
          <Link to="/signup/">
            <span className="login_registro_link"> aquí</span>
          </Link>
        </p>
        <p>
          Si no recuerdas tu contraseña pincha
          <Link to="/fpass/">
            <span className="login_registro_link"> aquí</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
