import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import opinion1 from "../../img/opinion1.jpg";

import "../../styles/userhome.css";
import fondo3 from "../../img/fondo3.jpg";

export const UserHome = () => {
  const { actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [actAvatar, setActAvatar] = useState(false);
  const [pesoImgU, setPesoImgU] = useState();


  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form
  const subeFotoUsr = (data) => {
    let peso = customFile1.files[0].size;
    if (peso> 1065443){ setPesoImgU("La imagen no puede superar 1Mb"); return false}
    var formdata = new FormData();
    formdata.append("archivo", customFile1.files[0], data.archivo);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(process.env.BACKEND_URL + "/api/foto_user/" + userid, requestOptions)
      .then((response) => response.text())
      .then((result) => setActAvatar(!actAvatar))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (!token) {
      return (
        <div className="login-body">
          <h1 className="bg-danger">No está autorizado</h1>
        </div>
      );
    } else {
      actions.logIn();
    }
    const promesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/usuario/" + userid));
      });
    };
    promesa().then((datos) => {
      setListaUsuarios(datos);
      setIsLoading(false);
    });
  }, [actAvatar]);

  if (isLoading) {
    return (
      <div className="login-body">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (!listaUsuarios.nombre || listaUsuarios.nombre === "") {
    return (
      <div
        className="userhome_body"
        style={{ backgroundImage: `url(${fondo3})` }}
      >
        <h1>Para continuar debe rellenar su perfil</h1>
        <Link to="/modifica_usuario">
          <button>Rellenar mi perfil</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        className="userhome_body"
        style={{ backgroundImage: `url(${fondo3})`, backgroundSize: `cover` }}
      >
        <div>
          <h1 className="userhome_h1">¡Bienvenid@ de nuevo!</h1>
        </div>
        <div className="container row justify-content-center">
          <div className="col-3"></div>
          <div className="col-4 ps-5">
            {listaUsuarios.foto ? (
              <img
                src={process.env.BACKEND_URL + "/" + listaUsuarios.foto}
                className="card-img-top userhome_imagen"
                alt="..."
              />
            ) : (
              <img
                src={opinion1}
                className="card-img-top userhome_imagen"
                alt="..."
              />
            )}
            <form>
              <div className="file-select" id="src-file1">
                <input
                  onChange={() => {
                    subeFotoUsr(handleSubmit);
                  }}
                  type="file"
                  id="customFile1"
                  name="archivo"
                  accept=".jpg, .png"
                />
              </div>
              <div><span className="signup_email_valido">{pesoImgU}</span></div>
            </form>
          </div>
          <div className="col-4 ps-3 text-start">
            <h3>Nombre:</h3>
            <p>
              {listaUsuarios.nombre} {listaUsuarios.apellidos}
            </p>
            <h3>Email:</h3>
            <p>{listaUsuarios.email}</p>
            <h3>Ciudad:</h3>
            <p>{listaUsuarios.ciudad}</p>
            <h3>Descripcion:</h3>
            <p>{listaUsuarios.descripcion}</p>
          </div>
        </div>
        <div className="userhome_modifica_datos">
          <div className="container row justify-content-center mb-3">
            <div className="col"></div>
            {listaUsuarios.tipo == 1 ? (
              <>
                <div className="col">
                  <Link to={"/guia/" + userid}>
                    <button className="userhome_home">
                      <div className="userhome_iconos">
                        <i className="fas fa-suitcase-rolling userhome_icono_default"></i>
                        <i className="fas fa-plane-departure userhome_icono_hover"></i>
                      </div>
                      Ir a Actividades
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="col">
              <Link to="/modifica_usuario">
                <button className="userhome_modifica">
                  <div className="userhome_iconos">
                    <i className="fas fa-home userhome_icono_default"></i>
                    <i className="fas fa-pencil-alt userhome_icono_hover"></i>
                  </div>
                  Modificar perfil
                </button>
              </Link>
            </div>
          </div>
          <div className="container row justify-content-center">
            <div className="col"></div>
            <div className="col">
              <Link to={"/reservas/" + userid}>
                <button className="userhome_reservas">
                  <div className="userhome_iconos">
                    <i className="fas fa-archway userhome_icono_default"></i>
                    <i className="fas fa-wine-glass  userhome_icono_hover"></i>
                  </div>
                  Ver mis reservas
                </button>
              </Link>
            </div>
            <div className="col">
              <Link to="/baja_usuario">
                <button className="userhome_baja">
                  <div className="userhome_iconos">
                    <i className="fas fa-frown userhome_icono_default"></i>
                    <i className="fas fa-sad-cry  userhome_icono_hover"></i>
                  </div>
                  Darme de baja
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
