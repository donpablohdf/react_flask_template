import React, {useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Help = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className=" body container">
			<h1>Esta es la pagina de ayuda</h1>
		</div>
	);
};