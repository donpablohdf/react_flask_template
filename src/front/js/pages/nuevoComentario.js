import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/signup.css";
import fondo2 from "../../img/fondo2.jpg";

export const NuevoComentario = () => {
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form
  const { actions } = useContext(Context);

  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data)
    const url = "/api/comen_new/" + params.theid + "/" + userid;
    const method = "POST";
    const head = { "Content-Type": "application/json" };

    const login = actions.solicitudesAPI(url, method, head, data);
    if (login) {
      window.location.href = "/reservas/" + userid;
    }
  };

  return (
    <div className="signup-body" style={{ backgroundImage: `url(${fondo2})` }}>
      <div
        className="container signup_espacio border border-white rounded px-0"
        style={{
          height: "400px",
          width: "400px",
          backgroundImage: `url(${fondo2})`,
        }}
      >
        <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="sign_up_encabezado">NUEVO COMENTARIO</h2>

          <div id="input_username" className="sign_up_email">
            <i className="fas fa-envelope signup_icono_email"></i>
            <input
              className="signup_input"
              type="textarea"
              {...register("texto", { required: true })} //crear el name del input y requerido react-hook-form
            />
          </div>
          <div id="input_btn" className="container login_button_body px-0">
            <button className="login_button px-0" type="submit">
              {" "}
              COMENTAR
            </button>
          </div>

          {/* control de errores react-hook-form */}
          {errors.texto && (
            <span className="signup_password_coincide">
              EL TEXTO NO PUEDE ESTAR VACIO
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
