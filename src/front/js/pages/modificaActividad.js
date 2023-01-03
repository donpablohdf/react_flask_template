import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Guia } from "./guia";



import { Context } from "../store/appContext";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/login.css";

export const ModificaActividad = () => {
  const params = useParams();
  const userid = localStorage.getItem("userid");
  const [isLoading, setIsLoading] = useState(true);
  const [dataActividad, setDataActividad] = useState([]);
  const num = Math.floor(Math.random() * 1000);
  const { actions } = useContext(Context);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { tipo: false } }); // declaracion para react-hook-form

  useEffect(() => {
    const promesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/actividad/" + params.theid));
      });
    };
    promesa().then((datos) => {
      setDataActividad(datos);
      setIsLoading(false);

      //console.log(datos)
    });
    
  }, []);

  let login = false;
  const onSubmit = (data, e) => {
    e.preventDefault();
    const url = "/api/modifica_act/" + params.theid;
    const method = "POST";
    const head = { "Content-Type": "application/json" };
    //console.log(data)
    login = actions.solicitudesAPI(url, method, head, data);
    if (login) {
      window.location.href="/guia/" + userid     
    }
  };
  if (isLoading) {
    return (
      <div className="login-body">
        <h1>Cargando...</h1>
      </div>
    );
  }
  const token = localStorage.getItem("jwt-token");
  if (!token) {
    return (
      <div className="login-body">
        <h1 className="bg-danger">No está autorizado</h1>
      </div>
    );
  } else {
    return (
      <>
        <div className="login-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Modifica la actividad!!</h1>
            {dataActividad.ids_usuarios !=="" ? (
              <>
              <h6>La actividad tiene reservas</h6>
                <div>
                  <input
                    id="nombre"
                    type="text"
                    defaultValue={
                      dataActividad.nombre ? dataActividad.nombre : ""
                    }
                    placeholder="Nombre"
                    {...register("nombre")} //crear el name del input y requerido react-hook-form
                  />
                </div>
                <p></p>
                <div>
                    
                  <textarea
                  defaultValue={
                    dataActividad.descripcion ? dataActividad.descripcion : ""
                  }
                    {...register("descripcion")} //crear el name del input y requerido react-hook-form
                  />
                </div>
                <p></p>
              </>
            ) : (
              <>
                <div>
                  <input
                    id="nombre"
                    type="text"
                    defaultValue={
                      dataActividad.nombre ? dataActividad.nombre : ""
                    }
                    placeholder="Nombre"
                    {...register("nombre")} //crear el name del input y requerido react-hook-form
                  />
                </div>
                <p></p>
                <div>
                  <textarea
                    defaultValue={
                      dataActividad.descripcion ? dataActividad.descripcion : ""
                    }
                    {...register("descripcion")} //crear el name del input y requerido react-hook-form
                  />
                </div>
                <p></p>
                <div>
                  <input
                    id="ciudad"
                    type="text"
                    defaultValue={
                      dataActividad.ciudad ? dataActividad.ciudad : ""
                    }
                    placeholder="Ciudad"
                    {...register("ciudad")} //crear el name del input y requerido react-hook-form
                  />
                </div>
                <p></p>
                <div>
                  <input
                  defaultValue={
                    dataActividad.fecha ? dataActividad.fecha : ""
                  }
                    type="datetime"
                    {...register("fecha")} //crear el name del input y requerido react-hook-form
                  />
                </div>
                <p></p>
              </>
            )}

           

            <button type="submit">Modificar</button>
          </form>
        </div>
      </>
    );
  }
};
ModificaActividad.propTypes = {
    match: PropTypes.object,
  };
  