import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export const IsLogin = () => {
  

  return (
    <div className="login-body">
      <Link to="/userhome/">
        <button > Ir al area privada</button>
      </Link>
    </div>
  );
};
