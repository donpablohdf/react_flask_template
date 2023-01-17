import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import fondo from "../../img/fondo.jpg";
import madrid from "../../img/madrid.jpg";

import "../../styles/guia.css";

export const Guia = () => {
  const { actions } = useContext(Context);
  const params = useParams();
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");

  const [guia, setGuia] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //cargando guias
  const [isLoading2, setIsLoading2] = useState(true); //cargando actividades
  const [isLoading3, setIsLoading3] = useState(true); //cargando reservas
  const [desActi, setDesActi] = useState(false);
  const [actAvatar, setActAvatar] = useState(false);
  const [actAct, setActAct] = useState(false);
  const [pesoImg, setPesoImg] = useState();
  const [pesoImgU, setPesoImgU] = useState();

  const parseFecha = (datos) => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    let fecha = new Date(datos);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    let fechaF = fecha.toLocaleDateString("es", options);
    let fechaD = fechaF.charAt(0).toUpperCase() + fechaF.slice(1);
    return fechaD;
  };

  const desactivaActividad = (acti) => {
    const url = "/api/desactiva_act/" + acti;
    const desactiva = actions.dataFromAPI(url);
    console.log(desactiva);
    setDesActi(!desActi);
  };
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form
  const subeFotoUsr = async (data) => {
    let peso = customFile1.files[0].size;
    if (peso> 1065443){ setPesoImgU("La imagen no puede superar 1Mb"); return false}
    var formdata = new FormData();
    formdata.append("archivo", customFile1.files[0], data.archivo);
    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {'Authorization': 'Bearer '+token },
      redirect: "follow",
    };
    await fetch(process.env.BACKEND_URL + "/api/foto_user/" + userid, requestOptions)
      .then((response) => response.text())
      .then((result) => setActAvatar(!actAvatar))
      .catch((error) => console.log("error", error));
  };
  const subeFotoAct = async (data, id) => {
    let file = document.getElementById("ftActF" + id).files[0];
    let peso = document.getElementById("ftActF" + id).files[0].size;
    if (peso> 1065443){ setPesoImg("La imagen no puede superar 1Mb"); return false}
    let nom = document.getElementById("ftActF" + id).value;
    var formdata = new FormData();
    formdata.append("ftAct", file, nom);
    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {'Authorization': 'Bearer '+token },
      redirect: "follow",
    };
    await fetch(
      process.env.BACKEND_URL + "/api/foto_act/" + id + "/" + userid,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setActAct(!actAct))
      .catch((error) => console.log("error", error));
  };
  const promesaGuias = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/usuario/" + params.theid));
    });
  };
  const promesaActividades = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/actividad_guia/" + params.theid));
    });
  };
  const promesaReservas = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/reserva_guia/" + params.theid));
    });
  };
  useEffect(() => {
    if (token) {
      actions.logIn();
    }
    promesaGuias().then((datosG) => {
      setGuia(datosG);
      setIsLoading(false);
    });

    promesaActividades().then((datosA) => {
      setActividades(datosA);
      setIsLoading2(false);
      promesaReservas().then((datosR) => {
        setReservas(datosR);
        setIsLoading3(false);
      });
    });
  }, [desActi, actAvatar, actAct]);

  if (isLoading || isLoading2 || isLoading3) {
    return (
      <div className="guia-body">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="guia-body" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="container">
        <div className="container">
          <div className="card mb-5 guia_carta_contenedor">
            <div className="row g-0">
              <div className="col-md-2">
                {guia.foto ? (
                  <img
                    src={process.env.BACKEND_URL + "/" + guia.foto}
                    className="imagen_actividad_header"
                    alt="..."
                  />
                ) : (
                  <img
                    src={madrid}
                    className="imagen_actividad_header"
                    alt="..."
                  />
                )}
                {userid === params.theid ? (
                  <div className="contenedor_boton_cambiar_foto" style={{ backgroundImage: `url(${fondo})` }}>
                    <div className="file-select boton_cambiar_foto" id="src-file1">
                      <input
                        onChange={() => {
                          subeFotoUsr(handleSubmit);
                        }}
                        type="file"
                        id="customFile1"
                        name="archivo"
                        accept=".jpg, .png"
                      />
                    </div>
                    <div><span className="signup_email_valido">{pesoImgU}</span></div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-10 cuerpo-guia-carta">
                <div className="card-body">
                  <h1 className="card-title nombre-guia">{guia.nombre}</h1>
                  <p className="card-text descripcion-guia">
                    {guia.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="texto_actividades mb-5">ACTIVIDADES</h3>
          {guia.tipo === 1 && userid === params.theid ? (
            <div className="mb-5 contenedor_boton_nueva_actividad">
              <Link to="/nueva_actividad">
                <button className="boton_nueva_actividad">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <div className="boton_nueva_actividad_iconos">
                        <i className="fas fa-suitcase-rolling guia_icono_default"></i>
                        <i className="fas fa-plane-departure guia_icono_hover"></i>
                  </div>
                  Nueva actividad
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-5 pb-3">
          {actividades.map((element) => (
            <div key={element.id} className="col">
              {" "}
              {/*Link a la pagina de actividades + index. Variable global en flux.js */}
              <div className="card h-100">
                <div className="over">
                {element.foto ? (
                  <img
                    src={process.env.BACKEND_URL + "/" + element.foto}
                    className="imagen_actividad_header"
                    alt="..."
                  />
                ) : (
                  <img
                    src={madrid}
                    className="imagen_actividad_header"
                    alt="..."
                  />
                )}
                </div>
                <div className="card-body tarjeta_actividad_body">
                  <Link to={"/actividades/" + element.id}>
                    <h5 className="card-title tarjeta_actividad_nombre">
                      {element.nombre}
                    </h5>
                  </Link>
                  <p className="card-text tarjeta_actividad_texto">
                    CIUDAD:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.ciudad}
                    </span>
                  </p>
                  <p className="card-text tarjeta_actividad_texto">
                    PRECIO:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.precio}
                    </span>
                  </p>
                  <p className="card-text tarjeta_actividad_texto">
                    Fecha:{" "}
                    <span className="tarjeta_actividad_variable">
                    { parseFecha(element.fecha)}
                    </span>
                  </p>
                  
                  {guia.tipo === 1 && userid === params.theid ? (
                    <div className="row">
                      <button className="col-4 mb-3 mx-auto mt-2 guia_boton_modificar">
                        <Link
                          id={"navLink" + element.id}
                          to={"/modifica_actividad/" + element.id}
                        >
                          Modificar
                        </Link>
                      </button>
                      <button
                        className="col-4 mb-3 mx-auto mt-2 guia_boton_borrar"
                        onClick={() => {
                          desactivaActividad(element.id);
                        }}
                      >
                        Borrar
                      </button>
                      {element.ids_usuarios != "" ? (
                        <span className="contiene_reservas">
                          Esta actividad está reservada
                        </span>
                      ) : (
                        ""
                      )}
                      <form className="boton_modificar_foto_actividad">
                        <div className="file-select" id="src-file1">
                          <input
                            onChange={() => {
                              subeFotoAct(handleSubmit, element.id);
                            }}
                            type="file"
                            id={"ftActF" + element.id}
                            name={"ftAct" + element.id}
                            className="form-control "
                            accept=".jpg, .png"
                          />
                          <input
                            type="hidden"
                            value={element.id}
                            id={"id_actividad" + element.id}
                          />
                           
                        </div>
                        <div><span className="signup_email_valido">{pesoImg}</span></div>
                      </form>
                    </div>
                  ) : (
                    <div className="row">
                      <button className="col-4 mb-3 mx-auto mt-2 guia_boton_modificar">
                        <Link to={"/actividades/" + element.id}>
                          Ver actividad
                        </Link>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {userid === params.theid ? (
          <>
            <h3 className="texto_actividades my-5">RESERVAS</h3>

            <div className="row row-cols-1 row-cols-md-3 g-4 pb-5">
              {reservas.map((element) => (
                <div key={element.id} className="col">
                  <div className="card h-100">
                    {element.obj_actividad.foto ? (
                      <img
                        src={
                          process.env.BACKEND_URL +
                          "/" +
                          element.obj_actividad.foto
                        }
                        className="imagen_actividad_header"
                        alt="..."
                      />
                    ) : (
                      <img
                        src={madrid}
                        className="imagen_actividad_header"
                        alt="..."
                      />
                    )}
                    <div className="card-body tarjeta_actividad_body">
                      <h5 className="card-title tarjeta_actividad_nombre">
                        RESERVA:{" "}
                        <span className="tarjeta_actividad_variable">
                          {element.num_reserva}
                        </span>
                      </h5>
                      <p className="card-text tarjeta_actividad_texto">
                        ACTIVIDAD:{" "}
                        <span className="tarjeta_actividad_variable">
                          {element.obj_actividad.nombre}
                        </span>
                      </p>
                      <p className="card-text tarjeta_actividad_texto">
                        REALIZADA:{" "}
                        <span className="tarjeta_actividad_variable">
                          {parseFecha(element.fecha_realizacion)}
                        </span>
                      </p>
                      <p className="card-text tarjeta_actividad_texto">
                        EMITIDA:{" "}
                        <span className="tarjeta_actividad_variable">
                          {parseFecha(element.fecha_reserva)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

Guia.propTypes = {
  match: PropTypes.object,
};
