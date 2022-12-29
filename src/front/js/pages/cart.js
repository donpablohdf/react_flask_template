import React, {useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Cart = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container body">
			<h1>Esta es la pagina de compras</h1>
            <Link to="/reservas/1">
                <button type="button" className="btn btn-primary">Reservar</button>
			</Link>
            
		</div>
	);
};