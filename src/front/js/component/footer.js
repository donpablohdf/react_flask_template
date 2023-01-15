import React, { Component } from "react";
import {BsFillHeartFill} from "react-icons/bs";
import "../../styles/footer.css";

export const Footer = () => {

	const anio = () =>{
		let fecha = new Date().getFullYear();
		return fecha;
	}
	return(
		<footer className="footer mt-auto pt-3 pb-2 text-center">
				<div className="row">
					<div className="col footer_copyright">&copy;{anio()} OhMyTOWN.com</div>
					<div className="col footer_iconos">
						<ul className="icon-list">
							<li className="icon-item">
								<button className="icon-link">
									<i className="fab fa-instagram"></i>
								</button>
							</li>
							<li className="icon-item">
								<button className="icon-link">
									<i className="fab fa-facebook-f"></i>
								</button>
							</li>
							<li className="icon-item">
								<button className="icon-link">
									<i className="fab fa-twitter"></i>
								</button>
							</li>
							<li className="icon-item">
								<button className="icon-link">
									<i className="fab fa-youtube"></i>
								</button>
							</li>
							<li className="icon-item">
								<button className="icon-link">
									<i className="fab fa-linkedin-in"></i>
								</button>
							</li>
						</ul>
					</div>
				</div>
			
		</footer>
	)
};
