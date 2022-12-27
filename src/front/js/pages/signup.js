import React, {useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/signup.css";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	const [input, setInput] = useState({
		nombre: '',
		password: '',
		confirmPassword: ''
	});
	 
	const [error, setError] = useState({
		nombre: '',
		password: '',
		confirmPassword: ''
	})
	 
	const onInputChange = e => {
		const { name, value } = e.target;
			setInput(prev => ({
		  	...prev,
		  	[name]: value,
		}));
		validateInput(e);
	}
	const validateInput = e => {
		let { name, value } = e.target;
		setError(prev => {
			const stateObj = { ...prev, [name]: "" };
	 
		  switch (name) {
			case "nombre":
			  if (!value) {
				stateObj[name] = "Introduzca un nombre por favor.";
			  }
			  break;
	 
			case "password":
			  if (!value) {
				stateObj[name] = "Introduzca una contraseña por favor.";
			  } else if (input.confirmPassword && value !== input.confirmPassword) {
				stateObj["confirmPassword"] = "Las contraseñas no coinciden.";
			  } else {
				stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
			  }
			  break;
	 
			case "confirmPassword":
			  if (!value) {
				stateObj[name] = "Repita la contraseña por favor.";
			  } else if (input.password && value !== input.password) {
				stateObj[name] = "Las contraseñas no coinciden.";
			  }
			  break;
	 
			default:
			  break;
		  }
	 
		  return stateObj;
		});
	  }

	  /*const [nombre, setNombre] = useState("");
	  const [apellidos, setApellidos] = useState("");
	  const [email, setEmail] = useState("");
	  const [password, setPassword] = useState("");
	  const [tipo,setTipo] = useState("");*/
	  let handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  let res = await fetch("", {
			method: "POST",
			body: JSON.stringify({
			  nombre: nombre,
			  email: email,
			  apellidos: apellidos,
			  password: password,
			}),
		  });
		  let resJson = await res.json();
		  if (res.status === 200) {
			setNombre("");
			setEmail("");
			setPassword("");
			setMessage("Usuario creado");
		  } else {
			setMessage("Ha ocurrido un error");
		  }
		} catch (err) {
		  console.log(err);
		}
	  };


	return (
		<div className="signup-body">
			<h1>Registro de Usuario: </h1>
			<form onSubmit={handleSubmit} action ="" method="post" autoComplete="on">
				<fieldset>
					<ul>
						<li>
							<label>Nombre: </label><br></br>
							<input
          						type="text"
								id="nombre"
          						name="nombre"
          						placeholder='Enter Username'
          						value={input.nombre}
          						onChange={onInputChange}
          						onBlur={validateInput}
								required>
							</input>
							{error.nombre && <span className='err'>{error.nombre}</span>}
						</li>
						<li>
							<label>Correo electrónico: </label><br></br>
							<input type="email" id="email" name="email" required/>
						</li>
						<li>
							<label>Password: </label><br></br>
							<input
          						type="password"
								id="password"
         						name="password"
          						placeholder='Password'
          						value={input.password}
          						onChange={onInputChange}
          						onBlur={validateInput}
								required>
							</input>
							{error.password && <span className='err'>{error.password}</span>}
						</li>
						<li>
							<label>Confirma el Password: </label><br></br>
							<input
          						type="password"
         						name="confirmPassword"
          						placeholder='Enter Confirm Password'
          						value={input.confirmPassword}
          						onChange={onInputChange}
          						onBlur={validateInput}
								required>
							</input>
							{error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
						</li>
						<li>
							<p>Tipo de persona: </p>
							<label>Usuario</label>
							<input type="radio" id="usuario" name="persona" value="usuario" required/>
							<label>Guia</label>
							<input type="radio" id="guia" name="persona" value="guia"/>
						</li>
						<button className="button-submit" type="submit" value="Submit" onSubmit={handleSubmit}></button>
					</ul>
				</fieldset>
			</form>
		</div>
	);
};