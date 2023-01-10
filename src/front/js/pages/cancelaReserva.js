import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

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
    <div className="login-body">
      <h1>Reserva cancelada</h1>
    </div>
  );
};
