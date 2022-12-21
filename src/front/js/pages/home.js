import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import reactDom from "react-dom";

import montania from "../../img/slider1.jpg";
import bosque from "../../img/slider2.jpg";
import playa from "../../img/slider3.jpg";
import fondoactividades from "../../img/fondociudad.jpg";
import fondocomentarios from '../../img/comentarios.jpeg';
import opinion1 from "../../img/opinion1.jpg";
import opinion2 from "../../img/opinion2.jpg";
import opinion3 from "../../img/opinion3.jpg";

import "../../styles/home.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import {FaQuoteLeft} from 'react-icons/fa';

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [listaUsuarios, setListaUsuarios] = useState([])

	{/**useEffect(() =>{
		fetch(actions.getUsuarios(1))
		.then(response =>{
			response.json()
			.then(response => {
				console.log(actions.getUsuarios(1))
				console.log(response)
				setListaUsuarios(response.results)
			})
		})
		.catch(function(error){
			console.log(error)
		})
	},[])*/}

	{/**useEffect(() => {
		const myId = "1"
		const url = "/api/usuario/"
		fetch(process.env.BACKEND_URL + url + myId)
		.then(response =>{
			response.json()
			.then(response =>{
				setListaUsuarios(response.results)
				console.log(listaUsuarios)
				console.log(process.env.BACKEND_URL + url + myId)
			})
		})
	})*/}
	
	const url = "/api/usuario/1"
	const resp = fetch(process.env.BACKEND_URL + url)
	console.log(resp)
		return (
			<div className="tbody">
				{/**COMIENZO CARRUSEL PRINCIPAL */}
				<div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active" data-bs-interval="5000">
							<img src={montania} className="d-block w-100" alt="..."/>
							<div className="carousel-caption d-none d-md-block">
								<h5>First slide label</h5>
								<p>Some representative placeholder content for the first slide.</p>
							</div>
						</div>
						<div className="carousel-item" data-bs-interval="5000">
							<img src={bosque} className="d-block w-100" alt="..."/>
							<div className="carousel-caption d-none d-md-block">
								<h5>Second slide label</h5>
								<p>Some representative placeholder content for the second slide.</p>
							</div>
						</div>
						<div className="carousel-item" data-bs-interval="5000">
							<img src={playa} className="d-block w-100" alt="..."/>
							<div className="carousel-caption d-none d-md-block">
								<h5>Third slide label</h5>
								<p>Some representative placeholder content for the third slide.</p>
							</div>
						</div>
					</div>
				</div>
				{/**FIN CARRUSEL PRINCIPAL */}
				{/**COMIENZO TEXTO OH MY TOWN */}
				<div>
					<h1>DESCUBRE TU CIUDAD CON</h1>
					<h1>OH MY TOWN!</h1>
					<br></br>
					<br></br>
					<br></br>
					<p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce quis tempus elit. Sed efficitur tortor neque, vitae aliquet urna varius sit amet. Ut rhoncus, nunc nec tincidunt volutpat, ex libero.</p>
				</div>
				{/**FIN TEXTO OH MY TOWN */}
				{/**COMIENZO CARRUSEL GUIAS */}
				{/**{listaUsuarios.map((usuario,index) =>*/}
					<div className="d-flex align-items-center" style={{backgroundImage: `url(${bosque})`}}>
							<div id="carouselExampleControls" className="carousel carousel-dark slide carrusel" data-bs-ride="carousel">
								<div className="carousel-inner">
									<div className="carousel-item active">
										<div className="row">
											<div className="col-lg-4 mx-auto">
												<Link to = {"/guia/"+ store.guia[0].id}>
													<div className="card carta">
														<img src={playa} className="card-img-top imagen_carta" alt="..."/>
														<div className="card-body cuerpo_carta">
															<h2 className="nombre_carta lineUp">{store.usuario[0].nombre}</h2>
															<p className="ciudad_carta lineUp">{store.guia[0].ciudad}</p>
															<p className="valoracion_carta lineUp">{store.guia[0].valoracion}</p>
														</div>
													</div>
												</Link>
											</div>
											<div className="col-lg-4 mx-auto">
												<Link to = "/guia/1">
													<div className="card carta">
														<img src={playa} className="card-img-top imagen_carta" alt="..."/>
														<div className="card-body cuerpo_cartab">
															<h2 className="nombre_cartab lineUpb">{store.guia[1].nombre}</h2>
															<p className="ciudad_cartab lineUpb">{store.guia[1].ciudad}</p>
															<p className="valoracion_cartab lineUpb">{store.guia[1].valoracion}</p>
														</div>
													</div>
												</Link>
											</div>
											<div className="col-lg-4 mx-auto">
												<Link to = "/guia/2">
													<div className="card carta">
														<img src={playa} className="card-img-top imagen_carta" alt="..."/>
														<div className="card-body cuerpo_cartac">
															<h2 className="nombre_cartac lineUpc">{store.guia[2].nombre}</h2>
															<p className="ciudad_cartac lineUpc">{store.guia[2].ciudad}</p>
															<p className="valoracion_cartac lineUpc">{store.guia[2].valoracion}</p>
														</div>
													</div>
												</Link>
											</div>
										</div>
									</div>
									<div className="carousel-item">
										<div className="row">
											<div className="col-lg-4 mx-auto">
												<Link to = "/guia/0">
													<div className="card carta">
														<img src={playa} className="card-img-top imagen_carta" alt="..."/>
														<div className="card-body cuerpo_carta">
															<h2 className="nombre_carta lineUp">{store.guia[0].nombre}</h2>
															<p className="ciudad_carta lineUp">{store.guia[0].ciudad}</p>
															<p className="valoracion_carta lineUp">{store.guia[0].valoracion}</p>
														</div>
													</div>
												</Link>
											</div>
											<div className="col-lg-4 mx-auto">
												<Link to = "/guia/0">
													<div className="card carta">
														<img src={playa} className="card-img-top imagen_carta" alt="..."/>
														<div className="card-body cuerpo_carta">
															<h2 className="nombre_carta lineUp">{store.guia[0].nombre}</h2>
															<p className="ciudad_carta lineUp">{store.guia[0].ciudad}</p>
															<p className="valoracion_carta lineUp">{store.guia[0].valoracion}</p>
														</div>
													</div>
												</Link>
											</div>
											<div className="col-lg-4 mx-auto">
												<Link to = "/guia/0">
													<div className="card carta">
														<img src={playa} className="card-img-top imagen_carta" alt="..."/>
														<div className="card-body cuerpo_carta">
															<h2 className="nombre_carta lineUp">{store.guia[0].nombre}</h2>
															<p className="ciudad_carta lineUp">{store.guia[0].ciudad}</p>
															<p className="valoracion_carta lineUp">{store.guia[0].valoracion}</p>
														</div>
													</div>
												</Link>
											</div>
										</div>
									</div>
									<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
										<span className="carousel-control-prev-icon" aria-hidden="true"></span>
										<span className="visually-hidden">Previous</span>
									</button>
									<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
										<span className="carousel-control-next-icon" aria-hidden="true"></span>
										<span className="visually-hidden">Next</span>
									</button>
								</div>
							
						</div>
					</div>
				{/*)}*/}
				{/**FIN CARRUSEL GUIAS */}
				{/**COMIENZO TEXTO ACTIVIDADES */}
				<div className="ultimas-actividades">
					<h4>ACTIVIDADES RECOMENDADAS</h4>
				</div>
				{/**FIN TEXTO ACTIVIDADES */}
				{/**COMIENZO ACTIVIDADES */}
				<div className="contenedor-actividades" style={{backgroundImage: `url(${fondoactividades})`, backgroundSize:'cover', backgroundAttachment:"fixed"}}>
					<div className="container">
						<div className="row row-cols-2">
							<div className ="col">
								<div className="card mb-5">
									<div className="row g-0">
										<div className="col">
											<img src={bosque} className="img-fluid imagen-actividad" alt="..."/>
											<div className="eventos-area d-flex">
											<span>26 Nov</span>
											<span><FaMapMarkerAlt  className= "icono-actividad"/></span>
										</div>
										</div>
										<div className="col-md-7">
											<Link to = "/actividades/0">
												<div id ="actividadesSugeridas"className="card-body actividades">
													<h5 className="card-title">{store.actividades[0].nombre}</h5>
														<h6 className="card-text">{store.actividades[0].ciudad}</h6>
														<p className="card-text">{store.actividades[0].precio}</p>
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className="card mb-5">
									<div className="row g-0">
										<div className="col">
											<img src={bosque} className="img-fluid imagen-actividad" alt="..."/>
											<div className="eventos-area d-flex">
											<span>26 Nov</span>
											<span><FaMapMarkerAlt  className= "icono-actividad"/></span>
										</div>
										</div>
										<div className="col-md-7">
											<Link to = "/actividades/1">
												<div id ="actividadesSugeridas"className="card-body actividades">
													<h5 className="card-title">{store.actividades[1].nombre}</h5>
														<h6 className="card-text">{store.actividades[1].ciudad}</h6>
														<p className="card-text">{store.actividades[1].precio}</p>
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className="card mb-5">
									<div className="row g-0">
										<div className="col">
											<img src={bosque} className="img-fluid imagen-actividad" alt="..."/>
											<div className="eventos-area d-flex">
											<span>26 Nov</span>
											<span><FaMapMarkerAlt  className= "icono-actividad"/></span>
										</div>
										</div>
										<div className="col-md-7">
											<Link to = "/actividades/0">
												<div id ="actividadesSugeridas"className="card-body actividades">
													<h5 className="card-title">{store.actividades[2].nombre}</h5>
														<h6 className="card-text">{store.actividades[2].ciudad}</h6>
														<p className="card-text">{store.actividades[2].precio}</p>
												</div>
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className ="col">
								<div className="card mb-5">
									<div className="row g-0">
										<div className="col">
											<img src={bosque} className="img-fluid imagen-actividad" alt="..."/>
											<div className="eventos-area d-flex">
											<span>26 Nov</span>
											<span><FaMapMarkerAlt  className= "icono-actividad"/></span>
										</div>
										</div>
										<div className="col-md-7">
											<Link to = "/actividades/0">
												<div id ="actividadesSugeridas"className="card-body actividades">
													<h5 className="card-title">{store.actividades[0].nombre}</h5>
														<h6 className="card-text">{store.actividades[0].ciudad}</h6>
														<p className="card-text"><small className="text-muted">{store.actividades[0].precio}</small></p>
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className="card mb-5">
									<div className="row g-0">
										<div className="col">
											<img src={bosque} className="img-fluid imagen-actividad" alt="..."/>
											<div className="eventos-area d-flex">
											<span>26 Nov</span>
											<span><FaMapMarkerAlt  className= "icono-actividad"/></span>
										</div>
										</div>
										<div className="col-md-7">
											<Link to = "/actividades/0">
												<div id ="actividadesSugeridas"className="card-body actividades">
													<h5 className="card-title">{store.actividades[0].nombre}</h5>
														<h6 className="card-text">{store.actividades[0].ciudad}</h6>
														<p className="card-text"><small className="text-muted">{store.actividades[0].precio}</small></p>
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className="card mb-5">
									<div className="row g-0">
										<div className="col">
											<img src={bosque} className="img-fluid imagen-actividad" alt="..."/>
											<div className="eventos-area d-flex">
											<span>26 Nov</span>
											<span><FaMapMarkerAlt  className= "icono-actividad"/></span>
										</div>
										</div>
										<div className="col-md-7">
											<Link to = "/actividades/0">
												<div id ="actividadesSugeridas"className="card-body actividades">
													<h5 className="card-title">{store.actividades[0].nombre}</h5>
														<h6 className="card-text">{store.actividades[0].ciudad}</h6>
														<p className="card-text"><small className="text-muted">{store.actividades[0].precio}</small></p>
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
				<div className="texto-opiniones">
					<h4>OPINIONES DE NUESTROS CLIENTES</h4>
				</div>
				{/*COMIENZO OPINIONES*/}
					<div className="opiniones" style={{backgroundImage: `url(${fondocomentarios})`, backgroundSize:'cover'}}>
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="opiniones-area">
											<div className="carrusel-testimonios">
												<div className="carrusel-slide">
														<span className ="comillas"><FaQuoteLeft/></span>
														<p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."</p>
														<img className="opinion-imagen" src={opinion1} alt="img"/>
														<h5 className="opinion-nombre">Carla Díez</h5>
														<span className="opinion-ciudad">Madrid</span>
												</div>
												<div className="carrusel-slide">
														<span className ="comillas"><FaQuoteLeft/></span>
														<p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."</p>
														<img className="opinion-imagen" src={opinion2} alt="img"/>
														<h5 className="opinion-nombre">Miguel García</h5>
														<span className="opinion-ciudad">Barcelona</span>
												</div>
												<div className="carrusel-slide">
														<span className ="comillas"><FaQuoteLeft/></span>
														<p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."</p>
														<img className="opinion-imagen" src={opinion3} alt="img"/>
														<h5 className="opinion-nombre">Carolina Echeverría</h5>
														<span className="opinion-ciudad">Valencia</span>
												</div>
											</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
			{/*FIN OPINIONES*/}	
					
				
			</div>
		);
	};
