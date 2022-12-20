const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
