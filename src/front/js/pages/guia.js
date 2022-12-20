import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import opinion2 from "../../img/opinion2.jpg";
import {BsFillStarFill} from "react-icons/bs";

import "../../styles/guia.css";

export const Guia = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className = "guia-body">
			<div className="container">
				<div className="card mb-5">
					<div className="row g-0">
						<div className="col-md-2">
							<img src={opinion2} className="img-fluid" alt="..."/>
						</div>
						<div className="col-md-10 cuerpo-guia-carta">
							<div className="card-body">
								<h1 className="card-title nombre-guia">{store.guia[params.theid].nombre}</h1>
								<p className="card-text descripcion-guia">{store.guia[params.theid].descripcion}</p>
								<p className="card-text valoracion-guia"><BsFillStarFill/><BsFillStarFill/><BsFillStarFill/><BsFillStarFill/><BsFillStarFill/></p>
							</div>
						</div>
					</div>
				</div>
				<div className="row row-cols-1 row-cols-md-3 g-4">
					<div className="col">
						<Link to="/actividades/0">    									{/*Link a la pagina de actividades + index. Variable global en flux.js */}
							<div className="card h-100">
								<img src="..." className="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">{store.actividades[0].nombre}</h5>
									<p className="card-text">{store.actividades[0].ciudad}</p>
									<p className="card-text">{store.actividades[0].precio}</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="col">
						<Link to="/actividades/1">
							<div className="card">
								<img src="..." className="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">Ir de Tapas</h5>
									<p className="card-text">Valencia</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="col">
						<Link to="/actividades/2">
							<div className="card">
								<img src="..." className="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">Noche de Discoteca</h5>
									<p className="card-text">En el corazón de Barcelona.</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
				<p>{store.comentarios[0].comentario}</p>
				<p>{store.comentarios[1].comentario}</p>
				<br></br>
				<br></br>
			</div>
		</div>
	);
};

Guia.propTypes = {
	match: PropTypes.object
};