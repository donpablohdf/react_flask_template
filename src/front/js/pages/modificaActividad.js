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

import "../../styles/modificaActividad.css";
import fondo5 from "../../img/fondo5.jpg"

export const ModificaActividad = () => {
  const params = useParams();
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");
  const [isLoading, setIsLoading] = useState(true);
  const [dataActividad, setDataActividad] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date()); //https://material-ui-pickers.dev/
  const materialTheme = createTheme({
    typography:{
      fontSize:18,
      spacing:5,
      fontWeightBold:600,
    },
    palette:{
      primary:{
        main:'#9C2C77'
      }
    },
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "#FD841F",
        },
      },
      MuiPickersDay:{
        day:{
          color:"#FD841F",
        },
        daySelected:{
          backgroundColor:"#FD841F",
        },
        current:{
          color:"#FD841F",
        }
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
  } = useForm(); // declaracion para react-hook-form

  useEffect(() => {
    if (token) {
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
    if (document.getElementById("fecha")) {
      let fecha = document.getElementById("fecha").value;
      let hora = document.getElementById("hora").value;
      let cuando = fecha + " " + hora;
      data.fecha = cuando;
    }else{
      data.ciudad = dataActividad.ciudad
      data.precio = dataActividad.precio
      data.fecha = dataActividad.fecha

    }
    e.preventDefault();

    const url = "/api/modifica_act/" + params.theid;
    const method = "POST";
    const head = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    //console.log(data)
    login = actions.solicitudesAPI(url, method, head, data);
    if (login) {
      window.location.href = "/guia/" + userid;
    }
  };
  if (isLoading) {
    return (
      <div className="modificaActividad_body" style={{ backgroundImage: `url(${fondo5})`,backgroundSize:`cover`}}>
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="modificaActividad_body" style={{ backgroundImage: `url(${fondo5})`,backgroundSize:`cover`}}>
        <h1 className="bg-danger">No está autorizado</h1>
      </div>
    );
  } else {
    return (
      <>
        <div className="modificaActividad_body" style={{ backgroundImage: `url(${fondo5})`,backgroundSize:`cover`}}>
          <form className="modificaActividad_formulario" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="modificaActividad_header">¡Modifica tu actividad!</h1>
            {dataActividad.ids_usuarios !== "" ? (
              <>
              <br></br>
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
              </>
            ) : (
              <>
                <div  className="modificaActividad_nombre mb-3">
                <i className="fas fa-map modificaActividad_icono_nombre"></i>
                  <input  className="modificaActividad_input"
                    id="nombre"
                    type="text"
                    defaultValue={
                      dataActividad.nombre ? dataActividad.nombre : ""
                    }
                    placeholder="Nombre"
                    {...register("nombre", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  <br></br>
                  {errors.nombre && (
                    <span className="signup_password_coincide">
                      EL NOMBRE NO PUEDE ESTAR VACIO
                    </span>
                  )}
                </div>
                <div className="nuevoComentario_comentario">
                <i className="fas fa-comment modificaActividad_icono_descripcion"></i>
                  <textarea className="ps-5" rows="10" cols="40"
                    defaultValue={
                      dataActividad.descripcion ? dataActividad.descripcion : ""
                    }
                    {...register("descripcion", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  <br></br>
                  {errors.descripcion && (
                    <span className="signup_password_coincide">
                      LA DESCRIPCION NO PUEDE ESTAR VACIA
                    </span>
                  )}
                </div>
                <div className="modificaActividad_nombre mb-3">
                <i className="fas fa-building modificaActividad_icono_nombre"></i>
                  <input className="modificaActividad_input"
                    id="ciudad"
                    type="text"
                    defaultValue={
                      dataActividad.ciudad ? dataActividad.ciudad : ""
                    }
                    placeholder="Ciudad"
                    {...register("ciudad", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  <br></br>
                  {errors.ciudad && (
                    <span className="signup_password_coincide">
                      LA CIUDAD NO PUEDE ESTAR VACIA
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <i className="fas fa-euro-sign nueva_actividad_icono_nombre"></i>
                  <input
                    className="nueva_actividad_input"
                    type="text"
                    defaultValue={
                      dataActividad.precio ? dataActividad.precio : ""
                    }
                    placeholder="Precio"
                    {...register("precio", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  <br></br>
                  {errors.precio && (
                    <span className="signup_password_coincide">
                      EL PRECIO NO PUEDE ESTAR VACIO
                    </span>
                  )}
                </div>
                <div className="mb-3">
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
              </>
            )}
            <div className="modificaActividad_boton_modificar_contenedor mb-5">
              <button className="modificaActividad_boton_modificar" type="submit">
                <div className="modificaActividad_boton_iconos">
                  <i className="fas fa-square modificaActividad_icono_default"></i>
                  <i className="fas fa-check-square modificaActividad_icono_hover"></i>
                </div>
                  Modificar
              </button>
            </div>
            
          </form>
        </div>
      </>
    );
  }
};
ModificaActividad.propTypes = {
  match: PropTypes.object,
};
