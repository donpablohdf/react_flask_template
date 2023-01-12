import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import opinion1 from "../../img/opinion1.jpg";


import "../../styles/login.css";

export const UserHome = () => {
  const { actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [actAvatar, setActAvatar] = useState(false);

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
    }else{
      actions.logIn()
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
      <div className="login-body">
        <h1>Para continuar debe rellenar su perfil</h1>
        <Link to="/modifica_usuario">
          <button>Rellenar mi perfil</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="login-body">
        <h1>Esta es la pagina de usuario</h1>
        <div>
        {listaUsuarios.foto ? (
                <img
                  src={
                    process.env.BACKEND_URL + "/" + listaUsuarios.foto
                  }
                  className="card-img-top actividad_guia_imagen"
                  alt="..."
                />
              ) : (
                <img
                  src={opinion1}
                  className="card-img-top actividad_guia_imagen"
                  alt="..."
                />
              )}
              <form>
                    <div className="btn btn-primary btn-rounded">
                      <input
                        onChange={() => {
                          subeFotoUsr(handleSubmit);
                        }}
                        type="file"
                        id="customFile1"
                        name="archivo"
                        className="form-control "
                      />
                    </div>
                  </form>
        </div>
        <h5>Nombre: {listaUsuarios.nombre}</h5>
        <p>Apellidos: {listaUsuarios.apellidos}</p>
        <p>Email: {listaUsuarios.email}</p>
        <p>Ciudad: {listaUsuarios.ciudad}</p>
        {listaUsuarios.tipo == 1 ? (
          <>
            <p>Descripcion: {listaUsuarios.descripcion}</p>
            <div>
              <Link to={"/guia/" + userid}>
                <button>Ir a mi pagina de guía</button>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
        <div>
          <Link to="/modifica_usuario">
            <button>Modificar mis datos de perfil</button>
          </Link>
        </div>
        <div>
          <Link to="/baja_usuario">
            <button>Darme de baja</button>
          </Link>
        </div>
        <div>
        <Link to={"/reservas/"+userid}>
          <button>Ver mis reservas</button>
        </Link>
      </div>
        
      </div>
    </>
  );
};
