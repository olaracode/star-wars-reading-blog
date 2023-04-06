import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import PersonajeDetails from "./views/PersonajeDetails.jsx";
import PlanetaDescripcion from "./views/PlanetaDescripcion.jsx";
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* Navbar */}
          <Navbar />
          {/* Finaliza Navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personaje/:id" element={<PersonajeDetails />} />
            <Route path="/planeta/:id" element={<PlanetaDescripcion />} />
            <Route path="*" element={<h1>404 No encontrado</h1>} />
          </Routes>
          {/* Footer */}
          <Footer />
          {/* Cierra Footer */}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
