import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlanetaDescripcion = () => {
  const [currentPlanet, setCurrentPlanet] = useState({});
  // const params = useParams()
  // const {id} = params;
  const { id } = useParams();
  const fetchPlanetDetail = async (id) => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentPlanet(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPlanetDetail(id);
  }, []);
  return (
    <div className="container">
      <p>{currentPlanet?.description}</p>
      <p>{currentPlanet?.properties?.name}</p>
    </div>
  );
};

export default PlanetaDescripcion;
