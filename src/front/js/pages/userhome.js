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

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    const userid = localStorage.getItem("userid");
    if (!token) {
      return (
        <div className="m-3">
          <h1 className="bg-danger">No está autorizado</h1>
        </div>
      );
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
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="tbody">
        <h1>Cargando...</h1>
      </div>
    );
  } 
    if (!listaUsuarios.nombre || listaUsuarios.nombre==='') {
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
    <div className="login-body">
      <h1>Esta es la pagina de usuario</h1>
      <img src={"src/" + listaUsuarios.foto} alt="" />
      <h5>Nombre: {listaUsuarios.nombre}</h5>
      <p>Email: {listaUsuarios.email}</p>
      <h2>Actividades Realizadas: </h2>
      <p>{store.actividades[0].nombre}</p>
      <button>Comentar</button>
      <h2>Ultimos comentarios: </h2>
      <p>{store.comentarios[0].comentario}</p>
      <button>Editar comentario</button>
    </div>
  );
};
