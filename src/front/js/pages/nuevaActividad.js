import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/login.css";

export const NuevaActividad = () => {
  const userid = localStorage.getItem("userid");
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { tipo: false } }); // declaracion para react-hook-form

  let login = false;
  const onSubmit = (data, e) => {
    //e.preventDefault();
    var formdata = new FormData();
    formdata.append("nombre", data.nombre);
    formdata.append("descripcion", data.descripcion);
    formdata.append("precio", data.precio);
    formdata.append("fecha", data.fecha);
    formdata.append("ciudad", data.ciudad);
    formdata.append("archivo", fileInput.files[0], data.archivo);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(process.env.BACKEND_URL + "/api/new_act/" + userid, requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.href="/guia/" + userid )
      .catch((error) => console.log("error", error));
  };

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
          <form onSubmit={handleSubmit(onSubmit)} >
            <h1>Nueva Actividad</h1>
            <div>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                {...register("nombre")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <textarea
                {...register("descripcion")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <input
                type="text"
                placeholder="Precio"
                {...register("precio")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <input
                type="datetime"
                {...register("fecha")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <input
                type="text"
                placeholder="Ciudad"
                {...register("ciudad")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <div>
              <input
                id="fileInput"
                type="file"
                {...register("archivo")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <button type="submit">Crear</button>
          </form>
        </div>
      </>
    );
  }
};
