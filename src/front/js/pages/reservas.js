import React, {useContext } from "react";
import { Link,useParams } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Reservas = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="body container">
			<h1>Has reservado la actividad {store.reservas[params.theid].title}</h1>
		</div>
	);
};