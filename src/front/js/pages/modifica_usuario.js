import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/modificaUsuario.css";
import fondo4 from "../../img/fondo4.jpg";

export const ModificaUsuario = () => {
  const token = localStorage.getItem("jwt-token");
  const userid = localStorage.getItem("userid");
  const [isLoading, setIsLoading] = useState(true);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [esGuia, setEsGuia] = useState(false);
  const [isEmail, setIsEmail] = useState();
  const [isEmail2, setIsEmail2] = useState();

  const { actions, store } = useContext(Context);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { tipo: false } }); // declaracion para react-hook-form

  useEffect(() => {
    if (token) {
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

      //console.log(datos)
    });
  }, []);

  let login = false;
  const onSubmit = async (data, e) => {
    if (data.email !== listaUsuarios.email) {
      const valido = await actions.verifyEmail(data.email);

      var obj = store.verifica;
      var key = "errors";
      var hasKey = key in obj;
      if (hasKey) {
        setIsEmail("Email no válido");
        store.verifica = null;
      } else {
        e.preventDefault();
        const url = "/api/modifica_user/" + userid;
        const method = "POST";        
        const head = { "Content-Type": "application/json", 'Authorization': 'Bearer '+token };

        //console.log(data)
        login = await actions.solicitudesAPI(url, method, head, data);
        if (store.message) {
          setIsEmail("Email no válido");
          store.message = null;
        } else {
          
            window.location.href = "/userhome";
          
        }
      }
    } else {
      e.preventDefault();
      const url = "/api/modifica_user/" + userid;
      const method = "POST";
      const head = { "Content-Type": "application/json", 'Authorization': 'Bearer '+ token };
      login = actions.solicitudesAPI(url, method, head, data);
      if (login) {
        window.location.href = "/userhome";
      }
    }
  };
  if (isLoading) {
    return (
      <div className="login-body">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (!token) {
    return (
      <div
        className="modifica_usuario_body"
        style={{ backgroundImage: `url(${fondo4})`, backgroundSize: `cover` }}
      >
        <h1 className="bg-danger">No está autorizado</h1>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="modifica_usuario_body"
          style={{ backgroundImage: `url(${fondo4})`, backgroundSize: `cover` }}
        >
          <div className="pb-4">
            <h1 className="modifica_usuario_header">Modifica tus datos</h1>
          </div>
          <div
            className="container modifica_usuario_espacio border border-white rounded py-5"
            style={{
              height: "auto",
              maxWidth: "600px",
              backgroundImage: `url(${fondo4})`,
              backgroundSize: `cover`,
            }}
          >
            <form
              className="modifica_usuario_form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="modifica_usuaurio_email mb-2">
                {isEmail}
                <i className="fas fa-envelope modifica_usuario_icono_email"></i>
                <input
                  className="modifica_usuario_input"
                  id="email"
                  type="text"
                  defaultValue={listaUsuarios.email ? listaUsuarios.email : ""}
                  placeholder="Email"
                  {...register("email")} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div className="mb-2">
                <i className="fas fa-unlock-alt  modifica_usuario_icono_password"></i>
                <input
                  className="modifica_usuario_input"
                  type="text"
                  placeholder="Password"
                  {...register("password")} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div className="mb-2">
                <i className="fas fa-user  modifica_usuario_icono_nombre"></i>
                <input
                  className="modifica_usuario_input"
                  type="text"
                  placeholder="Nombre"
                  defaultValue={
                    listaUsuarios.nombre ? listaUsuarios.nombre : ""
                  }
                  {...register("nombre")} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div className="mb-2">
                <i className="fas fa-id-card  modifica_usuario_icono_apellidos"></i>
                <input
                  className="modifica_usuario_input"
                  type="text"
                  placeholder="Apellidos"
                  defaultValue={
                    listaUsuarios.apellidos ? listaUsuarios.apellidos : ""
                  }
                  {...register("apellidos")} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div className="mb-2">
                <i className="fas fa-building modifica_usuario_icono_ciudad"></i>
                <input
                  className="modifica_usuario_input"
                  type="text"
                  placeholder="Ciudad"
                  defaultValue={
                    listaUsuarios.ciudad ? listaUsuarios.ciudad : ""
                  }
                  {...register("ciudad")} //crear el name del input y requerido react-hook-form
                />
              </div>
              {listaUsuarios.tipo == 0 ? (
                <div>
                  <label className="modifica_usuario_texto_check">Quiero ser guía</label>
                  <input className="modifica_usuario_check"
                    type="checkbox"
                    {...register("tipo")}
                    id="tipo"
                    value="1"
                    onChange={() => setEsGuia(!esGuia)}
                  />
                </div>
              ) : (
                <input
                  className="modifica_usuario_input"
                  {...register("tipo")}
                  type="hidden"
                  value={listaUsuarios.tipo ? listaUsuarios.tipo : "1"}
                />
              )}
              {listaUsuarios.tipo == 1 || esGuia ? (
                <div className="mb-2">
                  <i className="fas fa-user-edit modifica_usuario_icono_descripcion"></i>
                  <textarea
                    className="ps-5"
                    rows="6"
                    cols="40"
                    defaultValue={
                      listaUsuarios.descripcion ? listaUsuarios.descripcion : ""
                    }
                    {...register("descripcion")} //crear el name del input y requerido react-hook-form
                  />
                </div>
              ) : (
                <input
                  className="modifica_usuario_input"
                  {...register("descripcion")}
                  type="hidden"
                  value={
                    listaUsuarios.descripcion ? listaUsuarios.descripcion : ""
                  }
                />
              )}
              <button className="modifica_usuario_boton" type="submit">
                <div className="modifica_usuario_boton_iconos">
                  <i className="fas fa-thumbs-up modifica_usuario_icono_default"></i>
                  <i className="fas fa-upload modifica_usuario_icono_hover"></i>
                </div>
                Modificar
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
};
