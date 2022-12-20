import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import "../../styles/home.css";

export const Actividades = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="container jumbotron body">
			<h1 className="display-4">{store.actividades[params.theid].title}</h1>
			<img src={rigoImageUrl} />
			<h3>{store.actividades[params.theid].ciudad}</h3>
			<h4>{store.actividades[params.theid].descripcion}</h4>
			<h2>{store.actividades[params.theid].precio}</h2>
			<h6>{store.actividades[params.theid].duracion}</h6>
			<h3>Su guía:</h3>
			<Link to="/guia/0">
				<div className="card">
				<img src="..." className="card-img-top" alt="..."/>
				<div className="card-body">
					<h5 className="card-title">{store.guia[0].nombre}</h5>
				</div>
							</div>
						</Link>
			<p>{store.comentarios[0].comentario}</p>
			<p>{store.comentarios[1].comentario}</p>
			<br></br>
			<br></br>

		</div>
	);
};

Actividades.propTypes = {
	match: PropTypes.object
};