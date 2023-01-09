import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/actividades.css";
import retiro from "../../img/retiro.jpg";
import fondo from "../../img/fondo.jpg";
import opinion1 from "../../img/opinion1.jpg";

import DateFnsUtils from "@date-io/date-fns"; //https://material-ui-pickers.dev/
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";

export const Actividades = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const userid = localStorage.getItem("userid");

  const [nwreserva, setNwreserva] = useState(false);

  const [guia, setGuia] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //cargando guias
  const [isLoading2, setIsLoading2] = useState(true); //cargando actividades

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
  const reserva = (usr, guia, acti) => {
    const url = "/api/reserva_new/";
    const method = "POST";

    const head = { "Content-Type": "application/json" };
    const data = {
      id_usuario: usr,
      id_guia: guia,
      id_actividad: acti,
    };
    //console.log(data)
    const nwres = actions.solicitudesAPI(url, method, head, data);
    setNwreserva(true);
  };
  useEffect(() => {
    const promesaActividades = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/actividad/" + params.theid));
      });
    };
    promesaActividades().then((datos) => {
      setActividades(datos);
      setIsLoading2(false);
      const promesaGuias = () => {
        return new Promise((resolve, reject) => {
          resolve(actions.dataFromAPI("/api/usuario/" + datos.id_guia));
        });
      };
      promesaGuias().then((datos) => {
        setGuia(datos);
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading && isLoading2) {
    return (
      <div className="tbody">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div
      className="actividades_cuerpo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <img src={retiro} className="imagen_actividad_header"></img>
      <div className="container">
        <div className="row justify-content-evenly">
          <div className="col-8">
            <h1 className="display-5 mt-3 actividades_nombre">
              {actividades.nombre}
            </h1>
            <h3 className="actividad_ciudad">{actividades.ciudad}</h3>
            <h4 className="actividad_descripcion">{actividades.descripcion}</h4>
            <h2 className="actividad_precio">{actividades.precio}</h2>
          </div>
          <div className="col-4">
            <div className="espacio_reservas">
              {actividades.id_guia !== userid &&
              userid &&
              !actividades["ids_usuarios"].includes(userid) && !nwreserva ? (
                <div>
                  <button
                    onClick={() => {
                      reserva(userid, guia.id, params.theid);
                    }}
                  >
                    Reservar actividad
                  </button>
                </div>
              ) : (
                ""
              )}
              {actividades.id_guia !== userid  && nwreserva ? (
                <div>
                  Actividad reservada con éxito
                </div>
              ) : (
                ""
              )}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <TimePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <DateTimePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="actividad_guia">SU GUÍA</h3>
        <div className="container d-flex justify-content-center">
          <Link to={"/guia/" + guia.id}>
            <div className="card actividad_tarjeta">
              <img
                src={opinion1}
                className="card-img-top actividad_guia_imagen"
                alt="..."
              />
              <div className="card-img-overlay actividad_tarjeta_guia_cuerpo">
                <h5 className="card-title actividad_tarjeta_nombre">
                  {guia.nombre}
                </h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="actividad_comentarios_body">
        <h3 className="actividad_comentarios">COMENTARIOS</h3>
        <div className="container">
          <div className="card tarjeta_comentarios">
            <img src={opinion1} className="card-img-top img-fluid" alt="..." />
            <div className="card-body">
              <h5 className="card-title tarjeta_comentarios_titulo">
                "Genial"
              </h5>
              <p className="card-text tarjeta_comentarios_comentario">
                {store.comentarios[0].comentario}
              </p>
              <p className="card-text tarjeta_comentarios_usuario">
                Carla Díez
              </p>
              <p className="card-text tarjeta_comentarios_ciudad">León</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
