import React, {useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/help.css";

export const Help = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className= "help_body">
			<div className= "container">
				<h1>NOS ENCANTA LA AVENTURA PERO...</h1>
				<h3>SIEMPRE SURGEN DUDAS</h3>

			</div>
		</div>
	);
};