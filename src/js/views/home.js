import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  // Deestructurar en {store, actions}
  // Declaramos un estado vacio

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  // Estados locales

  return (
    // Meterle un usuario desde el store
    <div className="text-center mt-5 container">
      <h2>Personajes</h2>
      <div>
        Favoritos:
        {store.favorites.map((favorito, index) => {
          return (
            <p key={`${favorito._id}-${index}`}>{favorito.properties.name}</p>
          );
        })}
      </div>
      {store.personajesSwapi.map((personaje) => {
        return (
          <div className="card my-2" key={personaje._id}>
            <p>{personaje.properties.name}</p>
            <p>gender: {personaje.properties.gender}</p>
            <p>Hair-Color: {personaje.properties.hair_color}</p>
            <p>Eye-Color: {personaje.properties.eye_color}</p>
            <div className="d-flex">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/personaje/${personaje.uid}`)}
              >
                Ver mas
              </button>
              <button
                className="btn btn-warning"
                onClick={() => actions.addFavorite(personaje)}
              >
                Corazon
              </button>
            </div>
          </div>
        );
      })}

      <h2 className="mt-5">Planetas</h2>
      {store.planetasSwapi.map((planeta) => {
        return (
          <div className="card my-2" key={planeta._id}>
            {planeta.properties.name}
            <p>Poblacion: {planeta.properties.population}</p>
            <p>Diametro: {planeta.properties.diameter}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/planeta/${planeta.uid}`)}
            >
              Ver mas
            </button>
          </div>
        );
      })}
    </div>
  );
};
