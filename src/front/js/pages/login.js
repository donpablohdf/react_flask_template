import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorLogin, setErrorLogin] = useState("")

	const navigate = useNavigate();

	const login=() =>{
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		console.log(email, password)

		var raw = JSON.stringify({
		"email": email,
		"password": password
		});

		var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
		};

		fetch("https://3000-donpablohdf-ohmytown-68nrr9rybe0.ws-eu80.gitpod.io/api/login", requestOptions)
		.then(response => response.json())
		//Aqui esta el token, en result
		.then(result => {
			if(result.token){
				localStorage.setItem("token",result.token);
				navigate("/user");
			}else{
				setErrorLogin(result.msg)
			}
			
		})
		.catch(error => console.log('error', error));
			}

	return (
		<div className="login-body">
			<h1>Hola Viajero!!</h1>
			<div>
				<label>Email: </label>
				<br></br>
				<input onChange = {(event) => setEmail(event.target.value)}></input>
			</div>
			<p></p>
			<div>
				<label>Password: </label>
				<br></br>
				<input onChange = {(event) => setPassword(event.target.value)}></input>
			</div>
			<p></p>
			<button onClick={login}>Login</button>
				{errorLogin && <div className="alert alert-danger" role="alert">
  					{errorLogin}
				</div>}
            <p></p>
            <p>Si no estás registrado pincha<Link to="/signup/">
							<span className="link_signup"> aquí</span>
						</Link>
            </p>
			<p>
			<Link to="/userhome/">USUARIOS</Link>
			</p>
			<p>
			<Link to="/guiahome/">GUIAS</Link>
			</p>
		</div>

	);
};