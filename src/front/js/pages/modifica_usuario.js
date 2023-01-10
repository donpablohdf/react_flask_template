import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"

import { Context } from "../store/appContext"
import { useForm } from "react-hook-form" // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/login.css"

export const ModificaUsuario = () => {
  const token = localStorage.getItem("jwt-token")
  const userid = localStorage.getItem("userid")
  const [isLoading, setIsLoading] = useState(true);
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [esGuia, setEsGuia] = useState(false)

  const { actions } = useContext(Context)
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { tipo: false } }) // declaracion para react-hook-form

  useEffect(() => {
    if (token) {
		  actions.logIn();
		}
    const promesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/usuario/" + userid))
      })
    }
    promesa().then((datos) => {
      setListaUsuarios(datos)
      setIsLoading(false);

      //console.log(datos)
    })
  }, [])

  let login = false
  const onSubmit = (data, e) => {
    e.preventDefault()
    const url = "/api/modifica_user/" + userid
    const method = "POST"
    const head = { "Content-Type": "application/json" }
    //console.log(data)
    login = actions.solicitudesAPI(url, method, head, data)
    if (login) {
      window.location.href='/userhome'
    }
  }
  if (isLoading) {
    return (
      <div className="login-body">
        <h1>Cargando...</h1>
      </div>
    );
  }
  
  if (!token) {
    return (
      <div className="login-body">
        <h1 className="bg-danger">No está autorizado</h1>
      </div>
    )
  } else {
    return (
      <>
        <div className="login-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Modifica tus datos!!</h1>
            <div>
              <input
                id="email"
                type="text"
                defaultValue={listaUsuarios.email ? listaUsuarios.email : ""}
                placeholder="Email"
                {...register("email")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <input
                type="text"
                placeholder="Password"
                
                {...register("password")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <input
                type="text"
                placeholder="Nombre"
                defaultValue={listaUsuarios.nombre ? listaUsuarios.nombre : ""}
                {...register("nombre")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <input
                type="text"
                placeholder="Apellidos"
                defaultValue={
                  listaUsuarios.apellidos ? listaUsuarios.apellidos : ""
                }
                {...register("apellidos")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            <div>
              <input
                type="text"
                placeholder="Ciudad"
                defaultValue={listaUsuarios.ciudad ? listaUsuarios.ciudad : ""}
                {...register("ciudad")} //crear el name del input y requerido react-hook-form
              />
            </div>
            <p></p>
            {listaUsuarios.tipo == 0 ? (
              <div>
                <label >Quiero ser guía</label>
                <input type="checkbox" {...register("tipo")} id="tipo" value="1" onChange={() => setEsGuia(!esGuia)} />
              </div>
            ) : (
              <input
                {...register("tipo")}
                type="hidden"
                value={listaUsuarios.tipo ? listaUsuarios.tipo : "1"}
              />
            )}
            <p></p>
            {(listaUsuarios.tipo == 1 || esGuia) ? (
              <div>
                <textarea
                defaultValue={listaUsuarios.descripcion ? listaUsuarios.descripcion : ""}
                 
                  {...register("descripcion")} //crear el name del input y requerido react-hook-form
                />
              </div>
            ) : (
              <input
                {...register("descripcion")}
                type="hidden"
                value={listaUsuarios.descripcion ? listaUsuarios.descripcion : ""}
              />
            )}
            <button type="submit">Modificar</button>
          </form>
        </div>
      </>
    )
  }
}
