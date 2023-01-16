import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/cancelaReserva.css";
import fondo3 from "../../img/fondo3.jpg";

export const CancelaReserva = (props) => {
  const { actions } = useContext(Context);
  const token = localStorage.getItem("jwt-token");
  const userid = localStorage.getItem("userid");

  const params = useParams();

  useEffect(() => {
    if (token) {
      const url = "/api/reserva_canc/" + params.theid;
      let log = actions.dataFromAPI(url);
      window.location.href="/reservas/" + userid     

    }
  }, []);

  return (
    <div className="cancela_reservas_body" style={{ backgroundImage: `url(${fondo3})`, backgroundSize: `cover` }}>
      <h1 className="cancela_reservas_header">SU RESERVA HA SIDO CANCELADA CON ÉXITO</h1>
    </div>
  );
};
