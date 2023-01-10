import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

import fondo2 from "../../img/fondo2.jpg";
import { FaUserCircle } from "react-icons/fa";

import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

export const OlvidoPassword = () => {

  const { actions } = useContext(Context);

  const [nwpass, setNwpass] = useState(false);
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
    const url = "/api/new_pass";
    const method = "POST";
    const head = { "Content-Type": "application/json" };
    //console.log(email, password)
    login = actions.solicitudesAPI(url, method, head, data);
    setNwpass(true)
  };
  

  return (
    <div className="login-body" style={{ backgroundImage: `url(${fondo2})` }}>
      <div
        className="container login_espacio border border-white rounded px-0"
        style={{
          height: "400px",
          width: "400px",
          backgroundImage: `url(${fondo2})`,
        }}
      >
        {nwpass ? (
                <div>
                  Contraseña enviada
                </div>
              ) : (
                ""
              )}
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login_icon">
            <FaUserCircle color="white" fontSize="2.5em" />
          </h1>
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

          <div className="container login_button_body px-0">
            <button className="login_button px-0" type="submit">
              Recuperar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
