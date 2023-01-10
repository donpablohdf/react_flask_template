import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";

import "../../styles/home.css";

export const Reservas = (props) => {
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");
  const [isLoading, setIsLoading] = useState(true);
  const { store, actions } = useContext(Context);
  const [reservas, setReservas] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (!token) {
      return (
        <div className="login-body">
          <h1 className="bg-danger">No está autorizado</h1>
        </div>
      );
    } else {
      actions.logIn();
    }
    const promesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/reserva_user/" + userid));
      });
    };
    promesa().then((datos) => {
      setReservas(datos);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="login-body">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="body container">
      <h1>RESERVAS</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4 pb-5">
        {reservas.map((element) =>
          element.estado !== 2 ? (
            <div key={element.id} className="col">
              <div className="card h-100">
                <div className="card-body tarjeta_actividad_body">
                  <h5 className="card-title tarjeta_actividad_nombre">
                    RESERVA:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.num_reserva}
                    </span>
                  </h5>
                  <p className="card-text tarjeta_actividad_texto">
                    ACTIVIDAD:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.obj_actividad.nombre}
                    </span>
                  </p>
                  <p className="card-text tarjeta_actividad_texto">
                    REALIZADA:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.fecha_realizacion}
                    </span>
                  </p>
                  <p className="card-text tarjeta_actividad_texto">
                    EMITIDA:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.fecha_reserva}
                    </span>
                  </p>

                  <div className="mb-5">
                    <Link
                      id={"navLink" + element.id}
                      to={"/cancela_reserva/" + element.id}
                    >
                      <div>Cancelar reserva</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};
