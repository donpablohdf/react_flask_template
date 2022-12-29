import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/login.css";

export const UserHome = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const userid = localStorage.userid
  const promesa = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/usuario/" + userid));
    });
  };
  useEffect(() => {
    
    const token = localStorage.getItem("jwt-token");
    if (!token) {
      return (
        <div className="m-3">
          <h1 className="bg-danger">No está autorizado</h1>
        </div>
      );
    }

    
    promesa().then((datos) => {
      setListaUsuarios(datos);
      setIsLoading(false);
    });
  }, [userid]);

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
        <img src={"/src/" + listaUsuarios.foto} alt="" />
        <h5>Nombre: {listaUsuarios.nombre}</h5>
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

        <h2>Actividades Realizadas: </h2>
        <p>{store.actividades[0].nombre}</p>
      </div>
    </>
  );
};
