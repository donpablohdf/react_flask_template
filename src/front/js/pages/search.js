import React, {useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";

import "../../styles/search.css";
import fondo3 from "../../img/fondo3.jpg"
import leon from "../../img/leon.jpg"

import { Link, useParams } from "react-router-dom";

export const Search = () => {
	const parseFecha = (datos) => {
		let options = {
		  weekday: "long",
		  year: "numeric",
		  month: "long",
		  day: "numeric",
		  hour: "2-digit",
		  minute: "2-digit",
		};
		let fecha = new Date(datos);
		fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
		let fechaF = fecha.toLocaleDateString("es", options);
		let fechaD = fechaF.charAt(0).toUpperCase() + fechaF.slice(1);
		return fechaD;
	  };
	const { actions } = useContext(Context);

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
					
				<div className="container-fluid d-flex align-items-center justify-content-center flex-wrap contenedor_search">{tarea.map((element,index) =>
					<Link to={"/actividades/"+ element.id}>
						<div className="box">
            				<div className="cuerpo">
							
                				<div className="imgContainer">
									<div className = "titulo_container">
										<h2 className="text-white fs-3">{element.nombre}</h2>
										
									</div>
									<div>{parseFecha(element.fecha)}</div>
                    				<img src={leon} alt=""/>
									
									<div className = "precio_container">
									
										<h2 className= "text-white fs-3">{element.precio}</h2>
										
										
									</div>
									
                				</div>
                				<div className="content d-flex flex-column align-items-center justify-content-center">
									<div>
										<h3 className="text-white fs-5">{element.ciudad}</h3>
									</div>
                				</div>
            				</div>
        				</div>
					</Link>
						
				)}</div>
			</div>
		</div>
	);
};