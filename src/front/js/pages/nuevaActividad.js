import React, { useState, useEffect, useContext } from "react";
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

import "../../styles/nuevaActividad.css";
import fondo5 from "../../img/fondo5.jpg"

export const NuevaActividad = () => {
  const token = localStorage.getItem("jwt-token");
  const userid = localStorage.getItem("userid");
  const { actions } = useContext(Context);
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

  useEffect(() => {
    if (token) {
      actions.logIn();
    }
  }, []);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form

  const onSubmit = (data, e) => {
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let cuando = fecha + " " + hora;
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("nombre", data.nombre);
    formdata.append("descripcion", data.descripcion);
    formdata.append("precio", data.precio);
    formdata.append("fecha", cuando);
    formdata.append("ciudad", data.ciudad);
    if (fileInput.files[0]) {
      formdata.append("archivo", fileInput.files[0], data.archivo);
    }

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {'Authorization': 'Bearer '+token },
      redirect: "follow",
    };

    fetch(process.env.BACKEND_URL + "/api/new_act/" + userid, requestOptions)
      .then((response) => response.text())
      .then((result) => (window.location.href = "/guia/" + userid))
      .catch((error) => console.log("error", error));
  };

  if (!token) {
    return (
      <div className="nueva_actividad_body" style={{ backgroundImage: `url(${fondo5})`,backgroundSize:`cover`}}>
        <div className="pb-4">
            <h1 className="nueva_actividad_header">No está autorizado</h1>
          </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="nueva_actividad_body" style={{ backgroundImage: `url(${fondo5})`,backgroundSize:`cover`}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-2">
              <h1 className="nueva_actividad_header">Nueva Actividad</h1>
            </div>
            <div className="mb-1">
              <i className="fas fa-map nueva_actividad_icono_nombre"></i>
              <input className="nueva_actividad_input"
                id="nombre"
                type="text"
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
            <p></p>
            <div className="mb-1 nuevaActividad_descripcion">
              <i className="fas fa-edit nueva_actividad_icono_descripcion"></i>
              <textarea className="ps-5" rows="6" cols="40"
                {...register("descripcion", { required: true })} //crear el name del input y requerido react-hook-form
                  />
                  <br></br>
                  {errors.descripcion && (
                    <span className="signup_password_coincide">
                      LA DESCRIPCION NO PUEDE ESTAR VACIA
                    </span>
                  )}
            </div>
            <div className="mb-2">
              <i className="fas fa-euro-sign nueva_actividad_icono_nombre"></i>
              <input className="nueva_actividad_input"
                type="text"
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
            <div className="mb-0">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                  <span className="nueva_actividad_fecha">Fecha: </span>{" "}
                  <DatePicker
                    color="primary"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="yyyy/MM/dd"
                    id="fecha"
                  />
                  <br></br>
                  <span className="nueva_actividad_fecha">  Hora: </span>
                  <TimePicker
                    value={selectedDate}
                    onChange={handleDateChange}  
                    format="H:MM"
                    id="hora"
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>
            <div className="mb-3">
              <i className="fas fa-building nueva_actividad_icono_nombre"></i>
              <input className="nueva_actividad_input"
                type="text"
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
              <input className="nueva_actividad_foto"
                id="fileInput"
                type="file"
                {...register("archivo")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <div className="nueva_actividad_boton_crear_contenedor">
              <button className="nueva_actividad_boton_crear" type="submit">
                <div className="nueva_actividad_boton_iconos">
                  <i className="fas fa-square nueva_actividad_icono_default"></i>
                  <i className="fas fa-check-square nueva_actividad_icono_hover"></i>
                  Crear
                </div>
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};
