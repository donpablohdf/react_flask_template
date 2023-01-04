import React, {useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";

import "../../styles/search.css";
import fondo3 from "../../img/fondo3.jpg"
import leon from "../../img/leon.jpg"

import { Link, useParams } from "react-router-dom";

export const Search = () => {
	const { store, actions } = useContext(Context);

	const [tarea, setTarea] = useState([]);					//renderizado dinamico
	const [listaTareas, setListaTareas] = useState([]);		//renderizado estatico
	const [busqueda, setBusqueda] = useState("");			//escritura


	useEffect(() => {
		const promesaActividades = () => {
			return new Promise((resolve, reject) => {
				resolve(actions.dataFromAPI('/api/search')) 
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
		<div className="d-flex justify-content-center search_body" style={{ backgroundImage: `url(${fondo3})` }}>
			<div className="barra_search">
				<h1 className="barra_search_encabezado">¿ A <span className="barra_search_viajar">DÓNDE</span> VAS A <span className="barra_search_viajar">VIAJAR </span>?</h1>
				<div className="containerInput container-fluid">
					<i className="fa fa-search search_icono_search"></i>
					<input className="barra_search_input"
						value = {busqueda}
						placeholder = "Busca tu ciudad"
						onChange={handleChange}
					/>
				</div>
				
				<div className="row mt-5">{tarea.map((element,index) =>
						<div className="col-sm-12 col-md-6 col-lg-4 mb-4">
							<Link to={"/actividades/"+ element.id}>
								<div className="card">
									<img src={leon} className="card-img rounded search_img_carta" alt="..."/>
									<div className="card-img-overlay d-flex flex-column">
										<div className="card-body">
											<h5 className="card-title search_card_nombre fs-2 mt-2">{element.nombre}</h5>
										</div>
										<div className="card-footer">
											<p className="card-text text-start text-uppercase fs-4 search_texto_ciudad text-white">{element.ciudad}</p>
											<p className="card-text text-end fs-3 text-danger">{element.precio}</p>
										</div>
											
										
									</div>
								</div>
							</Link>
						</div>
					)}</div>
			</div>
		</div>
	);
};