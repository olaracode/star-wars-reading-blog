import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const PersonajeDetails = () => {
  const params = useParams();
  const [currentCharacter, setCurrentCharacter] = useState({});
  const { id } = params; // Destructuramos params
  const getCharacterDetail = async (id) => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
      if (response.ok) {
        // Funciono?
        const data = await response.json(); // traduzco a javascript
        console.log(data.result);
        setCurrentCharacter(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCharacterDetail(id);
  }, []);
  return (
    <div>
      {currentCharacter ? (
        <div className="card w-75 m-auto p-5">
          {currentCharacter?.description}
          {currentCharacter?.properties?.name}
          {currentCharacter?.properties?.hair_color}
        </div>
      ) : (
        <>Cargando</>
      )}
    </div>
  );
};

export default PersonajeDetails;
