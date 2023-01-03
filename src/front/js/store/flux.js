import React, { useEffect, useState } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userid:false,
			message: null,
			usuario:[
				{
					nombre:"Miguel",
					email:"miguel@gmail.com",
					password:"1234"
				}
			],
			guia: [
				{
					id:"0",
					nombre: "Pablo",
					email:"pablo@gmail.com",
					password:"1234",
					ciudad: "Ávila",
					valoracion: "☆☆☆☆☆",
					descripcion:"Soy un juerguista empedernido. Me encanta salir de fiesta y la naturaleza."
				},
				{
					id:"1",
					nombre: "Donato",
					email:"pablo@gmail.com",
					password:"1234",
					ciudad: "Mallorca",
					valoracion: "☆☆☆☆",
					descripcion:"Soy un juerguista empedernido. Me encanta salir de fiesta y la naturaleza."
				},
				{
					id:"2",
					nombre:"Fran",
					email:"pablo@gmail.com",
					password:"1234",
					ciudad: "Madrid",
					valoracion:"☆☆☆☆",
					descripcion:"Soy un juerguista empedernido. Me encanta salir de fiesta y la naturaleza."
				},
				{
					id:"3",
					nombre: "Samuel",
					email:"pablo@gmail.com",
					password:"1234",
					ciudad:"Sevilla",
					valoracion:"4/5",
					descripcion:"Soy un juerguista empedernido. Me encanta salir de fiesta y la naturaleza."
				}
			],
			actividades: [
				{
					nombre: "Montar en Bici",
					ciudad: "Barcelona",
					precio: "65€",
					descripcion:"Un paseo en bici por lo alto del monte",
					duracion:"3 Horas"
				},
				{
					nombre: "Ir de Tapas",
					ciudad: "Málaga",
					precio: "20€",
					descripcion:"Una tarde de tapas",
					duracion:"2 Horas"
				},
				{
					nombre: "Noche de Discoteca",
					ciudad: "Gijón",
					precio: "50€",
					descripcion:"Una noche de Fiestaaaaa",
					duracion:"7 Horas"
				},
				{
					nombre: "Museo del Prado",
					ciudad: "Madrid",
					precio: "25€",
					descripcion:"Una tarde viendo las maravillosas obras del museo",
					duracion:"4 Horas"
				}
			],
			reservas : [
				{
					title: "Montar en Bicicleta"
				},
				{
					title: "Ir de tapas"
				}
			],
			comentarios :[
				{
					comentario:"Ha sido una experiencia increíble. Todo muy medido en el tiempo."
				},
				{
					comentario:"Una auténtica pérdida de tiempo y dinero. No volveré a ir con él."
				}
			]
		},
		actions: {
			dataFromAPI: async (url) => {
				// para meter los datos de la API
				const store = getStore()
				if (url === '/logout') {
					const token = localStorage.removeItem('jwt-token')
					const userid = localStorage.removeItem('userid')
					setStore({ userid: false })
					return true
				}
					try {
						const resp = await fetch(process.env.BACKEND_URL + url)
						const data = await resp.json()
						return data
					} catch (error) {
						return false
					}

			},

			solicitudesAPI: async (url, meth, head, bod) => {

				const body = JSON.stringify(bod)
				//console.log(body)
				//console.log(url, meth, head, body);
				const store = getStore()

				await fetch(process.env.BACKEND_URL + url, {
					method: meth,
					headers: head,
					body: body
				}).then((resp) => resp.json()).then((data) => {
					
					if (data.token && url === '/api/login') {
						localStorage.setItem("jwt-token", data.token)
						localStorage.setItem("userid", data.userid)	
						setStore({ userid: true })
						if (store.userid){
						window.location.href='/userhome'
						}
					
						return true
					}else{
						return data
					}		
					

				}).catch((error) => {
					return 'Hubo un problema con la petición Fetch:' + error.message
				})
			},
			logIn: () => {
				setStore({ userid: true })
				return true
			},
		}
	};
};

export default getState;
