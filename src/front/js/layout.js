import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Help } from "./pages/help";
import { Guia } from "./pages/guia";
import { Login } from "./pages/login";
import { Search } from "./pages/search";
import { Actividades } from "./pages/actividades";
import { UserHome } from "./pages/userhome";
import { Reservas } from "./pages/reservas";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ModificaUsuario } from "./pages/modifica_usuario";
import { Logout } from "./pages/logout";
import { FormSignup } from "./pages/signup";
import { NuevaActividad } from "./pages/nuevaActividad";
import { ModificaActividad } from "./pages/modificaActividad";
import { CancelaReserva } from "./pages/cancelaReserva";
import { OlvidoPassword } from "./pages/olvidoPassword";
import { BajaUsuario } from "./pages/baja";
import { NuevoComentario } from "./pages/nuevoComentario";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />

        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Search />} path="/search" />
          <Route element={<Help />} path="/help" />
          <Route element={<Guia />} path="/guia/:theid" />
          <Route element={<Actividades />} path="/actividades/:theid" />
          <Route element={<Login />} path="/login" />
          <Route element={<FormSignup />} path="/signup" />
          <Route element={<UserHome />} path="/userhome" />
          <Route element={<ModificaUsuario />} path="/modifica_usuario" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<NuevaActividad />} path="/nueva_actividad" />
          <Route element={<Reservas />} path="/reservas/:theid" />
          <Route element={<CancelaReserva />} path="/cancela_reserva/:theid" />
          <Route element={<OlvidoPassword />} path="/fpass/" />
          <Route element={<BajaUsuario />} path="/baja_usuario/" />
          <Route element={<NuevoComentario />} path="/comenta_actividad/:theid" />
          <Route
            element={<ModificaActividad />}
            path="/modifica_actividad/:theid"
          />
          <Route element={<h1>Not found!</h1>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
