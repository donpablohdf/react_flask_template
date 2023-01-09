import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import reactDom from "react-dom";

import montania from "../../img/slider1.jpg";
import bosque from "../../img/slider2.jpg";
import playa from "../../img/slider3.jpg";

import fondoactividades from "../../img/fondociudad.jpg";
import fondocomentarios from "../../img/comentarios.jpeg";

import opinion1 from "../../img/opinion1.jpg";
import opinion2 from "../../img/opinion2.jpg";
import opinion3 from "../../img/opinion3.jpg";

import guia1 from "../../img/guia1.png";
import guia2 from "../../img/guia2.jpg";
import guia3 from "../../img/guia3.jpg";
import guia4 from "../../img/guia4.jpg";
import guia5 from "../../img/guia5.jpg";
import guia6 from "../../img/guia6.jpg";

import "../../styles/home.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true); //cargando guias
  const [isLoading2, setIsLoading2] = useState(true); //cargando actividades

  const [listaUsuarios, setListaUsuarios] = useState([]);

  const [listaTareas, setListaTareas] = useState([]);

  useEffect(() => {
    const promesaGuias = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/usuarios_index"));
      });
    };
    promesaGuias().then((datos) => {
      setListaUsuarios(datos);
      setIsLoading(false);
    });

    const promesaActividades = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/actividades_index"));
      });
    };
    promesaActividades().then((datos) => {
      setListaTareas(datos);
      setIsLoading2(false);
    });
  }, []);

  if (isLoading || isLoading2) {
    return (
      <div className="tbody">
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <div className="tbody">
      {/**COMIENZO CARRUSEL PRINCIPAL */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <img
              src={montania}
              className="imagen_carrusel_principal"
              alt="..."
            />
            <div className="carousel-caption d-md-block">
              <h5>DESCUBRE TU CIUDAD</h5>
              <h1 className="display-1">NUEVOS VIAJES</h1>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src={bosque}
              className="w-100 imagen_carrusel_principal"
              alt="..."
            />
            <div className="carousel-caption d-md-block">
              <h5>DESCUBRE TU CIUDAD</h5>
              <h1 className="display-1">NUEVAS AVENTURAS</h1>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src={playa}
              className="w-100 imagen_carrusel_principal"
              alt="..."
            />
            <div className="carousel-caption d-md-block">
              <h5>DESCUBRE TU CIUDAD</h5>
              <h1 className="display-1">NUEVAS EXPERIENCIAS</h1>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/**FIN CARRUSEL PRINCIPAL */}
      {/**COMIENZO TEXTO OH MY TOWN */}
      <div>
        <h3 className="d-flex justify-content-center mt-3">
          DESCUBRE TU CIUDAD CON
        </h3>
        <h1 className="d-flex justify-content-center display-2 mb-5">
          NUESTROS GUIAS
        </h1>
      </div>
      {/**FIN TEXTO OH MY TOWN */}
      {/**COMIENZO CARRUSEL GUIAS */}
      {/**{listaUsuarios.map((usuario,index) =>*/}
      <div
        className="d-flex align-items-center"
        style={{ backgroundImage: `url(${bosque})` }}
      >
        <div className=""></div>
        <div
          id="carouselExampleControls"
          className="carousel slide carrusel"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-lg-4 mx-auto">
                  <Link to={"/guia/" + listaUsuarios[5].id}>
                    <div className="card carta">
                      {listaUsuarios[5].foto ? (
                        <img
                          src={
                            process.env.BACKEND_URL +
                            "/" +
                            listaUsuarios[5].foto
                          }
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      ) : (
                        <img
                          src={guia1}
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      )}
                      <div className="card-body cuerpo_carta">
                        <h2 className="nombre_carta lineUp">
                          {listaUsuarios[5].nombre}
                        </h2>
                        <p className="ciudad_carta lineUp">
                          {listaUsuarios[5].ciudad}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 mx-auto">
                  <Link to={"/guia/" + listaUsuarios[1].id}>
                    <div className="card carta">
                      {listaUsuarios[1].foto ? (
                        <img
                          src={
                            process.env.BACKEND_URL +
                            "/" +
                            listaUsuarios[1].foto
                          }
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      ) : (
                        <img
                          src={guia1}
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      )}
                      <div className="card-body cuerpo_carta">
                        <h2 className="nombre_carta lineUp">
                          {listaUsuarios[1].nombre}
                        </h2>
                        <p className="ciudad_carta lineUp">
                          {listaUsuarios[1].ciudad}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 mx-auto">
                  <Link to={"/guia/" + listaUsuarios[2].id}>
                    <div className="card carta">
                      {listaUsuarios[2].foto ? (
                        <img
                          src={
                            process.env.BACKEND_URL +
                            "/" +
                            listaUsuarios[2].foto
                          }
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      ) : (
                        <img
                          src={guia1}
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      )}
                      <div className="card-body cuerpo_carta">
                        <h2 className="nombre_carta lineUp">
                          {listaUsuarios[2].nombre}
                        </h2>
                        <p className="ciudad_carta lineUp">
                          {listaUsuarios[2].ciudad}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-lg-4 mx-auto">
                  <Link to={"/guia/" + listaUsuarios[3].id}>
                    <div className="card carta">
                      {listaUsuarios[3].foto ? (
                        <img
                          src={
                            process.env.BACKEND_URL +
                            "/" +
                            listaUsuarios[3].foto
                          }
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      ) : (
                        <img
                          src={guia1}
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      )}
                      <div className="card-body cuerpo_carta">
                        <h2 className="nombre_carta lineUp">
                          {listaUsuarios[3].nombre}
                        </h2>
                        <p className="ciudad_carta lineUp">
                          {listaUsuarios[3].ciudad}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 mx-auto">
                  <Link to={"/guia/" + listaUsuarios[4].id}>
                    <div className="card carta">
                      {listaUsuarios[4].foto ? (
                        <img
                          src={
                            process.env.BACKEND_URL +
                            "/" +
                            listaUsuarios[4].foto
                          }
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      ) : (
                        <img
                          src={guia1}
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      )}
                      <div className="card-body cuerpo_carta">
                        <h2 className="nombre_carta lineUp">
                          {listaUsuarios[4].nombre}
                        </h2>
                        <p className="ciudad_carta lineUp">
                          {listaUsuarios[4].ciudad}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 mx-auto">
                  <Link to={"/guia/" + listaUsuarios[0].id}>
                    <div className="card carta">
                      {listaUsuarios[0].foto ? (
                        <img
                          src={
                            process.env.BACKEND_URL +
                            "/" +
                            listaUsuarios[0].foto
                          }
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      ) : (
                        <img
                          src={guia1}
                          className="card-img-top imagen_carta"
                          alt="..."
                        />
                      )}
                      <div className="card-body cuerpo_carta">
                        <h2 className="nombre_carta lineUp">
                          {listaUsuarios[0].nombre}
                        </h2>
                        <p className="ciudad_carta lineUp">
                          {listaUsuarios[0].ciudad}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      {/*)}*/}
      {/**FIN CARRUSEL GUIAS */}
      {/**COMIENZO TEXTO ACTIVIDADES */}
      <div>
        <h3 className="d-flex justify-content-center mt-3">Y NUESTRAS</h3>
        <h1 className="d-flex justify-content-center display-2 mb-5">
          ACTIVIDADES
        </h1>
      </div>
      {/**FIN TEXTO ACTIVIDADES */}
      {/**COMIENZO ACTIVIDADES */}
      <div
        className="contenedor-actividades"
        style={{
          backgroundImage: `url(${fondoactividades})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="row row-cols-2">
            <div className="col">
              <div className="card mb-5">
                <div className="row g-0">
                  <div className="col">
                    {listaTareas[0].foto ? (
                      <img
                        src={
                          process.env.BACKEND_URL + "/" + listaTareas[0].foto
                        }
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    ) : (
                      <img
                        src={bosque}
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    )}
                    
                  </div>
                  <div className="col-md-7">
                    <Link to={"/actividades/" + listaTareas[0].id}>
                      <div
                        id="actividadesSugeridas"
                        className="card-body actividades"
                      >
                        <h5 className="card-title">{listaTareas[0].nombre}</h5>
                        <h6 className="card-text">{listaTareas[0].ciudad}</h6>
                        <p className="card-text">{listaTareas[0].precio}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card mb-5">
                <div className="row g-0">
                  <div className="col">
				  {listaTareas[1].foto ? (
                      <img
                        src={
                          process.env.BACKEND_URL + "/" + listaTareas[1].foto
                        }
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    ) : (
                      <img
                        src={bosque}
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    )}
                  </div>
                  <div className="col-md-7">
                    <Link to={"/actividades/" + listaTareas[1].id}>
                      <div
                        id="actividadesSugeridas"
                        className="card-body actividades"
                      >
                        <h5 className="card-title">{listaTareas[1].nombre}</h5>
                        <h6 className="card-text">{listaTareas[1].ciudad}</h6>
                        <p className="card-text">{listaTareas[1].precio}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card mb-5">
                <div className="row g-0">
                  <div className="col">
				  {listaTareas[2].foto ? (
                      <img
                        src={
                          process.env.BACKEND_URL + "/" + listaTareas[2].foto
                        }
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    ) : (
                      <img
                        src={bosque}
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    )}
                  </div>
                  <div className="col-md-7">
                    <Link to={"/actividades/" + listaTareas[2].id}>
                      <div
                        id="actividadesSugeridas"
                        className="card-body actividades"
                      >
                        <h5 className="card-title">{listaTareas[2].nombre}</h5>
                        <h6 className="card-text">{listaTareas[2].ciudad}</h6>
                        <p className="card-text">{listaTareas[2].precio}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-5">
                <div className="row g-0">
                  <div className="col">
				  {listaTareas[3].foto ? (
                      <img
                        src={
                          process.env.BACKEND_URL + "/" + listaTareas[3].foto
                        }
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    ) : (
                      <img
                        src={bosque}
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    )}
                  </div>
                  <div className="col-md-7">
                    <Link to={"/actividades/" + listaTareas[3].id}>
                      <div
                        id="actividadesSugeridas"
                        className="card-body actividades"
                      >
                        <h5 className="card-title">{listaTareas[3].nombre}</h5>
                        <h6 className="card-text">{listaTareas[3].ciudad}</h6>
                        <p className="card-text">{listaTareas[3].precio}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card mb-5">
                <div className="row g-0">
                  <div className="col">
				  {listaTareas[4].foto ? (
                      <img
                        src={
                          process.env.BACKEND_URL + "/" + listaTareas[4].foto
                        }
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    ) : (
                      <img
                        src={bosque}
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    )}
                  </div>
                  <div className="col-md-7">
                    <Link to={"/actividades/" + listaTareas[4].id}>
                      <div
                        id="actividadesSugeridas"
                        className="card-body actividades"
                      >
                        <h5 className="card-title">{listaTareas[4].nombre}</h5>
                        <h6 className="card-text">{listaTareas[4].ciudad}</h6>
                        <p className="card-text">{listaTareas[4].precio}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card mb-5">
                <div className="row g-0">
                  <div className="col">
				  {listaTareas[5].foto ? (
                      <img
                        src={
                          process.env.BACKEND_URL + "/" + listaTareas[5].foto
                        }
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    ) : (
                      <img
                        src={bosque}
                        className="img-fluid imagen-actividad"
                        alt="..."
                      />
                    )}
                  </div>
                  <div className="col-md-7">
                    <Link to={"/actividades/" + listaTareas[5].id}>
                      <div
                        id="actividadesSugeridas"
                        className="card-body actividades"
                      >
                        <h5 className="card-title">{listaTareas[5].nombre}</h5>
                        <h6 className="card-text">{listaTareas[5].ciudad}</h6>
                        <p className="card-text">{listaTareas[5].precio}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**FIN OPINIONES */}
	  {/*COMIENZO OPINIONES*
      <div className="texto-opiniones">
        <h1 className="d-flex justify-content-center display-2 my-5 texto_clientes">
          NUESTROS CLIENTES OPINAN
        </h1>
      </div>
      
      <div
        className="opiniones"
        style={{
          backgroundImage: `url(${fondocomentarios})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="opiniones-area">
                <div className="carrusel-testimonios">
                  <div className="carrusel-slide">
                    <span className="comillas">
                      <FaQuoteLeft />
                    </span>
                    <p>
                      "Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever."
                    </p>
                    <img className="opinion-imagen" src={opinion1} alt="img" />
                    <h5 className="opinion-nombre">Carla Díez</h5>
                    <span className="opinion-ciudad">Madrid</span>
                  </div>
                  <div className="carrusel-slide">
                    <span className="comillas">
                      <FaQuoteLeft />
                    </span>
                    <p>
                      "Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever."
                    </p>
                    <img className="opinion-imagen" src={opinion2} alt="img" />
                    <h5 className="opinion-nombre">Miguel García</h5>
                    <span className="opinion-ciudad">Barcelona</span>
                  </div>
                  <div className="carrusel-slide">
                    <span className="comillas">
                      <FaQuoteLeft />
                    </span>
                    <p>
                      "Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever."
                    </p>
                    <img className="opinion-imagen" src={opinion3} alt="img" />
                    <h5 className="opinion-nombre">Carolina Echeverría</h5>
                    <span className="opinion-ciudad">Valencia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      FIN OPINIONES*/}
    </div>
  );
};
