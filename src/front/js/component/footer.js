import React, { Component } from "react";
import {BsFillHeartFill} from "react-icons/bs";
import "../../styles/footer.css";

export const Footer = () => {

	const anio = () =>{
		let fecha = new Date().getFullYear();
		return fecha;
	}
	return(
		<footer className="footer mt-auto py-4 text-center">
				<div className="row">
					<div className="col">&copy;{anio()} OhMyTOWN.com</div>
					<div className="col">Creado con <BsFillHeartFill/></div>
				</div>
			
		</footer>
	)
};
