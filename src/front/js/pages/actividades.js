import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/actividades.css";
import retiro from "../../img/retiro.jpg";
import fondo from "../../img/fondo.jpg";
import opinion1 from "../../img/opinion1.jpg";

export const Actividades = (props) => {
  const { actions } = useContext(Context);
  const params = useParams();
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");

  const [nwreserva, setNwreserva] = useState(false);
  const [nwFecha, setNwFecha] = useState("");
  const [fechaPasada, setFechaPasada] = useState(false);

  const [actividades, setActividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //cargando guias

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
    if (token) {
      actions.logIn();
    }
    const promesaActividades = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/actividad/" + params.theid));
      });
    };
    promesaActividades().then((datos) => {
      setActividades(datos);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    let fecha = new Date(actividades["fecha"]);
    let hoy = new Date();
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    let fechaF = fecha.toLocaleDateString("es", options);
    let fechaD = fechaF.charAt(0).toUpperCase() + fechaF.slice(1);
    setNwFecha(fechaD);

    if (fecha < hoy) {
      setFechaPasada(true);
    }
  }, [actividades.fecha]);

  if (isLoading) {
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
      {actividades.foto ? (
        <img
          src={process.env.BACKEND_URL + "/" + actividades.foto}
          className="imagen_actividad_header"
          alt="..."
        />
      ) : (
        <img src={retiro} className="imagen_actividad_header" alt="..." />
      )}
      <div className="container">
        <div className="row justify-content-evenly">
          <div className="col-8">
            <h1 className="display-5 mt-3 actividades_nombre">
              {actividades.nombre}
            </h1>
            <h3 className="actividad_ciudad">{actividades.ciudad}</h3>
            <h2 className="actividad_precio">{nwFecha}</h2>
            <h4 className="actividad_descripcion">{actividades.descripcion}</h4>
            <h2 className="actividad_precio">{actividades.precio}</h2>
          </div>
          <div className="col-4">
            <div className="espacio_reservas">
              {actividades.id_guia + " " + userid}
              {actividades.id_guia != userid &&
              userid &&
              !actividades["ids_usuarios"].includes(userid) &&
              !nwreserva &&
              !fechaPasada ? (
                <div>
                  <button
                    onClick={() => {
                      reserva(userid, actividades.id_guia, params.theid);
                    }}
                  >
                    Reservar actividad
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              {actividades.id_guia != userid && nwreserva ? (
                <div>Actividad reservada con éxito</div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="actividad_guia">SU GUÍA</h3>
        <div className="container d-flex justify-content-center">
          <Link to={"/guia/" + actividades.obj_guia.id}>
            <div className="card actividad_tarjeta">
              {actividades.obj_guia.foto ? (
                <img
                  src={
                    process.env.BACKEND_URL + "/" + actividades.obj_guia.foto
                  }
                  className="card-img-top actividad_guia_imagen"
                  alt="..."
                />
              ) : (
                <img
                  src={opinion1}
                  className="card-img-top actividad_guia_imagen"
                  alt="..."
                />
              )}
              <div className="card-img-overlay actividad_tarjeta_guia_cuerpo">
                <h5 className="card-title actividad_tarjeta_nombre">
                  {actividades.obj_guia.nombre}
                </h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="actividad_comentarios_body">
        <h3 className="actividad_comentarios">COMENTARIOS</h3>
        <div className="container">
          {actividades.obj_com.map((element) =>
            element.estado !== 2 ? (
              <div key={element.id} className="card tarjeta_comentarios mt-2">
                {actividades.foto ? (
                  <img
                    src={process.env.BACKEND_URL + "/" + actividades.foto}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                ) : (
                  <img
                    src={opinion1}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                )}
                <div className="card-body">
                  <p className="card-text tarjeta_comentarios_comentario">
                    {element.texto}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};
