import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/logout.css";
import fondo5 from "../../img/fondo5.jpg"
import adios from "../../img/adios1.jpg"

export const Logout= () => {
    const { actions } = useContext(Context);
    const token = localStorage.getItem('jwt-token')
    useEffect(() => {
        if (token) {
            const url = '/logout'
            let log = actions.dataFromAPI(url)

        }
    }, [])

    return (
        <div className="logout_body" style={{ backgroundImage: `url(${fondo5})`,backgroundSize:`cover`}}>
            <div className="logout_header_contenedor">
                <h1 className="logout_h1">HAS CERRADO SESIÓN</h1>
            </div>
            <div className="logout_duele_contenedor">
                <h3 className="logout_duele_h3">NOS DUELE QUE TE VAYAS...</h3>
                <div className="logout_img_contenedor">
                    <img className="container logout_img" src={adios}/>
                </div>
                <h2 className="logout_duele_h2">¡PERO ESPERAMOS VERTE PRONTO!</h2>
            </div>
            
            
        </div>
    )
}

