import React, {useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";

import "../../styles/search.css";
import { Link, useParams } from "react-router-dom";

export const Search = () => {
	const { store, actions } = useContext(Context);

	const [tarea, setTarea] = useState([]);					//renderizado dinamico
	const [listaTareas, setListaTareas] = useState([]);		//renderizado estatico
	const [busqueda, setBusqueda] = useState("");			//escritura


	useEffect(() => {
		const promesaActividades = () => {
			return new Promise((resolve, reject) => {
				resolve(actions.dataFromAPI('/api/actividades_index')) 
			})
		}
		promesaActividades().then((datos) => { 
			setListaTareas(datos)
			setTarea(datos)
		}
		)
	},[])

	const handleChange = (e) =>{
		setBusqueda(e.target.value)
		filterTable(e.target.value);
	}

	const filterTable = (ciudad) =>{
		var resultado = listaTareas.filter((element) =>{
			if(element.ciudad.toString().toLowerCase().includes(ciudad.toLowerCase())){
				return element;
			}
		})
		setTarea(resultado)
	}

	return (
		<div className="d-flex justify-content-center search_body">
			<div className="barra_search">
				<h1>Esta es la pagina de búsqueda</h1>
				<div className="containerInput container-fluid">
					<input
						className="form-control inputBuscar"
						value = {busqueda}
						placeholder = "Busca tu ciudad"
						onChange={handleChange}
					/>
				</div>
				
				<div className="row">{tarea.map((element,index) =>
						<div className="col-4 ">
							<div className="card mt-5 mb-3">
								<img src="" className="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">{element.nombre}</h5>
									<p className="card-text">Ciudad: {element.ciudad}</p>
									<p className="card-text">Precio: {element.precio}</p>
									<p className="card-text">Fecha: {element.fecha}</p>
									<Link to={"/actividades/"+ element.id}>								{/* Mándame a esta dirección en el navegador*/}
										<span className="btn btn-danger">Reserva</span>
									</Link>
								</div>
							</div>
						</div>
					)}</div>
			</div>
		</div>
	);
};