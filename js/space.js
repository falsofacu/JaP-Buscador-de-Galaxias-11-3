document.addEventListener("DOMContentLoaded", () => {
  const inputBuscar = document.getElementById("inputBuscar");
  const btnBuscar = document.getElementById("btnBuscar");

  btnBuscar.addEventListener("click", (event) => {
    // Crear link de busqueda
    let fetchURL = "https://images-api.nasa.gov/search?q=" + inputBuscar.value;

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        borrarResultados();
        addImagesToPage(data);
      });
  });

  const addImagesToPage = (json) => {
    const contenedorImagenes = document.getElementById("contenedor");

    for (let i = 0; i < json.collection.metadata.total_hits; i++) {
      //Contenedor del resultado
      let resultado = document.createElement("div");
      resultado.classList.add("contenedor-resultado");

      //Imagen del resultado
      let imagen = document.createElement("img");
      //Si tiene imagen agregarla
      if (json.collection.items[i].hasOwnProperty("links")) {
        imagen.src = json.collection.items[i].links[0].href;
      } else {
        imagen.src = "https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg"
      }

      //Titulo del resultado
      let titulo = document.createElement("h3");
      titulo.innerHTML = json.collection.items[i].data[0].title;

      //Descripción del resultado
      let descripcion = document.createElement("p");
      descripcion.innerHTML = json.collection.items[i].data[0].description;

      //Fecha del resultado
      let fecha = document.createElement("p");
      fecha.innerHTML = json.collection.items[i].data[0].date_created;

      //Contenedor de titulo, descripcion y fecha para scrollear
      let info = document.createElement("div");
      info.appendChild(titulo);
      info.appendChild(descripcion);
      info.appendChild(fecha);

      //Agrega imagen e info al resultado
      resultado.appendChild(imagen);
      resultado.appendChild(info);

      //Agregar resultado a la página
      contenedorImagenes.appendChild(resultado);
    }
  };

  const borrarResultados = () => {
    const contenedorImagenes = document.getElementById("contenedor");
    contenedorImagenes.innerHTML = "";
  };
});
