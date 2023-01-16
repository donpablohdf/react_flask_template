import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Guia } from "./guia";
import DateFnsUtils from "@date-io/date-fns"; //https://material-ui-pickers.dev/
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { Context } from "../store/appContext";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/login.css";

export const ModificaActividad = () => {
  const params = useParams();
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");
  const [isLoading, setIsLoading] = useState(true);
  const [dataActividad, setDataActividad] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date()); //https://material-ui-pickers.dev/
  const materialTheme = createTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "#FD841F",
        },
      },
    },
  });
  const { actions } = useContext(Context);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { tipo: false } }); // declaracion para react-hook-form

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
        resolve(actions.dataFromAPI("/api/actividad/" + params.theid));
      });
    };
    promesa().then((datos) => {
      setDataActividad(datos);
      setIsLoading(false);

      //console.log(datos)
      handleDateChange(datos.fecha);
    });
  }, []);

  let login = false;
  const onSubmit = (data, e) => {
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let cuando = fecha + " " + hora;
    data.fecha = cuando;
    e.preventDefault();
    const url = "/api/modifica_act/" + params.theid;
    const method = "POST";
    const head = { "Content-Type": "application/json" };
    //console.log(data)
    login = actions.solicitudesAPI(url, method, head, data);
    if (login) {
      window.location.href = "/guia/" + userid;
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
            {dataActividad.ids_usuarios !== "" ? (
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
                    {...register("nombre", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  {errors.nombre && (
                    <span className="signup_password_coincide">
                      EL NOMBRE NO PUEDE ESTAR VACIO
                    </span>
                  )}
                </div>
                <p></p>
                <div>
                  <textarea
                    defaultValue={
                      dataActividad.descripcion ? dataActividad.descripcion : ""
                    }
                    {...register("descripcion", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  {errors.descripcion && (
                    <span className="signup_password_coincide">
                      LA DESCRIPCION NO PUEDE ESTAR VACIA
                    </span>
                  )}
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
                    {...register("nombre", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  {errors.nombre && (
                    <span className="signup_password_coincide">
                      EL NOMBRE NO PUEDE ESTAR VACIO
                    </span>
                  )}
                </div>
                <p></p>
                <div>
                  <textarea
                    defaultValue={
                      dataActividad.descripcion ? dataActividad.descripcion : ""
                    }
                    {...register("descripcion", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  {errors.descripcion && (
                    <span className="signup_password_coincide">
                      LA DESCRIPCION NO PUEDE ESTAR VACIA
                    </span>
                  )}
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
                    {...register("ciudad", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  {errors.ciudad && (
                    <span className="signup_password_coincide">
                      LA CIUDAD NO PUEDE ESTAR VACIA
                    </span>
                  )}
                </div>
                <p></p>
                <div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={materialTheme}>
                      <span>Fecha</span>{" "}
                      <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="yyyy/MM/dd"
                        id="fecha"
                      />
                      <span>Hora: </span>
                      <TimePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="H:MM"
                        id="hora"
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
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
