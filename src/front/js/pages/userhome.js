import React, {useContext } from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const UserHome = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="body container">
			<h1>Esta es la pagina de usuario</h1>
			<img src={rigoImageUrl} />
			<h5>{store.usuario[0].nombre}</h5>
			<p>{store.usuario[0].email}</p>
			<p>{store.usuario[0].password}</p>
			<h2>Actividades Realizadas: </h2>
			<p>{store.actividades[0].nombre}</p>
			<button>Comentar</button>
			<h2>Ultimos comentarios: </h2>
			<p>{store.comentarios[0].comentario}</p>
			<button>Editar comentario</button>
		</div>
	);
};