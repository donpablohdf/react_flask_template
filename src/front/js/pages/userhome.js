import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/login.css";

export const UserHome = () => {
  const cargarImagen = require.context("/src/imgs/users/", true);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const userid = localStorage.getItem("userid");
  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

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

  const imagen = listaUsuarios.foto;
  return (
    <div className="login-body">
      <h1>Esta es la pagina de usuario</h1>
      <img src={"/src/" + imagen} alt="" />
      <h5>Nombre: {listaUsuarios.nombre}</h5>
      <p>Email: {listaUsuarios.email}</p>
      <div>
        <Link to="/modifica_usuario">
          <button>Modificar mis datos de perfil</button>
        </Link>
      </div>
      {listaUsuarios.tipo == 1 ? (
        <div>
          <Link to={"/guia/" + userid}>
            <button>Ir a mi pagina de guía</button>
          </Link>
        </div>
      ) : (
        ""
      )}

      <h2>Actividades Realizadas: </h2>
      <p>{store.actividades[0].nombre}</p>
      <button>Comentar</button>
      <h2>Ultimos comentarios: </h2>
      <p>{store.comentarios[0].comentario}</p>
      <button>Editar comentario</button>
    </div>
  );
};
