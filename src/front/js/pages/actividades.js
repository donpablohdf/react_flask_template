import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import "../../styles/home.css";

export const Actividades = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const[guia, setGuia] = useState([])
	const[actividades,setActividades] = useState([])
	const [isLoading, setIsLoading] = useState(true);		//cargando guias
	const [isLoading2, setIsLoading2] = useState(true);		//cargando actividades

	useEffect(() => {
		const promesaActividades = () => {
			return new Promise((resolve, reject) => {
				resolve(actions.dataFromAPI('/api/actividad/'+params.theid)) 
			})
		}
		promesaActividades().then((datos) => { 
			setActividades(datos)
			setIsLoading2(false);
			const promesaGuias = () => {
				return new Promise((resolve, reject) => {
					resolve(actions.dataFromAPI('/api/usuario/'+ datos.id_guia)) 
				})
			}
			promesaGuias().then((datos) => { 
				setGuia(datos)
				setIsLoading (false);
			}
			)
		}
		)
		
	},[])

	if (isLoading || isLoading2) {
		return (
		<div className="tbody">
			<h1>Cargando...</h1>
		</div>
		)
	}

	return (
		<div className="actividades-body">{console.log(actividades.id_guia)}
			<div className="container jumbotron body">
				<h1 className="display-4">{actividades.title}</h1>
				<img src={rigoImageUrl} />
				<h3>{actividades.ciudad}</h3>
				<h4>{actividades.descripcion}</h4>
				<h2>{actividades.precio}</h2>
				<h6>{actividades.duracion}</h6>
				<h3>Su guía:</h3>
				<Link to={"/guia/"+ guia.id}>
					<div className="card">
						<img src="..." className="card-img-top" alt="..."/>
						<div className="card-body">
							<h5 className="card-title">{guia.nombre}</h5>
						</div>
					</div>
				</Link>
				<p>{store.comentarios[0].comentario}</p>
				<p>{store.comentarios[1].comentario}</p>
				<br></br>
				<br></br>
			</div>
		</div>
	);
};

Actividades.propTypes = {
	match: PropTypes.object
};