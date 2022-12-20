import React, {useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Search = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container body">
			<h1>Esta es la pagina de búsqueda</h1>
		</div>
	);
};