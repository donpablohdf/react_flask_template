import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export const ActMod = () => {
    const userid = localStorage.getItem("userid");

  return (
    <div className="login-body">
        <h6>Modificado con éxito</h6>
      <Link to={"/guia/" + userid}>
        <button > Ir al la página de guía</button>
      </Link>
    </div>
  );
};