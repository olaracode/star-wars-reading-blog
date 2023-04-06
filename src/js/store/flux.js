const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: "Octavio",
      algo: "agregado",
      lastname: "Lara",
      todoList: ["Tarea de prueba"],
      personajesSwapi: [], // lista de personajes
      planetasSwapi: [],
      favorites: [],
    },
    actions: {
      funcionDemo: () => console.log("Me ejecuto en el flux"),
      // Hace la consulta a la api y guarda los resultados
      fetchCharacters: async () => {
        try {
          const store = getStore();

          // Busco en mi localStorage por "characters"
          const localCharacters = JSON.parse(
            localStorage.getItem("characters")
          );
          // Si localCharacters existe
          if (localCharacters) {
            // Asigno ese valor a mi store
            setStore({ ...store, personajesSwapi: localCharacters });
            return; // Culmino mi funcion
          }

          // Se hace la primera peticion para traer la lista de personajes
          const response = await fetch("https://www.swapi.tech/api/people/");
          if (response.ok) {
            const data = await response.json(); // La traducimos a js
            const characters = data.results; // Extraemos la lista de personajes

            // Declaramos un arreglo vacio que va a servir como nuestra lista nueva
            let charactersDetails = [];

            // Por cada personaje en nuestra lista
            for (let character of characters) {
              // Vamos a buscar sus detalles con el url
              const detailResponse = await fetch(character.url);
              const detailData = await detailResponse.json(); // traducir esa busqueda
              // vamos a anexar a nuestra lista los resultados
              charactersDetails.push(detailData.result);
            }
            // charactersDetails
            // Hice todos mis fetch
            localStorage.setItem(
              "characters", // El nombre con el que se va a guardar
              JSON.stringify(charactersDetails) // Lo convierto en un texto antes de guardar
            );
            // Asignamos el valor nuevo al store
            setStore({ ...store, personajesSwapi: charactersDetails });
          }
        } catch (error) {
          console.log(error);
        }
      },
      fetchPlanets: async () => {
        try {
          const store = getStore(); // Me traigo los valores del store

          // Buscar en mi localStorage a los planetas
          const localPlanets = JSON.parse(localStorage.getItem("planetas"));
          if (localPlanets) {
            setStore({ ...store, planetasSwapi: localPlanets });
            return;
          }

          const response = await fetch("https://www.swapi.tech/api/planets/");
          if (response.ok) {
            const data = await response.json();

            const planets = data.results; // extraer mi lista de planetas
            const planetsWithDescription = [];

            // Por cada planeta en planets
            for (let planeta of planets) {
              const detailsResponse = await fetch(planeta.url);
              const detailsData = await detailsResponse.json(); // Traduzco la respuesta del servidor a JSON
              planetsWithDescription.push(detailsData.result);
            }

            // Guardar los planetas en el localStorage
            localStorage.setItem(
              "planetas",
              JSON.stringify(planetsWithDescription)
            );
            console.log(planetsWithDescription);
            setStore({ ...store, planetasSwapi: planetsWithDescription });
          }
        } catch (error) {
          console.log(error);
        }
      },
      addTodo: (nuevaTarea) => {
        const store = getStore(); // declarar el store
        const newTareas = [...store.todoList, nuevaTarea];
        setStore({ ...store, todoList: newTareas });
      },
      addFavorite: (item) => {
        const store = getStore();
        const favorites = store.favorites;
        const exists = favorites.find((favorito) => favorito === item);
        if (exists) {
          const filteredFavorites = favorites.filter(
            (favorito) => item !== favorito
          );
          setStore({ ...store, favorites: filteredFavorites });
          return;
        }
        const newFavorites = [...favorites, item];
        setStore({ ...store, favorites: newFavorites });
        console.log("estoy en favoritos", newFavorites);
      },
    },
  };
};

export default getState;
