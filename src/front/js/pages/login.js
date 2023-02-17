import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

import fondo2 from "../../img/fondo2.jpg";
import { FaUserCircle } from "react-icons/fa";

import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form
import HCaptcha from '@hcaptcha/react-hcaptcha';


export const Login = () => {
  const { actions, store } = useContext(Context);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [isEmail, setIsEmail] = useState();

  const onVerify = (token) => {
    if (token) {
      setIsCaptcha(true);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form


  const onSubmit = async (data) => {
    if (!isCaptcha) {
      setIsEmail("Debe verificar si es humano");
      return false;
    }
    
    try {
      const url = "/api/login";
      const method = "POST";
      const head = { "Content-Type": "application/json" };
      await actions.solicitudesAPI(url, method, head, data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  return (
    <div className="login-body" style={{ backgroundImage: `url(${fondo2})` }}>
      <div
        className="container login_espacio border border-white rounded px-0"
        style={{
          height: "auto",
          width: "400px",
          backgroundImage: `url(${fondo2})`,
        }}
      >
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login_icon">
            <FaUserCircle color="white" fontSize="2.5em" />
          </h1>
          <div>
            <HCaptcha
              sitekey={process.env.HCAPTCHA}
              onVerify={onVerify}

            />
          </div>
          <div className="login_email mb-4">
            <i className="fa fa-user login_icono_email"></i>
            <input
              className="login_input"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })} //crear el name del input y requerido react-hook-form
            />
            {/* control de errores react-hook-form */}
            <br></br>
            <span className="signup_email_valido">{isEmail}</span>
            {errors.email && (
              <span className="mb-4 signup_password_coincide">
                EL EMAIL NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <div>
            <i className="fa fa-solid fa-lock login_icono_password"></i>
            <input
              className="login_input"
              autoComplete="off" //no permitir autocompletado del input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })} //crear el name del input y requerido react-hook-form
            />
            {/* control de errores react-hook-form */}
            <br></br>
            {errors.password && (
              <span className="my-0 signup_password_coincide">
                EL PASSWORD NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <button className="login_button" type="submit">
            Login
          </button>

        </form>
      </div>
      <div className="login_email">{store.message}</div>
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
