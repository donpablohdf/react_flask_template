import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/actividades.css";
import retiro from "../../img/retiro.jpg";
import fondo2 from "../../img/fondo2.jpg";
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

    const head = { "Content-Type": "application/json", 'Authorization': 'Bearer '+token };
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
      style={{ backgroundImage: `url(${fondo2})` }}
    >
      {actividades.foto ? (
        <img
          src={process.env.BACKEND_URL + "/" + actividades.foto}
          className="actividades_imagen_actividad_header"
          alt="..."
        />
      ) : (
        <img src={retiro} className="actividades_imagen_actividad_header" alt="..." />
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
              {actividades.id_guia != userid &&
              userid &&
              !actividades["ids_usuarios"].includes(userid) &&
              !nwreserva &&
              !fechaPasada ? (
                <div>
                  <button className="boton_reserva"
                    onClick={() => {
                      reserva(userid, actividades.id_guia, params.theid);
                    }}
                  >
                    <p className="texto_boton">RESERVAR</p>
                    
                    <svg className="button__svg" role="presentational" viewBox="-90 100 800 600">
                    <defs>
                        <clipPath id="myClip">
                          <rect x="0" y="0" width="100%" height="50%" />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#myClip)">
                        <g id="money">
                          <path d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z" fill="#699e64" stroke="#323c44" strokeMiterlimit="10" strokeWidth="14" />
                          <path d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z" fill="#699e64" stroke="#323c44" strokeMiterlimit="10" strokeWidth="14" />
                        </g>
                        <g id="creditcard">
                          <path d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z" fill="#a76fe2" stroke="#323c44" strokeMiterlimit="10" strokeWidth="14" />
                          <path d="M347.55,261.85H332.22c-3.73,0-6.76-3.58-6.76-8v-35.2c0-4.42,3-8,6.76-8h15.33c3.73,0,6.76,3.58,6.76,8v35.2C354.31,258.27,351.28,261.85,347.55,261.85Z" fill="#ffdc67" />
                          <path d="M249.73,183.76h28.85v274.8H249.73Z" fill="#323c44" />
                        </g>
                      </g>
                      <g id="wallet">
                        <path d="M478,288.23h-337A28.93,28.93,0,0,0,112,317.14V546.2a29,29,0,0,0,28.94,28.95H478a29,29,0,0,0,28.95-28.94h0v-229A29,29,0,0,0,478,288.23Z" fill="#a4bdc1" stroke="#323c44" strokeMiterlimit="10" strokeWidth="14" />
                        <path d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z" fill="#a4bdc1" stroke="#323c44" strokeMiterlimit="10" strokeWidth="14" />
                        <path d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z" fill="#a4bdc1" stroke="#323c44" strokeMiterlimit="10" strokeWidth="14" />
                        <path d="M147.87,541.93V320.84c-.05-13.2,8.25-21.51,21.62-24.27a42.71,42.71,0,0,1,7.14-1.32l-29.36-.63a67.77,67.77,0,0,0-9.13.45c-13.37,2.75-20.32,12.57-20.27,25.77l.38,221.24c-1.57,15.44,8.15,27.08,25.34,26.1l33-.19c-15.9,0-28.78-10.58-28.76-25.93Z" fill="#7b8f91" />
                        <path d="M148.16,343.22a6,6,0,0,0-6,6v92a6,6,0,0,0,12,0v-92A6,6,0,0,0,148.16,343.22Z" fill="#323c44" />
                      </g>

                    </svg>
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              {actividades.id_guia != userid && nwreserva ? (
                <div className="actividades_texto_reservada">¡¡ Actividad reservada con éxito !!</div>
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
