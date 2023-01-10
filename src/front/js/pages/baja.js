import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const BajaUsuario= () => {
    const { actions } = useContext(Context);
    const token = localStorage.getItem('jwt-token')
    const userid = localStorage.getItem("userid");

    useEffect(() => {
        if (token) {
            const urlBaja = '/api/desactiva_user/'+userid
            let baja = actions.dataFromAPI(urlBaja)
            setTimeout(() => {
                const url = '/logout'
                let log = actions.dataFromAPI(url)
            }, 2000);
            

        }
    }, [])

    return (
        <div className="login-body"><h1>Te has dado de baja</h1></div>
    )
}

